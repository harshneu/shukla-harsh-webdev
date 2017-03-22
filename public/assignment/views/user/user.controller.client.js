(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(username, password) {
            UserService
                .findUserByCredentials(username,password)
                .success(function (response) {
                   var user = response;
                    if(user){
                        $location.url("/user/"+user._id);
                    }})
                    .error(function (error) {
                        vm.error = "Username/password does not match";
                        return null;
            });


        }
    }
    
    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
                if (vm.user == null){
                    $location.url("/login");
                }
                else{
                    vm.firstName = angular.copy(vm.user.firstName);
                }
            });
        }
        init();

        function updateUser(newUser) {
            vm.blankerror = null;
            vm.error = null;
            if(newUser.email == "" || newUser.firstName == ""||newUser.lastName == ""){
                vm.blankerror = "Please provide values for all fields to update";
                return;
            }
            UserService
                       .updateUser(vm.userId, newUser)
                       .success(function (user) {
                            if(user == null) {
                                vm.error = "Unable to update user";
                                vm.user = user;
                            }
                            else {
                                vm.firstName = user.firstName;
                                vm.message = "User successfully updated"
                            }
            });
        }

        function deleteUser(userToDelete) {
            UserService
                .deleteUserById(userToDelete._id)
                .success(function (response) {
                    $location.url("/login");
                })
                .error(function (response) {
                    vm.error = "User not found";
                });
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user == null){
                vm.registrationerror = "Please enter your username, email and password";
                return;
            }
            if(user.username == null || user.email == null || user.password == null){
                vm.registrationerror = "Please enter your username, email and password";
                return;
            }
            if (user.password != user.passwordverification){
                vm.registrationerror ="";
                vm.passwordmismatch = "Passwords do not match";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .success(function(user){
                        vm.registrationerror = "Username taken, please try another username";
                        vm.passwordmismatch = "";
                })
                .error(function (err) {
                    UserService
                        .createUser(user)
                        .success(function (newuser) {
                            $location.url("/user/"+newuser._id);
                        });
                });
        }
    }
})();