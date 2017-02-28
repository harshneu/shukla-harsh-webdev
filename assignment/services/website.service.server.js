(function() {
// returns the object  as the result of a require call
    module.exports = function (app) {
        var websites = [
            {
                _id: "123",
                name: "Facebook",
                developerId: "123",
                description: "Connect with friends and the world around you on Facebook."
            },
            {
                _id: "234",
                name: "Twitter",
                developerId: "123",
                description: "Our mission: To give everyone the power to create and share ideas and information instantly, without barriers."
            },
            {
                _id: "345",
                name: "Gizmodo",
                developerId: "111",
                description: "Gizmodo is a design"
            },
            {
                _id: "456",
                name: "Tic Tac Toe",
                developerId: "111",
                description: "Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid."
            },
            {
                _id: "567",
                name: "Checkers",
                developerId: "333",
                description: "Checkers is a group of strategy board games for two players"
            },
            {
                _id: "678",
                name: "Chess",
                developerId: "123",
                description: "Play chess on Chess.com - the #1 chess community with millions of members around the world."
            }
        ];

        // methods for app
        app.post("/api/user/:userId/website", createWebsite);
        app.get("/api/user/:userId/website", findAllWebsitesForUser);
        app.get("/api/website/:websiteId", findWebsiteById);
        app.put("/api/website/:websiteId", updateWebsite);
        app.delete("/api/website/:websiteId", deleteWebsite);

        //New website
        function createWebsite(req, res) {
            var userId = req.params.userId;
            var newwebsite = req.body;
            var wid = (parseInt(websites[websites.length - 1]._id) + 1).toString();
            var newWebsite = {
                _id: wid,
                name: newwebsite.name,
                developerId: userId,
                description: newwebsite.description
            };
            websites.push(newWebsite);
            res.json(newWebsite);
        }
        // Find website using names ,Id etc.
        function findAllWebsitesForUser(req, res) {
            var userId = req.params.userId;
            var websitesList = websites.filter(function (website) {
                return website.developerId === userId;
            });
            res.json(websitesList);
        }

        function findWebsiteById(req, res) {
            var websiteId = req.params.websiteId;
            var website = websites.find(function (websiteObject) {
                return websiteObject._id == websiteId;
            });
            res.json(website);
        }
// Website Update
        function updateWebsite(req, res) {
            var websiteId = req.params.websiteId;
            var updatedWebsite = req.body;
            for (var i in websites) {
                var website = websites[i];
                if (website._id === websiteId) {
                    websites[i].name = updatedWebsite.name;
                    websites[i].description = updatedWebsite.description;
                    res.json(website);
                }
            }
        }
/// Delete Website
        function deleteWebsite(req, res) {
            var websiteId = req.params.websiteId;
            for (var i in websites) {
                var website = websites[i];
                if (website._id === websiteId) {
                    websites.splice(i, 1);
                    res.sendStatus(200); //Success Message
                    return;
                }
            }
            res.sendStatus(404); // Error Message
        }
    }
})();