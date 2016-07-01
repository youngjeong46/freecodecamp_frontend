$(document).ready(function(){
	$('body').scrollspy({target: ".navbar", offset: 50}); 

	// Add smooth scrolling to all links inside a navbar
	$(".nav a").on('click', function(event){

    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
});