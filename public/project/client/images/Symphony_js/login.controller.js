(function () {
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("LoginController", LoginController);

    function LoginController ($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {

        } init();
        function login(user) {
            vm.message = null;
            if(!user || !user.password || !user.username) {
                vm.message = "Enter Login Details";
                return vm.message;
            } else {
                UserService.login(user)
                    .then(function (response) {
                        if (response.data !== null) {
                            $rootScope.data = response.data;
                            vm.user = response.data;
                            UserService.setCurrentUser(vm.user);
                            $location.path("/profile/" + vm.user.username);

                            if ($rootScope.currentUser.roles !== null
                                && typeof($rootScope.currentUser.roles) !== 'undefined'
                                && $rootScope.currentUser.roles.indexOf('admin') >= 0) {
                                $location.path("/admin");
                            } else {
                                $location.path("/profile");
                            }
                        } else {
                            vm.message = "Wrong username and/or password.";
                        }
                    });
            }
        }
    }
})();