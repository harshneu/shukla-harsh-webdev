(function() {
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();