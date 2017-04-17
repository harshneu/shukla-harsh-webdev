(function(){
    'use strict';
    angular
        .module("SymphonyApp")
        .factory("musicService", musicService);

    function musicService($http) {

        var api = {
            findAllComments: findAllComments,
            postComment: postComment,
            deleteComment: deleteComment,
        };
        return api;

        function findAllComments(mbId) {
            return $http.get('/api/project/music/' + mbId + '/comment');
        }

        function postComment(mbId, musicTitle, comment) {
            return $http.post('/api/project/music/' + mbId + '/' + musicTitle + '/comment', comment);
        }

        function deleteComment(mbId, commentId) {
            return $http.delete('/api/project/music/' + mbId + '/comment/' + commentId);
        }

    }
})();