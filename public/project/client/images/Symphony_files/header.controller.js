(function(){
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        // This function logs the current user out
        function logout() {

            UserService.logout()
                .then(function () {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function (err) {
                        vm.error = err;
                    });
        }
    }
})();