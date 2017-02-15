(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO"},
            {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something"},
            {_id: "345", widgetType : "IMAGE", pageId: "321", width:"90%", url : "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256263_1280.jpg"},
            {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>"},
            {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Watch the game here"},
            {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%", url: "https://www.youtube.com/embed/mFIOGpIQtVU"},
            {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Thats about it </p>"}
        ];

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            var wgid = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
            var newWidget;
            switch (widget.type){
                case "HEADER":
                    newWidget = {   _id: wgid,
                                    widgetType: widget.type,
                                    pageId: pageId,
                                    size: widget.size,
                                    text: widget.text};
                    break;
                case "HTML":
                    newWidget = {   _id: wgid,
                                    widgetType: widget.type,
                                    pageId: pageId,
                                    text: widget.text};
                    break;
                case "IMAGE":
                    newWidget = {   _id: wgid,
                                    widgetType: widget.type,
                                    pageId: pageId,
                                    width: widget.width,
                                    url: widget.url};
                    break;
                case "YOUTUBE":
                    newWidget = {   _id: wgid,
                                    widgetType: widget.type,
                                    pageId: pageId,
                                    width: widget.width,
                                    url: widget.url};
                    break;
            }

            widgets.push(newWidget);
            return angular.copy(newWidget);
        }
        function findWidgetByPageId(pid) {
            var widgetsList = [];
            for(var i = 0; i< widgets.length;i++){
                if(widgets[i].pageId === pid){
                    var widget = angular.copy(widgets[i]);
                    widgetsList.push(widget);
                }
            }
            return widgetsList;
        }
        function findWidgetById(widgetId) {
            for(var i = 0; i< widgets.length;i++){
                if(widgets[i]._id === widgetId){
                    var widget = angular.copy(widgets[i]);
                    return widget;
                }
            }
            return null;
        }
        function updateWidget(wgid, updatedWidget) {
            for(var i in widgets) {
                var widget = widgets[i];
                if( widget._id === wgid) {
                    widgets[i] = updatedWidget;
                    return angular.copy(widget);
                }
            }
            return null;
        }
        function deleteWidget(wgid) {
            for(var i in widgets) {
                var widget = widgets[i];
                if( widget._id === wgid ) {
                    widgets.splice(i,1);
                    return 1;
                }
            }
            return null;
        }
    }
})();