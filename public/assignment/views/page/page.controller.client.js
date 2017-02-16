(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init(){
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            if(vm.pages.length == 0){
                vm.error = "Page not created";
            }
        }
        init();
    }
    
    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init(){
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            if(vm.pages.length == 0){
                vm.error = "Page not created";
            }
        }
        init();

        vm.addNewPage = addNewPage;
        function addNewPage(newPage) {
            if(newPage == null || newPage.name == null || newPage.name == "" || newPage.description == ""){
                vm.blankerror = "Please provide the required details";
                return;
            }
            var page = PageService.createPage(vm.websiteId,newPage);
            if(page == null){
                vm.error = "Page not created";
                return;
            }
            else{
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        }
    }
    
    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
            if (vm.page == null){
                $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            if(vm.pages.length == 0){
                vm.error = "No page to view";
            }
        }
        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            if(page == null || page.name == null || page.name == "" || page.description == ""){
                vm.blankerror = "Please proveide the required fields";
                return;
            }
            var page = PageService.updatePage(vm.pageId, page);
            if(page == null){
                vm.error = "Can not update";
            }
            else {
                $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        }
        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if(result == null){
                vm.deleteError = "Deletion failed";
                return;
            }
            else{
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        }
    }
})();