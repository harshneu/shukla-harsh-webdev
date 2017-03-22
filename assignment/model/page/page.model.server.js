module.exports = function () {

    var model = null;
    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api =
        {
        "createPage":createPage,
        "findAllPagesForWebsite":findAllPagesForWebsite,
        "findPageById":findPageById,
        "updatePage":updatePage,
        "deletePage":deletePage,
        "deletePageSubPages":deletePageSubPages,
        "setModel":setModel
        };

    return api;

    function createPage(websiteId, newPage){
        return PageModel
            .create(newPage)
            .then(function (page) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        page._website = website._id;
                        website.save();
                        page.save();
                        return page;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }
    function findAllPagesForWebsite(websiteId){
        return PageModel.find({_website:websiteId});
    }
    function findPageById(pageId){
        return PageModel.findOne({_id:pageId});
    }
    function updatePage(pageId, updatedPage){
        return PageModel.update({_id:pageId},{$set: updatedPage});
    }
    function deletePage(pageId) {
        return PageModel.findById(pageId).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            return deletePageSubPages(pageId);
        }, function (err) {
            return err;
        });
    }

    function continuousDelete(widgetsOfPage, pageId) {
        if(widgetsOfPage.length == 0){
               return PageModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.widgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return continuousDelete(widgetsOfPage, pageId);
                }
            }, function (err) {
                return err;
            });
    }

    function deletePageSubPages(pageId) {
        return PageModel.findById({_id: pageId})
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                return continuousDelete(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};