(function(){
    'use strict';

    //Api URl fins tracks and artists from the api and renders them on the application.
    var TOP_ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=chart.gettopartists&limit=16";
    var TOP_TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=chart.gettoptracks&limit=16";

    angular
        .module("SymphonyApp")
        .factory("chartService", chartService);

    function chartService($http) {
        var api = {
            findTopSongs: findTopSongs,
            findTopArtists: findTopArtists
        };

        return api;

        function findTopSongs() {
            var url = TOP_TRACK_URL;
            return $http.get(url);
        }

        function findTopArtists() {
            var url = TOP_ARTIST_URL;
            return $http.get(url);
        }
    }

})();