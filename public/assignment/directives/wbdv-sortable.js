(function() {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function linkfunc(scope, element, attributes, sortingController) {
            element.sortable({
                start: function(event, ui){
                    ui.item.startPos = ui.item.index();
                },
                update: function(event, ui){
                    var startIndex = ui.item.startPos;
                    var endIndex = ui.item.index();
                    sortingController.widgetsSort(startIndex, endIndex);
                },
                axis: 'y',
                cursor: "move",
                handle: ".hamburger-style"
            });
        }
        return {
            link: linkfunc,
            controller: sortableWidgetsController
        }
    }
    function sortableWidgetsController(WidgetService, $routeParams) {
        var vm = this;
        vm.widgetsSort = widgetsSort;

        function widgetsSort(start, end) {
            var pageId = $routeParams.pid;
            WidgetService
                .updateWidgetOrder(pageId, start, end)
                .success(function (response) {
                })
                .error(function () {
                });
        }
    }
})();
