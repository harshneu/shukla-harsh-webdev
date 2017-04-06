(function() {
    'use strict';
    angular
        .module("MusicZoneApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location) {
        var vm = this;
        vm.$location= $location;
    }
})();