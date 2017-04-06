var q = require("q");

module.exports = function (db, mongoose) {

    var ProjectMusicSchema = require('./music.schema.server.js')(mongoose);
    var ProjectMusicModel = mongoose.model('projectMusic', ProjectMusicSchema);

    var api = {
        findFavoriteUsers: findFavoriteUsers,
        userLikesMusic: userLikesMusic,
        findAllComments : findAllComments,
        postComment : postComment,
        deleteComment : deleteComment,
        removeFavoriteUser : removeFavoriteUser
    };

    return api;

    function findFavoriteUsers(mbId) {
        var deferred = q.defer();

        ProjectMusicModel.findOne({mbId : mbId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function userLikesMusic(user, music) {
        var deferred = q.defer();
        //console.log("userLikesMusic");
        //console.log(music);
        ProjectMusicModel.findOne({mbId: music.mbId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    //console.log(err);
                    deferred.reject(err);
                }


                if (doc) {
                    //console.log(user);
                    doc.favoriteUsers.push (user);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    //console.log("in else");
                    //console.log(user);
                    music = new ProjectMusicModel({
                        mbId : music.mbId,
                        musicTitle: music.musicTitle,
                        favoriteUsers : [user],
                        ratings : [],
                        comments : []
                    });
                    //music.favoriteUsers.push (user);
                    // save new instance
                    music.save(function(err, doc) {
                        if (err) {
                            //console.log("save if");
                            //console.log(err);
                            deferred.reject(err);
                        } else {
                            //console.log("save else");
                            //console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findAllComments(mbId) {
        var deferred = q.defer();

        ProjectMusicModel.findOne({mbId : mbId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function postComment(mbId, musicTitle, comment) {
        var deferred = q.defer();


        ProjectMusicModel.findOne({mbId: mbId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }


                if (doc) {

                    doc.comments.push (comment);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    music = new ProjectMusicModel({
                        mbId : mbId,
                        musicTitle: musicTitle,
                        favoriteUsers : [],
                        ratings : [],
                        comments : []
                    });

                    music.comments.push (comment);
                    // save new instance
                    music.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteComment(mbId, commentId) {
        var deferred = q.defer();
        ProjectMusicModel.update({mbId: mbId},
            {$pull: {'comments': {commentId: commentId}}}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    ProjectMusicModel.findOne({mbId: mbId}, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function removeFavoriteUser(userId, mbId) {

        var deferred = q.defer();

        ProjectMusicModel.update({mbId: mbId},
            {$pull: {favoriteUsers: {userId: userId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    ProjectMusicModel.findById(userId, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            //console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }
};