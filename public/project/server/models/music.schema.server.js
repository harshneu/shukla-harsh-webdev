module.exports = function(mongoose) {

    var ProjectMusicSchema = new mongoose.Schema({
        mbId : String,
        musicTitle: String,
        favoriteUsers : [{userId : String, username: String}],
        ratings : [Number],
        comments : [{
                commentId : String,
                userId : String,
                username : String,
                timestamp : String,
                comment : String
            }]}, {collection : 'project.music'});

    return ProjectMusicSchema;
};
