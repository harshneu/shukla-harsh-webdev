(function() {
    'use strict';
    angular
        .module("MusicZoneApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();