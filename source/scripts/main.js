
// Andrew Dyke Portfolio

let ad = {
	init() {
		setTimeout(ad.fadeInPage, 300)
		// ad.fadeInPage()
	},
	fadeInPage() {
		$('#overlay').fadeOut(600)
	},
	nav: {
		panel: $('.nav'),
		toggle: $('.toggle'),
		navLink: $('.nav a'),
		open() {
	    ad.nav.panel.slideDown()
	    ad.nav.toggle.addClass('open')
	  },
  	close() {
      ad.nav.panel.slideUp()
      ad.nav.toggle.removeClass('open')
    },
    links: $('a[href^="#"]')
	}
}

// Smooth Scroll to hash location on link click
ad.nav.links.on('click', function(e) {
  $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000)
})

// Hamburger Toggle Click Open/Close
ad.nav.toggle.on('click', (e) => {
  if (ad.nav.panel.is(':visible')) {
    ad.nav.close()
  } else {
    ad.nav.open()
  }
})

// Close nav on
ad.nav.navLink.on('click', (e) => {
  ad.nav.close()
})

// initialize on doc ready
jQuery(function($) {
	ad.init()
})
