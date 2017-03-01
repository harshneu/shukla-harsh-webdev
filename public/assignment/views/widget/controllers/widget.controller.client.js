(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $location, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (response) {
                    vm.widgets = response;
                    if(vm.widgets.length == 0){
                        vm.error = "No widgets";
                    }
                });
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.createHeaderWidget = createHeaderWidget;
        vm.createHTMLWidget = createHTMLWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        function createHeaderWidget(headerSize) {
            var widget = {type: "HEADER",
                size: headerSize.toString(),
                text: "Sample Heading "+headerSize}
            WidgetService
                .createWidget(vm.pid, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                })
            // if(newWidget != null){
            //     $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
            // }
        }
        function createHTMLWidget() {
            var widget = {type: "HTML",
                text: "Sample <i>HTML</i> text"};
            WidgetService
                .createWidget(vm.pid, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                })

        }
        function createImageWidget() {
            var widget = {type: "IMAGE",
                width: "100%",
                url: ""}
            WidgetService
                .createWidget(vm.pid, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                })
        }
        function createYoutubeWidget() {
            var widget = {type: "YOUTUBE",
                width: "100%",
                url: "https://www.youtube.com/embed/vlDzYIIOYmM"}
            WidgetService
                .createWidget(vm.pid, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                })
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.hasEmptyProperties = hasEmptyProperties;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (response) {
                    vm.widget = response;
                })
        }
        init();

        function hasEmptyProperties(target) {
            for (var member in target) {
                if(member === "url" || member == "index"){
                    continue;
                }
                if (target[member] == "")
                    return true;
            }
            return false;
        }

        function updateWidget(updatedWidget) {
            vm.updateerror = null;
            if(vm.hasEmptyProperties(updatedWidget)){
                vm.updateerror = "Could not update the widget!";
                return;
            }
            WidgetService
                .updateWidget(vm.wgid, updatedWidget)
                .success(function (response) {
                    var updatedWidgetObject = response;
                    if(updatedWidgetObject){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    }
                })
                .error(function(response){
                    vm.updateerror = "Could not update the widget!";
                });
        }
        function deleteWidget(wgid) {
            WidgetService
                .deleteWidget(wgid)
                .success(function (response) {
                    if(response){
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    }
                })
                .error(function (response) {
                    vm.deleteerror = "Could not delete the widget!";
                })
        }
    }
})();