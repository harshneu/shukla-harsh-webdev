(function(){
    'use strict';
    angular
        .module("MusicZoneApp")
        .controller("TagController", TagController);

    function TagController($routeParams, tagService, displayService) {
        var vm = this;
        vm.search = null;

        var tagValue = $routeParams.tagValue;

        vm.tagName=tagValue;

        function init() {
            topTracks(tagValue);
            topArtists(tagValue);
            topAlbums(tagValue);
        }
        init();

        function fetchTagDetails(tagValue) {
            tagService.fetchTagInfo(tagValue)
                .then(function(response) {
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                });
        }

        function topTracks(tagValue) {
            vm.search = true;
            tagService.findTracksByTag(tagValue)
                .then(function(response) {
                    vm.tracks = displayService.displayTrackImage(response.data.tracks);
                });
        }

        function topArtists(tagValue) {
            vm.search = true;
            tagService.findArtistsByTag(tagValue)
                .then(function(response) {
                    vm.artists = displayService.displayArtistImage(response.data.topartists);
                });
        }

        function topAlbums(tagValue) {
            vm.search = true;
            tagService.findAlbumsByTag(tagValue)
                .then(function(response) {
                    vm.albums = displayService.displayAlbumImage(response.data.albums);
                });
        }

        function similarTags(tagValue) {
            tagService.findSimilarTag(tagValue)
                .then(function(response) {
                    vm.similarTags = response.data.similartags.tag;
                });
        }
    }

})();