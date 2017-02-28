(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }
        function findWidgetsByPageId(pid) {
            return $http.get("/api/page/"+pid+"/widget");
        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }
        function updateWidget(wgid, updatedWidget) {
            return $http.put("/api/widget/"+wgid,updatedWidget);
        }
        function deleteWidget(wgid) {
            return $http.delete("/api/widget/"+wgid);
        }
    }
})();