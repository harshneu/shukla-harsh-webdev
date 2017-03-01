// A directive to implement the reordering behavior for the widgets using Jquery.

(function() {
    angular
        .module('WebAppMaker')
        .directive('jgaSortable', jgaSortable);

    function jgaSortable() {
        function linkfunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                cursor: "move",
                handle: ".cog-style"
            });
        }
        return {
            link: linkfunc
        }
    }
})();