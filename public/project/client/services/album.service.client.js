(function(){
    'use strict';
    var ALBUM_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=album.search&album=ALBUM&autocorrect=1";
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=album.getInfo&mbid=MBID&autocorrect=1";

    angular
        .module("MusicZoneApp")
        .factory("albumService", albumService);

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