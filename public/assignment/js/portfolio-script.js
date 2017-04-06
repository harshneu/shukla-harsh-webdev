/**
 * Created by harshshukla on 4/5/17.
 */
(function(){
    var roller = theaterJS();

    roller
        .addActor('role', {speed: 1.0, accuracy: 0.9})
        .addScene('role: Web Development')
        .addScene('role: Software Development')
        .addScene('role:Analytics')
        .addScene('role:Artificial Intelligence')
        .addScene('role:Affective Computing')
        .addScene(roller.replay.bind(roller));

    window.sr = ScrollReveal({reset: true});
    sr.reveal('#intro', {duration: 500});
    sr.reveal('#education', {duration: 500});
    sr.reveal('#experience', {duration: 5000});
    sr.reveal('#projects', {duration: 500});
    //sr.reveal('#interests', {duration: 500});
    sr.reveal('#image-thumb-1', {duration: 100});
    sr.reveal('#image-thumb-2', {duration: 300});
    sr.reveal('#image-thumb-3', {duration: 500});
    sr.reveal('#image-thumb-4', {duration: 700});


    //sr.reveal('#links', {duration: 1000});
})();
$(document).foundation();
$('#offCanvasLeft').click(function(){
    //e.preventDefault();
//    $("#closeOffCanvas").click();
    $('#offCanvasLeft').removeClass('is-open');
    $('#offCanvasLeft').attr('aria-hidden',true);
    $('#offCanvasWrapper').removeClass('is-off-canvas-open').removeClass('is-open-left');
});
$('a').smoothScroll();