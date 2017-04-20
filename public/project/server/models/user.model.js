// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    //  user schema
    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);

    var ProjectUserModel =  mongoose.model('projectUser', ProjectUserSchema);

    var api = {
        createUser: createUser,
        createUser: createAdmin,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        userFavoritesMusic : userFavoritesMusic,
        removeFavoriteUser:removeFavoriteUser,
        findUserFavorites : findUserFavorites,
        followUser : followUser,
        unfollowUser : unfollowUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId


    };
    return api;
    function findUserByFacebookId(facebookId) {
        return ProjectUserModel.findOne({'facebook.id': facebookId});
    }

    function createUser(user) {
        var deferred = q.defer();

        ProjectUserModel.create(user, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }


    function createAdmin(admin) {
        var deferred = q.defer();

        ProjectUserModel.create(admin, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        ProjectUserModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {
                return ProjectUserModel.findOne({"google.id": googleId})
    }

    function findUserById(userId) {
        var deferred = q.defer();

        ProjectUserModel.find({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserByUsername(username) {
        return ProjectUserModel.findOne({username : username});
    }


    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        ProjectUserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        ProjectUserModel.remove({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();

        ProjectUserModel.update({_id : userId}, {$set : user}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                ProjectUserModel.findById(userId, function(err, doc) {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
        });
        return deferred.promise;
    }

    function userFavoritesMusic(userId, music) {
        var deferred = q.defer();
        ProjectUserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                doc.favoriteMusic.push (music);

                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        deferred.resolve (doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function removeFavoriteUser(userId, mbId) {

        var deferred = q.defer();


        ProjectUserModel.update({_id: userId},
            {$pull: {favoriteMusic: {mbId: mbId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    ProjectUserModel.findById(userId, function (err, doc) {
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

    function followUser(userId, otherUser) {
        var deferred = q.defer();


        ProjectUserModel.findById(userId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                doc.following.push (otherUser);

                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findUserFavorites(userId) {
        var deferred = q.defer();

        ProjectUserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function unfollowUser(userId, otherUserId) {
        var deferred = q.defer();
        ProjectUserModel.update({_id: userId},
            {$pull: {following: {userId : otherUserId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    ProjectUserModel.findById(userId, function (err, doc) {
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

