(function () {
    'use strict';
    angular
        .module("MusicZoneApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope) {
        var vm = this;
        vm.update = update;
        vm.failureMessage = null;
        vm.successMessage = null;
        vm.musicTitle = null;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response){
                    vm.user = response.data;
                    UserService.setCurrentUser(response.data);
                });

            UserService
                .findUserFavorites($rootScope.currentUser._id)
                .then(function(response) {
                    console.log(response);
                    vm.musicTitle = response.data;
                });
            //console.log(vm);
        } init();

        // This function updates the details of a particular user ID
        function update(modelUser) {

            var id=modelUser._id;

            var userDetails = {
                "username": modelUser.username,
                "password": modelUser.password,
                "firstName": modelUser.firstName,
                "lastName": modelUser.lastName,
                "emails": modelUser.email
            };
            UserService.updateUser(id, userDetails)
                .then(function(response) {
                    if(response.data)
                    {
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                        vm.successMessage = "Profile updated successfully.";
                    } else {
                        vm.failureMessage = "Unable to update profile. Please try again.";
                    }
                });
        }
    }
})();