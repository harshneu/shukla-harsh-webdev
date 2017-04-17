(function(){
    'use strict';
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.getInfo&tag=TAG";
    var TAGTRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettoptracks&tag=TAG&limit=10";
    var TAGARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettopartists&tag=TAG&limit=10";
    var TAGALUMB_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettopalbums&tag=TAG&limit=10";
    var SIMILARTAG_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.getsimilar&tag=TAG";

    angular
        .module("SymphonyApp")
        .factory("tagServices", tagServices);

    function tagServices($http) {
        var api = {
            fetchTagInfo: fetchTagInfo,
            findTracksByTag: findTracksByTags,
            findArtistsByTag: findArtistsByTag,
            findAlbumsByTag: findAlbumsByTags,
            findSimilarTag: findSimilarTags
        };

        return api;

        function findTracksByTags(tag) {
            var url = TAGTRACK_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findArtistsByTags(tag) {
            var url = TAGARTIST_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findAlbumsByTags(tag) {
            var url = TAGALUMB_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function fetchTagInfo(tag) {
            var url = INFO_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findSimilarTags(tag) {
            var url = SIMILARTAG_URL.replace("TAG", tag);
            return $http.get(url);
        }
    }

})();