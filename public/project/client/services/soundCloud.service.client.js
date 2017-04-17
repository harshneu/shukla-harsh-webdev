
function playSong(genre) {
    console.log(genre);
    SC.get('/tracks', {
        genres: genre, limit:10
    }, function (tracks) {
        console.log("Songs");
        console.log(tracks);
        SC.oEmbed(tracks[4].uri, {auto_play: true, maxHeight: 500 ,maxWidth: 200}, document.getElementById('player'));

        //});
    });
}


window.onload = function() {
    console.log("onload");
    SC.initialize({
        client_id: '98f35e5571e2edb9a137bf54910e57a1'
    });
};
