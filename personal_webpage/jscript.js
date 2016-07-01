$(document).ready(function() {
  $('body').scrollspy({
    target: ".navbar",
    offset: 50
  });

  // Add smooth scrolling to all links inside a navbar
  $(".nav a").on('click', function(event) {

    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
    
    var target;
    target = this.hash;

    event.preventDefault();

    return $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 600, function() {
      return window.history.pushState(null, null, target);
    });
  });

});