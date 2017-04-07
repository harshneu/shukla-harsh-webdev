(function () {
    'use strict';
    angular
        .module("MusicZoneApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http){
        var model = {
            userFavoritesMusic: userFavoritesMusic,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            register: register,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserById : findUserById,
            findUserByName: findUserByName,
            updateUser: updateUser,
            updateUserById: updateUserById,
            login: login,
            logout: logout,
            findUserFavorites: findUserFavorites,
            followUser: followUser,
            unfollowUser: unfollowUser,
            findFollowing: findFollowing
        };

        return model;

        function userFavoritesMusic(userId, music) {
            return $http.put('/api/project/user/' + userId + '/music', music);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get('/api/project/loggedin');
        }

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function register(user) {
            return $http.post('/api/project/register', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function findAllUsers(callback) {
            return $http.get('/api/project/admin/user');
        }

        function findUserById(userId) {
            return $http.get('/api/project/user/' + userId);
        }

        function findUserByName(username) {
            return $http.get('/api/project/user/username/' + username);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }

        function updateUserById(userId, user)
        {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function findUserFavorites(userId) {
            return $http.get('/api/project/user/' + userId +'/music');
        }

        function followUser(otherUser, userId) {
            return $http.post('/api/project/user/' + userId + '/follow', otherUser);
        }

        function unfollowUser(otherUser, userId) {
            return $http.delete('/api/project/user/' + userId + '/unfollow/' + otherUser);
        }

        function findFollowing(userId, otherUser) {
            return $http.get('/api/project/user/' + userId + '/following', otherUser);
        }
    }
})();