(function(){

    angular
        .module("MusicZoneApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, artistService, trackService, albumService, displayService) {

        var vm = this;
        vm.fetchArtist = fetchArtist;
        vm.fetchTrack = fetchTrack;
        vm.fetchAlbum = fetchAlbum;
        vm.search = null;

        function init() {
            var searchTitle = $routeParams.title;
            vm.searchTitle = searchTitle;

            if(searchTitle) {
                vm.sortType = 'artist';
                vm.sortReverse = false;

                fetchArtist(searchTitle);
                fetchTrack(searchTitle);
                fetchAlbum(searchTitle);
            }
        }
        init();

        function fetchArtist(searchTitle) {
            vm.search = true;
            artistService.findArtistsByTitle(searchTitle)
                .then(function (response) {
                    if(response.data) {
                        vm.artist = displayService.displayArtistImage(response.data.results.artistmatches);
                    } else {
                        vm.artist = response.data;
                    }
                });
        }

        function fetchTrack(searchTitle) {
            vm.search = true;
            trackService.findTracksByTitle(searchTitle)
                .then(function (response) {
                    if(response.data) {
                        vm.track = displayService.displayTrackImage(response.data.results.trackmatches);
                    } else {
                        vm.track = response.data;
                    }
                });
        }

        function fetchAlbum(searchTitle) {
            vm.search = true;
            albumService.findAlbumsByTitle(searchTitle)
                .then(function (response) {

                    if(response.data) {
                        vm.album = displayService.displayAlbumImage(response.data.results.albummatches);
                    } else {
                        vm.album = response.data;
                    }
                });
        }
    }
})();