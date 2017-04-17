(function() {
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location) {
        var vm = this;
        vm.$location= $location;
    }
})();