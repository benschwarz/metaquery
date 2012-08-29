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
  
  updateElements = function ( matches, suffix ) {
    if( !matches ) { return; }
    
    $( 'img[data-mq-src]' ).each(function () {
      var $img = $( this ),
          name = $img.attr( 'data-mq-src');
          extension = name.substring(name.lastIndexOf('.'), name.length);
          path = name.substring(0, name.lastIndexOf('.'));

      $img.attr( 'src', path + '-' + suffix + extension);
    });
  },
  
  // Called when a media query changes state
  mqChange = function () {
    for( var name in metaQuery.breakpoints ) {
      var query = metaQuery.breakpoints[name],
          matches = window.matchMedia( query ).matches;
      
      // Call events bound to a given breakpoint
      if( metaQuery._events[name] && metaQuery._eventMatchCache[name] !== matches ) {
        for( var i = 0; i < metaQuery._events[name].length; i++ ) {
          var fn = metaQuery._events[name][i];
          metaQuery._eventMatchCache[name] = matches;
          
          if( typeof fn === 'function' ) { fn( matches ); }
        }
      }
      updateElements( matches, name );
    }
  },
  
  collectMediaQueries = function () {
    $('meta[name=breakpoint]').each( function () {
      var $el = $( this );
      metaQuery.breakpoints[$el.attr( 'data' )] = $el.attr( 'media' );
    });
  },
  
  init = function () {
    collectMediaQueries();
    
    $( window ).on( 'resize', debounce ( function () {
      mqChange();
    }, 50));
    
    mqChange();
  };
  
  window.metaQuery = metaQuery;
  
  // DOM ready
  $(function () {
    init();
  })
}( this, this.document, jQuery ));