test( 'public api', function () {
  var breakpoints = window.metaQuery.breakpoints;
  deepEqual( breakpoints, {
    'phone': {
      'query': '(max-width: 480px)',
      'mq': {
        'matches': true,
        'media': '(max-width: 480px)'
      }
    },
    'small-tablet': {
      'query': '(max-width: 600px) and (min-width: 480px)',
      'mq': {
        'matches': false,
        'media': '(max-width: 600px) and (min-width: 480px)'
      }
    },
    'tablet': {
      'query': '(max-width: 1024px) and (min-width: 600px)',
      'mq': {
        'matches': false,
        'media': '(max-width: 1024px) and (min-width: 600px)'
      }
    },
    'widescreen': {
      'query': '(min-width: 1024px)',
      'mq': {
        'matches': false,
        'media': '(min-width: 1024px)'
      } 
    }
  });
});

test( 'class added', function () {
  equal( $( window.document.documentElement ).hasClass( 'breakpoint-phone' ), true );
});

test( 'image source set', function () {
  equal( $( 'img[src]' ).attr( 'src' ), './images/phone.jpg' );
});

test( 'image alt set', function () {
  equal( $( 'img[alt]' ).attr( 'alt' ), 'phone' );
});

/*test( 'media query active', function () {
  $(window).resize(320, 320);
  equal( window.metaQuery.mediaqueries[0].matches, true ); 
  $(window).resize(500, 500);
  equal( window.metaQuery.mediaqueries[0].matches, false );
});*/