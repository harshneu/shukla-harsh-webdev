(function(){
    'use strict';

    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=album.getInfo&mbid=MBID&autocorrect=1";

    var ALBUM_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=album.search&album=ALBUM&autocorrect=1";

    // angular module declaration
    angular
        .module("SymphonyApp")
        .factory("albumService", albumService);

    //api function declarations.
    function albumService($http) {
        var api = {
            findAlbumsByMbId: findAlbumsByMbId,
            findAlbumsByTitle: findAlbumsByTitle
        };

        return api;

        function findAlbumsByTitle(title) {
            var url = ALBUM_URL.replace("ALBUM", title);
            return $http.get(url);
        }

        function findAlbumsByMbId(mbId) {
            var url = INFO_URL.replace("MBID", mbId);
            return $http.get(url);
        }
    }

})();