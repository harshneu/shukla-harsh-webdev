(function(){
    'use strict';
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=song.search&song=TRACK&autocorrect=1";
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=song.getInfo&mbid=MBID&autocorrect=1";
    var TOPTRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getTopSongs&mbid=MBID&autocorrect=1";
    var SIMILAR_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=song.getsimilar&mbid=MBID&autocorrect=1";
    var TRACKARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=song.getInfo&song=TRACK&artist=ARTIST&autocorrect=1";

    angular
        .module("SymphonyApp")
        .factory("trackService", trackService);

    function trackService($http) {
        var api = {
            findSongsByMbId: findSongsByMbId,
            findSongsByTitle: findSongsByTitle,
            findSimilarSongs: findSimilarSongs,
            findSongsByTitleAndArtist: findSongsByTitleAndArtist
        };

        return api;

        function findSongsByTitle(title) {
            var url = TRACK_URL.replace("TRACK", title);
            return $http.get(url);
        }

        function findSongsByMbId(mbId) {
            var url = INFO_URL.replace("MBID", mbId);
            return $http.get(url);
        }

        function findSimilarSongs(mbId) {
            var url = SIMILAR_URL.replace("MBID", mbId);
            return $http.get(url);
        }

        function findSongsByTitleAndArtist(title, artist) {
            var url = TRACKARTIST_URL.replace("TRACK", title);
            url = url.replace("ARTIST", artist);
            console.log(url);
            return $http.get(url);
        }
    }

})();