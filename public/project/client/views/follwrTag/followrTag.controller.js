(function(){
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("TagController", TagController);

    function TagController($routeParams, tagServices, displayService) {
        var vm = this;
        vm.search = null;

        var tagValue = $routeParams.tagValue;

        vm.tagName=tagValue;

        function init() {
            topSongs(tagValue);
            topArtists(tagValue);
            topAlbums(tagValue);
        }
        init();

        function fetchTagDetails(tagValue) {
            tagServices.fetchTagInfo(tagValue)
                .then(function(response) {
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                });
        }

        function topSongs(tagValue) {
            vm.search = true;
            tagServices.findSongsByTag(tagValue)
                .then(function(response) {
                    vm.tracks = displayService.displayTrackImage(response.data.tracks);
                });
        }

        function topArtists(tagValue) {
            vm.search = true;
            tagServices.findArtistsByTag(tagValue)
                .then(function(response) {
                    vm.artists = displayService.displayArtistImage(response.data.topartists);
                });
        }

        function topAlbums(tagValue) {
            vm.search = true;
            tagServices.findAlbumsByTag(tagValue)
                .then(function(response) {
                    vm.albums = displayService.displayAlbumImage(response.data.albums);
                });
        }

        function similarTags(tagValue) {
            tagServices.findSimilarTag(tagValue)
                .then(function(response) {
                    vm.similarTags = response.data.similartags.tag;
                });
        }
    }

})();