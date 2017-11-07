$(document).ready(function() {
	$("i.fa").mouseenter(function() {
		$(this).removeClass("text-muted");
	}).mouseout(function() {
		$(this).addClass("text-muted");
	});

	$(".menu-icon-container").click(function() {
		$(this).toggleClass("change");
		if (!opened) {
			openNav();
		} else {
			closeNav();
		}
	});
});

var opened = false;

function openNav() {
    $("#mySidenav").css("width", "250");
    $("#main").css("margin-right", "+=250");
    opened = true;
}

function closeNav() {
    $("#mySidenav").css("width", "0");
    $("#main").css("margin-right", "-=250");
    opened = false;
}