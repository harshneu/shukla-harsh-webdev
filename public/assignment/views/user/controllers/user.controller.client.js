/**
 * Created by Harsh Shukla on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController)
        .controller("RegisterController", registerController)
        .controller("ProfileController", profileController);

    function loginController(UserService, $location) {
        var vm = this;

        //Event Handlers
        vm.login = login;

        function login(user) {
            loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            }
            else {
                vm.error = "Invalid username/password pair";
            }
        }
    }

    function registerController(UserService, $location) {
        var vm = this;
    }

    function profileController(UserService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        //Event Handlers
        vm.updateUser = updateUser;
        //vm.deleteUser = deleteUser;

        function updateUser(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user != null) {
                vm.message = "User successfully updated!";
            }
            else {
                vm.error = "Unable to update user";
            }
        }
    }

})();