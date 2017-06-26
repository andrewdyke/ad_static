jQuery( function( $ ) {

  var $body = $('body');
  var $header = $('#header');
  var $headerText = $('.headerText');
  var $mainNav = $('#mainNav');
  var $headerContainer = $('.cont2');
  var $nav = $('.nav');
  var $toggle = $('.toggle');
  var $navLink = $('.nav a');

  $body.fadeTo(1000, 1);

  // Smooth Scroll to has location on link click
  $('a[href^="#"]').click(function(e) {
    // e.preventDefault();
    $('html,body').animate({scrollTop: jQuery(this.hash).offset().top}, 1000);
    return false;
  });

  // Hamburger Menu
  var openNavigation = function() {
    $nav.slideDown();
    $toggle.addClass('open');
  };

  var closeNavigation = function() {
    $nav.slideUp();
    $toggle.removeClass('open');
  };

  $toggle.on('click', function(e) {
    if ($nav.is(':visible')) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });

  $navLink.on('click', function(e){
    closeNavigation();
  });

});
