var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {
    userModel.createUser({username: 'admin524',password: bcrypt.hashSync('aaaaa'),roles:['user','admin']});


    var auth = authorized;
    var loggedInUser;

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.post('/api/project/admin/user', isAdmin, createUser);
    app.get('/api/project/loggedin', loggedin);
    app.get('/api/project/admin/user', isAdmin, findAllUsers);
    app.get('/api/project/user/:id', findUserById);
    app.get('/api/project/user?username=:username', findUserByUsername);
    app.put('/api/project/user/:id', auth, updateUserById);
    app.put('/api/project/admin/user/:id', isAdmin, updateUserById);
    app.delete('/api/project/admin/user/:id', isAdmin, deleteUserById);
    app.get('/api/project/user/:userId/music', findUserFavorites);
    app.post("/api/project/user/:userid/follow", followUser);
    app.delete("/api/project/user/:userid/unfollow/:otherUserId", unfollowUser);
    app.get('/api/project/user/:userId/following', findFollowing);

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : "1001582057320-a9up2m3tlghoe4aok2nsf04975ca96k1.apps.googleusercontent.com", //process.env.GOOGLE_CLIENT_ID,
        clientSecret : "u7KywSaF2LJM69cyXzfu6vpD", //process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  :  "http://localhost:3000/google/auth/callback" //process.env.GOOGLE_CALLBACK_URL
    };


    app.get('/google/auth/', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/auth/callback',
        passport.authenticate('google', {
            successRedirect: '/#/home',

            failureRedirect: '/#/login'
        }));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("hello");
                        return done(null, user);
                    } else {
                        console.log("he");
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null) {
                        return userModel.createUser(newUser)
                            .then(
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                loggedInUser = user;
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            var users = userModel.findAllUsers()
                .then(
                    function(doc) {
                        res.json(doc);
                    },

                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.findUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var userResponse = userModel.findUserByUsername(username)
            .then(
                function(doc) {
                    delete doc.password;
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUserById(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        loggedInUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user[0] : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(req, res, next) {
        if(req.isAuthenticated()) {
            if(loggedInUser === undefined) {
                loggedInUser = req.user;
            }
            if(loggedInUser.roles.indexOf("admin") >= 0 || loggedInUser[0].roles.indexOf("admin") >= 0) {
                next();
            }
        }
        else {
            res.send(403);
        }
    }

    function followUser(req, res) {
        var otherUser = req.body;
        var userId = req.params.userid;

        userModel.followUser(userId, otherUser)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    function unfollowUser(req, res) {
        var userId = req.params.userid;
        var otherUserId = req.params.otherUserId;

        userModel.unfollowUser(userId, otherUserId)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserFavorites(req, res) {
        var userId =req.params.userId;
        userModel.findUserFavorites(userId)
            .then(
            function(doc) {
                res.json(doc.favoriteMusic);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findFollowing(req, res) {
        var userId =req.params.userId;
        var otherUser = req.body;
        userModel.findFollowing(userId)
            .then(
                function(doc) {
                    res.json(doc.following);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};