(function(){
    'use strict';

    angular
        .module("SymphonyApp")
        .factory("displayService", displayService);

    function displayService() {
        var api = {
            displayArtistImage: displayArtistImage,
            displayTrackImage: displayTrackImage,
            displayAlbumImage: displayAlbumImage,
            displayImage: displayImage
        };

        return api;

        function displayImage (images){
            for (var r in images){
                images[images[r]['size']] = images[r]['#text'];
            }
        }

        function displayArtistImage(res) {
            var artists = res.artist;
            for (var c in artists)
                displayImage(artists[c].image);
            return res.artist;
        }
        function displayAlbumImage(res) {
            var albums = res.album;
            for (var a in albums)
                displayImage(albums[a].image);
            return res.album;
        }
        function displayTrackImage(res) {
            var tracks = res.track;
            for (var s in tracks)
                displayImage(tracks[s].image);
            return res.track;
        }


    }

})();