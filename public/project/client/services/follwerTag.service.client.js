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

        // api declaration for various functions.
        var api = {
            fetchTagInfo: fetchTagInfo,
            findSongsByTag: findSongsByTag,
            findArtistsByTag: findArtistsByTag,
            findAlbumsByTag: findAlbumsByTag,
            findSimilarTag: findSimilarTag
        };

        return api;

        //This function is used to return a particular song based on the tags.

        function findSongsByTag(tag) {
            var url = TAGTRACK_URL.replace("TAG", tag);
            return $http.get(url);
        }

        //This function is used to return a particular artists based on the tags.

        function findArtistsByTag(tag) {
            var url = TAGARTIST_URL.replace("TAG", tag);
            return $http.get(url);
        }

        //This function is used to return a particular album based on the tags.

        function findAlbumsByTag(tag) {
            var url = TAGALUMB_URL.replace("TAG", tag);
            return $http.get(url);
        }

        //This function is used to return a particular tag info.

        function fetchTagInfo(tag) {
            var url = INFO_URL.replace("TAG", tag);
            return $http.get(url);
        }

        //This function is used to return a particular tag similar to other.

        function findSimilarTag(tag) {
            var url = SIMILARTAG_URL.replace("TAG", tag);
            return $http.get(url);
        }
    }

})();