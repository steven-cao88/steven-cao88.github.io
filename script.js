$(document).ready(function() {
	$('main').hide(); // hide all elements in main

	moveProgressBar(unfoldCurtain); // run progress bar
  
  // toggle side navigation
  $('.x-icon').click(function() {
    if (!opened) {
      openNav();
    } else {
      closeNav();
    }
  });

  // hover effect for external site icons
  $("i.fa").mouseenter(function() {
    $(this).removeClass("text-muted");
  }).mouseout(function() {
    $(this).addClass("text-muted");
  });

  // transition effect between sections
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();

            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

    $(window).scroll(function() {
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var offset = document.body.scrollTop || document.documentElement.scrollTop;
        // console.log('offset:' + offset);
        // top nav effects
        if (offset >= viewportHeight) {
          $('#top-nav').addClass('top-nav-changed');
          $('.to-top-container').show();
        } else {
          $('#top-nav').removeClass('top-nav-changed');
          $('.to-top-container').hide();
        }
        if (offset == 0) {
          $('.about-me').hide();
          $('.timeline-content').each(function(i) {
            /*(this).css({'opacity':'0'}).parent().removeClass('timeline-left-arrow timeline-right-arrow');*/
          });
          // $('#website').fadeTo(100, 0);
          $('#website').removeClass('fade-in');
          $('#web-application').removeClass('fade-in');
          $('#web-api').removeClass('fade-in');
        }
        if (offset >= 134) {
          $('.about-me').fadeIn(1000, function() {
            // transition for "what i do" section
            $('#website').addClass('fade-in');
            $('#web-application').addClass('fade-in');
            $('#web-api').addClass('fade-in');
          });
        }

        // timeline effects
        // Check the location of each timeline item
        $('.timeline-content').each(appear);

        // Gallery effects
        $('.card').each(appear);
    });  

    // to top effect
    $('.to-top-container').click(function() {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 1000);
    });        
});

function appear() {
  var bottom_of_object = $(this).offset().top + $(this).outerHeight();
  var bottom_of_window = $(window).scrollTop() + $(window).height();
  if (bottom_of_object && bottom_of_window > bottom_of_object ) {
    $(this).animate({'opacity':'1'}, 1000, function() {
    });
  }
}

function moveProgressBar(callback) {
  var elem = $('.intro-progress-bar');  
  var width = 0;
  var id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      callback();
    } else {
      width += 5; 
      elem.css('width', width + '%');
      elem.text(width * 1  + '%');
    }
  }
}

function unfoldCurtain() {
	$('.background-intro').hide('clip', function() {
    $('main').fadeIn(2000, function() {
      myMap(); // run map right after curtain unveiled
      $('.name-header').fadeTo(800, 1, function() {
        $('.role-header').fadeTo(800, 1, function() {
          $('.transition-icon').fadeIn(1000);
        });
      });
    });
	});
}

var opened = false;

function openNav() {
    $("#mySidenav").css("width", "420");
    // $("main").css("margin-right", "+=300");
    $('.x-icon').addClass('x-icon-change');
    opened = true;
    // $('.to-top-container').hide();
}

function closeNav() {
    $("#mySidenav").css("width", "0").promise().done(function() {
      var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      var offset = document.body.scrollTop || document.documentElement.scrollTop;
      if (offset >= viewportHeight) {
        $('.to-top-container').fadeIn(1000);
      }
    });
    // $("main").css("margin-right", "-=300");
    $('.x-icon').removeClass('x-icon-change');
    opened = false;
}

function myMap() {
  var myLatlng = {lat: -27.469, lng: 153.025};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom',
    animation: google.maps.Animation.BOUNCE
  });

  map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener('click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}