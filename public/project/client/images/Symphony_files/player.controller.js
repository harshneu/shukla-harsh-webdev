(function() {

    angular
        .module("SymphonyApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($routeParams) {
        var vm = this;


        var artist = $routeParams.artistName;
        var title = $routeParams.trackName;

        vm.title = title;

        function init() {

            SC.initialize({
                client_id: '98f35e5571e2edb9a137bf54910e57a1'
            });
            playSong(artist, title);
        }

        init();

        function playSong(artist, title) {
            SC.get('/tracks', {
                q: title+' '+artist
            }, function (tracks) {

                //console.log(tracks);
                var played= false;

                for(var i =0; i<tracks.length;i++) {

                    if (((tracks[i].permalink.indexOf(title) >= 0 && tracks[i].permalink.indexOf(artist) >= 0) ||
                        (tracks[i].title.indexOf(title) >= 0 && tracks[i].title.indexOf(artist) >= 0) ||
                        (tracks[i].tag_list.indexOf(title) >= 0 && tracks[i].tag_list.indexOf(artist) >= 0 )) &&
                        (tracks[i].track_type !== 'recording' && tracks[i].track_type !== 'spoken' &&
                        tracks[i].track_type !== 'demo' && tracks[i].track_type !== 'in progress' &&
                        tracks[i].track_type !== null && tracks[i].genre !== "" && tracks[i].genre !== null)) {

                            played = true;
                            vm.title = tracks[i].title;
                            vm.tags = tracks[i].tag_list;

                            SC.oEmbed(tracks[i].permalink_url, {
                                auto_play: true,
                                maxHeight: 200
                            }, document.getElementById('player'));
                            break;
                    }
                }

                if(played === false) {
                    console.log("in played === false");
                    played = true;
                    vm.title = tracks[0].title;
                    vm.tags = tracks[0].tag_list;
                    SC.oEmbed(tracks[0].permalink_url, {
                        auto_play: true,
                        maxHeight: 200
                    }, document.getElementById('player'));
                }
            });
        }

    }
})();