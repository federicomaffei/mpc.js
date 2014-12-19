$(document).ready(function() {
    $('.drumbutton').click(function(){
        startSound($(this).data("button"));
    });
});