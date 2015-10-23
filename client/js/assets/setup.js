/*
* Set up
*/
$(document).ready(function() {
	menuSetup();
	menuShadowSetup();
});

$(window).on("scroll", function() {
	menuSetup();
});

$(window).on("resize", function() {
	menuShadowSetup();
});

function menuSetup() {
	var scrollOffset = $(window).scrollTop();
	if(scrollOffset === 0) {
		$("#menu").removeClass("sticky");
	} else {
		$("#menu").addClass("sticky");
	}
}

function menuShadowSetup() {
		$("#menu-shadow").height($("#menu").outerHeight());
}