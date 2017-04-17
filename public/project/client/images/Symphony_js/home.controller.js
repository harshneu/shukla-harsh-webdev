(function(){
    angular
        .module("SymphonyApp")
        .controller("HomeController", HomeController);

    function HomeController($location, chartService, displayService) {
        var vm = this;
        vm.$location = $location;


        function init() {
            fetchTopChart();
        }
        init();

        function fetchTopChart() {
            chartService.findTopTracks()
                .then(function(response) {
                    //console.log(response);
                    vm.topTracks = displayService.displayTrackImage(response.data.tracks);
                });
            chartService.findTopArtists()
                .then(function(response) {
                    //console.log(response);
                    vm.topArtists = displayService.displayArtistImage(response.data.artists);
                });
            //console.log(vm);
        }
    }
})();