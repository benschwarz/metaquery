(function ( window, document, metaQuery ) {
  if (!metaQuery) return;

  function updateElements ( matches ) {
    if ( !matches || !matches.length ) { return; }
    console.log( matches );

    var elements = document.getElementsByTagName( 'img' );

    for ( var i = 0; i < elements.length; i++ ) {
      var el = elements[i],
        template = el.getAttribute( 'data-mq-src' );

      if ( template ) {
        el.src = template.replace( '[breakpoint]', matches.join('-') );
      }
    }
  }

  metaQuery.onBreakpointChange( function (activeBreakpoints) {
    updateElements(activeBreakpoints);
  });
  console.log(arguments);
}(window, window.document, window.metaQuery));
