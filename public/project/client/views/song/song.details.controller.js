(function(){

    angular
        .module("MusicZoneApp")
        .controller("TrackController", TrackController);

    function TrackController($routeParams, $rootScope, displayService, trackService, musicService) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var trackName = $routeParams.title;
        var artistName = $routeParams.artist;
        var currentUser = $rootScope.currentUser;
        vm.favoriteUsers = [];
        vm.musicLiked = "no";

        function init() {
            if (currentUser != null) {
                userId = currentUser._id;
            } else {
                userId = null;
            }

            if(mbId === null || mbId === undefined) {
                fetchTracks(trackName,artistName);
            } else {
                fetchTracks(mbId);
            }

            musicService.findAllComments(mbId)
                .then(function (response) {
                    if (response.data === null) {
                        vm.comments = null;
                    } else {
                        vm.comments = response.data.comments;
                        console.log(vm.comments);
                    }
                });

            getLikes();
        }
        init();

        function fetchTracks(mbId) {
            trackService.findTracksByMbId(mbId)
                .then(function(response) {
                    //console.log(response);
                    vm.details = response.data.track;
                    vm.album = vm.details.album;
                    vm.artist = vm.details.artist;
                    vm.tags = vm.details.toptags.tag;
                    vm.image = displayService.displayImage(vm.album.image);
                    similarTracks(vm.details.mbid);
                    //console.log(vm);
                });
        }

        function fetchTracks(trackName,artistName) {
            trackService.findTracksByTitleAndArtist(trackName,artistName)
                .then(function(response) {
                    console.log(response);
                    vm.details = response.data.track;
                    vm.album = vm.details.album;
                    vm.artist = vm.details.artist;
                    vm.tags = vm.details.toptags.tag;
                    if (vm.album === undefined) {

                    } else {
                        vm.image = displayService.displayImage(vm.album.image);
                    }
                    similarTracks(vm.details.mbid);
                    console.log(vm);
                });
        }

        function similarTracks(mbId) {
                trackService.findSimilarTracks(mbId)
                    .then(function (response) {
                        vm.similar = displayService.displayTrackImage(response.data.similartracks);
                    });
        }

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
                console.log(comment);
                var com = musicService.postComment(mbId, musicTitle, comment)
                    .then(function (response) {
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
            //getLikes();
            init();
        }
    }

})();