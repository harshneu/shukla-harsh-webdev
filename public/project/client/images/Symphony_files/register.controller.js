(function () {
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.message = null;

        function init() {

        } init();

        // This function registers a user
        // It checks if all the required fields are present and if both the password entered are same.
        // it also checks if the entered username is already present or not.
        // Appropriate error messages are sent if any error occurs.
        // It registers the user and logs them in if no error is encountered.
        function register(user) {
            vm.message = null;
            // Username input is mandatory
            if (user === null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            // Username input is mandatory
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            // Both Password field is mandatory
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            // Both passwords entered should be the same
            if (user.password !== user.password2) {
                vm.message = "Passwords must match";
                return;
            }

            if (user.firstName = null) {
                vm.message = "Please provide The firstname";
                return;
            }

            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user != null) {
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();