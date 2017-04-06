(function(){
    'use strict';

    angular
        .module("MusicZoneApp")
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
            for (var i in images){
                images[images[i]['size']] = images[i]['#text'];
            }
        }

        function displayArtistImage(res) {
            var artists = res.artist;
            for (var a in artists)
                displayImage(artists[a].image);
            return res.artist;
        }

        function displayTrackImage(res) {
            var tracks = res.track;
            for (var t in tracks)
                displayImage(tracks[t].image);
            return res.track;
        }

        function displayAlbumImage(res) {
            var albums = res.album;
            for (var a in albums)
                displayImage(albums[a].image);
            return res.album;
        }
    }

})();