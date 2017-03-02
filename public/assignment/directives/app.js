/**
 * Created by harshshukla on 2/28/17.
 */
(function(){
    angular
        .module('DirectiveApp',[])
        .directive("makeMeDraggable",makeMeDraggableDir)
        .directive('makeMeSortable',makemesortableDir);


    function  makemesortableDir() {
        function linkfunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                scroll: false
            });
        }
        return {
            link: linkfunc
        }
    }

    function  makeMeDraggableDir() {
        function linkFunc(scope, element) {
            element.draggable();
        }
        return {
            link: linkFunc
        }
    }
})();