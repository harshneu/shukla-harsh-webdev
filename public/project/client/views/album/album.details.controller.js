(function(){

    angular
        .module("SymphonyApp")
        .controller("AlbumController", AlbumController);

    function AlbumController($routeParams, $rootScope, albumService, artistService, displayService, musicService, $location) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var currentUser = $rootScope.currentUser;
        vm.favoriteUsers = [];
        vm.musicLiked = "no";
        vm.artist = null;

        var userId;

        function init() {
            if (currentUser != null) {
                userId = currentUser._id;
            } else {
                userId = null;
            }

            fetchAlbum(mbId);

            musicService.findAllComments(mbId)
                .then(function (response) {
                    if (response.data === null) {
                        vm.comments = null;
                    } else {
                        vm.comments = response.data.comments;
                    }
                });

            getLikes();
        }

        init();

        function getLikes() {
            musicService
                .findFavoriteUsers(mbId)
                .then(function (response) {
                    vm.favoriteUsers = response.data;
                    if (currentUser !== undefined) {
                        if (vm.favoriteUsers.length > 0) {
                            for (var i in vm.favoriteUsers) {
                                if (vm.favoriteUsers[i].username === currentUser.username) {
                                    vm.musicLiked = "yes";
                                }
                            }
                        } else {
                            vm.musicLiked = "no";
                        }
                    }
                });
        }

        function fetchAlbum(mbId) {
            albumService.findAlbumsByMbId(mbId)
                .then(function (response) {
                    vm.details = displayService.displayAlbumImage(response.data);
                    vm.albumImage = displayService.displayImage(vm.details.image);
                    vm.tags = vm.details.tags.tag;
                    vm.tracks = displayService.displayTrackImage(vm.details.tracks);
                    //console.log(vm.details);
                    vm.artist = vm.details.artist;
                    similarArtists(vm.artist);
                });
        }

        function similarArtists(artistName) {
            if(artistName) { // searches for similar artists.
                artistService.findSimilarArtists(artistName)
                    .then(function (response) {
                        vm.similar = displayService.displayArtistImage(response.data.similarartists);
                    });
            }
        }

        vm.postComment = postComment;

        function postComment(favMusicData) {
            if (currentUser === undefined) {
                alert("You need to login to post a comment!!");
                $location.path("/login");
            }
            else {
                var comment = {
                    commentId: (new Date).getTime(),
                    userId: $rootScope.currentUser._id,
                    username: $rootScope.currentUser.username,
                    timestamp: new Date(),
                    comment: vm.commentBox
                };
                var musicTitle= favMusicData.name;
                var com = musicService.postComment(mbId, musicTitle, comment)
                    .then(function (response) {
                        //console.log(response.data);
                        if (vm.comments === null) {
                            vm.comments = [comment];
                        } else {
                            vm.comments.push(comment);
                        }
                    });
            }
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            if (currentUser === undefined) {
                alert("You need to login to post a comment!!");
                $location.path("/login");
            }
            else {
                var commentId = vm.comments[index].commentId;
                musicService.deleteComment(mbId, commentId)
                    .then(
                        function (response) {
                            vm.comments.splice(index, 1);
                        }
                    );
            }
        }

        vm.userFavoritesMusic = userFavoritesMusic;

        function userFavoritesMusic(favMusicData) {
            //console.log(favMusicData);
            if (currentUser === undefined) {
                alert("You need to login to add to favourites!!");
                $location.path("/login");
            }
            else {
                if (vm.musicLiked == "yes") {
                    vm.musicLiked = "no";
                    musicService.removeFavoriteUser(userId, favMusicData.mbid);
                } else {
                    vm.musicLiked = "yes";
                    var music = {
                        mbId: favMusicData.mbid,
                        musicTitle: favMusicData.name
                    };
                    musicService.postFavoriteUser(userId, currentUser.username, music)
                        .then(function(response) {
                            vm.favoriteUsers.push(currentUser.username);
                        })
                }
            }
            init();
        }
    }
})();