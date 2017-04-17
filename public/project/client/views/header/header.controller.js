(function(){
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;
//Used to log out the user.
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