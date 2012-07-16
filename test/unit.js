test( 'public api', function () {
  var breakpoints = window.metaQuery.breakpoints;
  deepEqual( breakpoints, {
    "(max-width: 1024px) and (min-width: 600px)": "tablet",
    "(max-width: 480px)": "phone",
    "(max-width: 600px) and (min-width: 480px)": "small-tablet",
    "(min-width: 1024px)": "widescreen"
  });
});

test( 'class added', function () {
  equal( $( window.document.documentElement ).hasClass( 'breakpoint-phone' ), true );
});

test( 'image source set', function () {
  equal( $( 'img' ).attr( 'src' ), './images/phone.jpg' );
});

/*test( 'media query active', function () {
  $(window).resize(320, 320);
  equal( window.metaQuery.mediaqueries[0].matches, true ); 
  $(window).resize(500, 500);
  equal( window.metaQuery.mediaqueries[0].matches, false );
});*/