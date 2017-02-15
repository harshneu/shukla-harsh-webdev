/**
 * Created by Harsh Shukla on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", editWebsiteController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("WebsiteListController", websiteListController);

    function editWebsiteController(WebsiteService, $routeParams) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            vm.userWebsites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        //Event Handlers:
        vm.updateWebsite = updateWebsite;
        //vm.deleteWebsite = deleteWebsite;
        
        function updateWebsite(newWebsite) {
            var website = WebsiteService.updateWebsite(vm.websiteId, newUser);
        }
    }

    function newWebsiteController(WebsiteService) {
        var vm = this;
    }

    function websiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }


})();