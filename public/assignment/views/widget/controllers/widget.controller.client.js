/**
 * Created by Harsh Shukla on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", editWidgetController)
        .controller("NewWidgetController", newWidgetController)
        .controller("WidgetListController", widgetListController);

    function editWidgetController(WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams["widgetId"];
        function init() {
            vm.widget = WidgetService.findPageByWebsiteId(vm.widgetId);
        }
        init();
    }

    function newWidgetController(WidgetService) {
        var vm = this;
    }

    function widgetListController(WidgetService) {
        var vm = this;
    }

})();