// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function (db, mongoose) {

    // load user schema
    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var ProjectUserModel =  mongoose.model('projectUser', ProjectUserSchema);

    var api = {
        createUser: createUser,
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
        unfollowUser : unfollowUser
    };
    return api;

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        ProjectUserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers() {
        // use q to defer the response
        var deferred = q.defer();

        // find with mongoose user model's find()
        ProjectUserModel.find(function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }


    // use user model find by id
    function findUserById(userId) {
        // use q to defer the response
        var deferred = q.defer();

        // find with mongoose user model's find()
        //console.log(userId);
        ProjectUserModel.find({_id: userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }


    function findUserByUsername(username) {
        return ProjectUserModel.findOne({username : username});
    }


    function findUserByCredentials(credentials) {
        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        ProjectUserModel.findOne(
            // first argument is predicate
            {username: credentials.username, password: credentials.password},
            // doc is unique instance matches predicate
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        // return a promise
        return deferred.promise;
    }

    function deleteUserById(userId) {
        // use q to defer the response
        var deferred = q.defer();

        // delete user with mongoose user model's remove()
        ProjectUserModel.remove({_id : userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        // use q to defer the response
        var deferred = q.defer();

        // update existing user with mongoose user model's update()
        ProjectUserModel.update({_id : userId}, {$set : user}, function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // send the updated details of the user
                ProjectUserModel.findById(userId, function(err, doc) {
                    if(err)
                    // reject promise if error
                        deferred.reject(err);
                    else
                    // resolve promise
                        deferred.resolve(doc);
                });
            }
        });
        // return a promise
        return deferred.promise;
    }

    function userFavoritesMusic(userId, music) {
        var deferred = q.defer();
        ProjectUserModel.findById(userId, function (err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                //console.log("music");
                //console.log(music);
                // add music id to user likes
                doc.favoriteMusic.push (music);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        // reject promise if error
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });
        // return a promise
        return deferred.promise;
    }

    function removeFavoriteUser(userId, mbId) {

        var deferred = q.defer();

        /*ProjectUserModel.remove({_id: userId, {favoriteMusic: {mbId: mbId}}}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });*/
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

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.following.push (otherUser);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
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
                // reject promise if error
                deferred.reject(err);
            } else {//console.log(doc);
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