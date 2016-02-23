$(document).ready(function() {
	$("#credits").hide();
	$("#credits_menu").on("mousedown", function() {
		$("#menu").hide();
		$("#credits").show();
	});
	$("#back_to_menu").on("mousedown", function() {
		$("#credits").hide();
		$("#menu").show();
	});	
});