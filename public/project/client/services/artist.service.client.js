(function(){
    'use strict';

    // Urls and API keys to collect data from different sources :here audioscrobbler/lastfm
    var ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=artist.search&artist=ARTIST&autocorrect=1";
    var MBID_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=artist.getInfo&mbid=MBID&autocorrect=1";
    var SIMILAR_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=artist.getsimilar&artist=ARTIST&autocorrect=1";
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=a0226414b0fa5bd98dc56b8cb73242d0&format=json&method=artist.getTopTracks&mbid=MBID&autocorrect=1";

    //angular module declaration
    angular
        .module("SymphonyApp")
        .factory("artistService", artistService);

    //function declaration for the services.

    function artistService($http) {
        var api = {
            fndArtistByMbId: findArtistByMbId,
            findArtistsByTitle: findArtistsByTitle,
            findSongsByMbId: findSongsByMbId,
            findSimilarArtists: findSimilarArtists
        };

        return api;

        // Function to find artist by MBid.
        function findArtistByMbId(mbId) {
            var url = MBID_URL.replace("MBID", mbId);
            return $http.get(url);
        }
        // Function to find artist by title.
        function findArtistsByTitle(title) {
            var url = ARTIST_URL.replace("ARTIST", title);
            return $http.get(url);
        }

        // Function to find songs by MBid.

        function findSongsByMbId(mbId) {
            var url = TRACK_URL.replace("MBID", mbId);
            return $http.get(url);
        }

        function findSimilarArtists(title) {
            var url = SIMILAR_URL.replace("ARTIST", title);
            return $http.get(url);
        }
    }

})();