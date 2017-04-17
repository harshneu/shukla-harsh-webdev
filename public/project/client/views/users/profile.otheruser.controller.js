/**
 * Created by harshshukla on 4/16/17.
 */
(function() {
    'use strict';
    angular
        .module("SymphonyApp")
        .controller("n ProfileOtherUserController", ProfileOtherUserController);

    function ProfileOtherUserController($routeParams, UserService, $rootScope) {
        var vm = this;

        var currUser= $rootScope.currentUser;
        vm.followUsers = null;


        var otherUser;
        var otherUserId = $routeParams.userId;
        vm.followBtn = "yes";
        vm.otherFollowBtn = "yes";



        function init() {
            if(currUser !== undefined) {
                vm.following = currUser.following;
                for (var i in vm.following) {
                    if (vm.following[i].userId === otherUserId) {
                        vm.otherFollowBtn = "no";
                    } else {
                        vm.otherFollowBtn = "yes";
                    }
                }
            } else {
                vm.following = null;
            }

            if(currUser !== undefined) {
                if (currUser._id === otherUserId) {
                    vm.followBtn = "no";
                } else {
                    vm.followBtn = "yes";
                }
            }

            if (currUser !== undefined) {
                for (var i = 0; i < currUser.following.length; i++) {
                    if (vm.followUsers === null) {
                        vm.followUsers = [currUser.following[i].username];
                    } else {
                        vm.followUsers.push(currUser.following[i].username);
                    }
                }
            }

            findUser();
        }

        init();

        function findUser() {
            UserService
                .findUserById(otherUserId)
                .then(
                    function(response) {
                        var user = response.data[0];
                        user.emails = user.emails.toString();
                        vm.user = user;
                        otherUser = user;
                    }
                );
        }



        vm.followUser = followUser;

        function followUser() {

            var otherUsr = {
                username : otherUser.username,
                userId : otherUser._id
            };

            UserService
                .followUser(otherUsr, $rootScope.currentUser._id)
                .then(
                    function(response) {
                        if (vm.followUsers === null) {
                            vm.followUsers = [currUser.following.username];
                        } else {
                            vm.followUsers.push(currUser.following.username);
                        }
                        vm.otherFollowBtn="no";
                        vm.followBtn = "yes";
                        vm.followMessage = "You are now following " + otherUser.username;
                    }
                );
            findUser();
        }

        vm.unfollowUser = unfollowUser;

        function unfollowUser() {
            UserService.unfollowUser(otherUserId, currUser._id)
                .then(
                    function(response) {
                        vm.otherFollowBtn="yes";
                        vm.followBtn = "yes";
                        vm.followMessage = "You are now not following " + otherUser.username;
                    }
                )
        }
        findUser();
    }
})();