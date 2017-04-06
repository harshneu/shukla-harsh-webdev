module.exports = function(app, musicModel, userModel) {
    app.get('/api/project/music/:mbId/user', findFavoriteUsers);
    app.post('/api/project/user/:userId/:username/music/:mbId', createFavoriteUser);
    app.get('/api/project/music/:mbId/comment', findAllComments);
    app.post('/api/project/music/:mbId/:musicTitle/comment', postComment);
    app.delete('/api/project/music/:mbId/comment/:commentId', deleteComment);
    app.delete('/api/project/music/:mbId/user/:userId', removeFavoriteUser);

    function  findFavoriteUsers(req, res) {
        var mbId = req.params.mbId;
        var music = null;
        var favoriteUsers = musicModel.findFavoriteUsers(mbId)
            .then(
                function(doc) {
                    //console.log("findFavoriteUsers -- "+doc);
                    //music = doc;
                    res.json(doc.favoriteUsers);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFavoriteUser(req, res) {
        //console.log("in createFavoriteUser ");
        var mbId = req.params.mbId;
        var userId = req.params.userId;
        var username = req.params.username;
        var musicInfo = req.body;
        var user = {
            userId : userId,
            username : username
        };


        musicModel
            .userLikesMusic(user, musicInfo)
            // add user to movie likes
            .then(
                function (music) {
                    //console.log("before usermodel");
                    //console.log(music);
                    return userModel.userFavoritesMusic(userId, music);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllComments(req, res) {
        var mbId = req.params.mbId;
        var comments = musicModel.findAllComments(mbId)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function postComment(req ,res) {
        var mbId = req.params.mbId;
        var musicTitle = req.params.musicTitle;
        var comment = req.body;
        console.log(musicTitle);
        var commentCreate = musicModel.postComment(mbId, musicTitle, comment)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteComment(req, res) {
        var mbId = req.params.mbId;
        var commentId = req.params.commentId;
        var deleteComment = musicModel.deleteComment(mbId, commentId)
            .then(
                function(doc) {
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeFavoriteUser(req, res) {
        var userId = req.params.userId;
        var mbId = req.params.mbId;

        musicModel
            .removeFavoriteUser(userId, mbId)
            // add user to movie likes
            .then(
                function (music) {
                    //console.log("before usermodel");
                    return userModel.removeFavoriteUser(userId, mbId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};