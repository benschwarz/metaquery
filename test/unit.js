test( 'public api', function () {
  var breakpoints = window.metaQuery.breakpoints;
  deepEqual( breakpoints, {
    "phone": "(max-width: 480px)",
    "small-tablet": "(min-width: 480px) and (max-width: 600px)",
    "tablet": "(min-width: 600px) and (max-width: 1024px)",
    "widescreen": "(min-width: 1024px)"
  });
});

test( 'image src set', function () {
  equal( $( 'img' ).attr( 'src' ), './images/moon-phone.jpg' );
});

/*test( 'media query active', function () {
  $(window).resize(320, 320);
  equal( window.metaQuery.mediaqueries[0].matches, true ); 
  $(window).resize(500, 500);
  equal( window.metaQuery.mediaqueries[0].matches, false );
});*/