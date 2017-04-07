
function playSong(genre) {
    console.log("playSong");
    console.log(genre);
    SC.get('/tracks', {
        //q: 'shotmedown', streamable: true, limit: 1, tags: 'davidguetta'
        genres: genre, limit:10
    }, function (tracks) {
        console.log("Tracks");
        console.log(tracks);
        SC.oEmbed(tracks[4].uri, {auto_play: false, maxHeight: 200}, document.getElementById('player'));
        //SC.oEmbed(tracks[4].uri, {auto_play: false, maxHeight: 200},function(res) {
        // $("#player").html(res.html);
        //});
    });
}


window.onload = function() {
    console.log("onload");
    SC.initialize({
        client_id: '98f35e5571e2edb9a137bf54910e57a1'
    });
};
