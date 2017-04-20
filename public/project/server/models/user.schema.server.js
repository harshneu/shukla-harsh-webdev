module.exports = function(mongoose) {

    var ProjectUserSchema = new mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        google: {
            id:    String,
            token: String
        },
        phones : [String],
        roles : [String],
        favoriteMusic : [{mbId : String, musicTitle : String}],
        following : [{username : String, userId : String}]
    }, {collection : 'project.user'});

    return ProjectUserSchema;
};