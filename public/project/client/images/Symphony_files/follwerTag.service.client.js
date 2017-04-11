(function(){
    'use strict';
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.getInfo&tag=TAG";
    var TAGTRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettoptracks&tag=TAG&limit=10";
    var TAGARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettopartists&tag=TAG&limit=10";
    var TAGALUMB_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.gettopalbums&tag=TAG&limit=10";
    var SIMILARTAG_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=tag.getsimilar&tag=TAG";

    angular
        .module("SymphonyApp")
        .factory("tagService", tagService);

    function tagService($http) {
        var api = {
            fetchTagInfo: fetchTagInfo,
            findTracksByTag: findTracksByTag,
            findArtistsByTag: findArtistsByTag,
            findAlbumsByTag: findAlbumsByTag,
            findSimilarTag: findSimilarTag
        };

        return api;

        function findTracksByTag(tag) {
            var url = TAGTRACK_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findArtistsByTag(tag) {
            var url = TAGARTIST_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findAlbumsByTag(tag) {
            var url = TAGALUMB_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function fetchTagInfo(tag) {
            var url = INFO_URL.replace("TAG", tag);
            return $http.get(url);
        }

        function findSimilarTag(tag) {
            var url = SIMILARTAG_URL.replace("TAG", tag);
            return $http.get(url);
        }
    }

})();