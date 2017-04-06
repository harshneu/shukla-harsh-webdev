(function() {
    'use strict';
    angular
        .module("MusicZoneApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {

        var vm = this;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    vm.user = response.data;
                    UserService.setCurrentUser(response.data);
                });
            vm.remove = remove;
            vm.update = update;
            vm.add    = add;
            vm.select = select;
            vm.sortType = 'username';
            vm.sortReverse = false;
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user, index)
        {
            UserService
                .deleteUserById(user._id)
                .then(function(response) {
                    vm.users.splice(index,1);
                });
        }

        function update(user)
        {
            if(user.roles) {
                user.roles = user.roles.split(",");
            }
            UserService
                .updateUserById(user._id, user)
                .then(function(response) {
                    for(var i in vm.users) {
                        if(vm.users[i]._id === user._id) {
                            user.roles = user.roles.toString();
                            vm.users[i] = user;
                        }
                    }
                });
        }

        function add(user)
        {
            if(user.roles) {
                user.roles = user.roles.split(",");
            }

            UserService
                .createUser(user)
                .then(function(response) {
                    vm.users.push(response.data);
                });
        }

        function select(user)
        {
            user.roles = user.roles.toString();
            vm.user = user;
        }

        function handleSuccess(response) {
            for(var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
            vm.users = response.data;
            console.log(vm.users);
        }

        function handleError(error) {
            vm.error = error;
        }

    }
})();