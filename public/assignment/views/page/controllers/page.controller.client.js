/**
 * Created by Harsh Shukla on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", editPageController)
        .controller("NewPageController", newPageController)
        .controller("PageListController", pageListController);

    function editPageController(PageService, $routeParams) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

    function newPageController(PageService) {
        var vm = this;
    }

    function pageListController(PageService) {
        var vm = this;
    }

})();