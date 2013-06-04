(function ( window, document, $ ) {
  var metaQuery = {
    breakpoints: {},
    _events: {},
    _eventMatchCache: {},
    bind: function ( name, fn ) {
      ( metaQuery._events[name] = [] ).push( fn );

      mqChange();
    }
  },

  debounce = function( func, wait ) {
    var args,
        thisArg,
        timeoutId;

    function delayed() {
      timeoutId = null;
      func.apply( thisArg, args );
    }

    return function() {
      window.clearTimeout( timeoutId );
      timeoutId = window.setTimeout( delayed, wait );
    };
  },

  updateClasses = function ( matches, name ) {
    $( 'html' ).toggleClass( 'breakpoint-' + name, matches );
  },

  updateElements = function ( matches, name ) {
    if ( !matches ) { return; }

    $( 'img[data-mq-src]' ).each(function () {
      var $img = $( this ),
          attr = $img.attr( 'data-mq-src');

      $img.attr( 'src', attr.replace( '[breakpoint]', name ) );
    });
  },

  // Called when a media query changes state
  mqChange = function () {
    for ( var name in metaQuery.breakpoints ) {
      var query = metaQuery.breakpoints[name],
          matches = window.matchMedia( query ).matches;

      // Call events bound to a given breakpoint
      if ( metaQuery._events[name] && metaQuery._eventMatchCache[name] !== matches ) {
        for( var i = 0; i < metaQuery._events[name].length; i++ ) {
          var fn = metaQuery._events[name][i];
          metaQuery._eventMatchCache[name] = matches;

          if( typeof fn === 'function' ) { fn( matches ); }
        }
      }

      updateClasses( matches, name );
      updateElements( matches, name );
    }
  },

  collectMediaQueries = function () {
    $( 'meta[name=breakpoint]' ).each( function () {
      var $el = $( this );
      metaQuery.breakpoints[$el.attr( 'content' )] = $el.attr( 'media' );
    });
  },


  // If the META tags are defined above this script,
  // we don't need to wait for domReady to set the breakpoint
  // class on the HTML element, fighting the FOUT.
  preDomReady = function () {
    collectMediaQueries();
    mqChange();
  },

  // After domReady, we can be sure all our META and IMG tags
  // are in the DOM.
  onDomReady = function () {
    collectMediaQueries();

    $( window ).on( 'resize', debounce ( function () {
      mqChange();
    }, 50));

    mqChange();
  };

  window.metaQuery = metaQuery;

  preDomReady();
  $(function () {
    onDomReady();
  })
}( this, this.document, jQuery ));
