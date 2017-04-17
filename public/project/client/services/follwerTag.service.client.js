(function(){
    'use strict';
    var TAGARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=tag.gettopartists&tag=TAG&limit=10";
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=tag.getInfo&tag=TAG";
    var TAGTRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=tag.gettoptracks&tag=TAG&limit=10";
    var TAGALUMB_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=tag.gettopalbums&tag=TAG&limit=10";
    var SIMILARTAG_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=tag.getsimilar&tag=TAG";

    angular
        .module("SymphonyApp")
        .factory("tagServices", tagServices);

    function tagServices($http) {
        var api = {
            fetchTagInfo: fetchTagInfo,
            findSongsByTag: findSongsByTag,
            findArtistsByTag: findArtistsByTag,
            findAlbumsByTag: findAlbumsByTag,
            findSimilarTag: findSimilarTag
        };

        return api;

        function findSongsByTag(tag) {
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