/*
* Set up
*/
$(document).ready(function() {
    menuSetup();
});

$(window).on("scroll", function() {
    menuSetup();
});

function menuSetup() {
    var scrollOffset = $(window).scrollTop();
    if(scrollOffset === 0) {
        $("#menu").removeClass("sticky");
    } else {
        $("#menu").addClass("sticky");
    }
}