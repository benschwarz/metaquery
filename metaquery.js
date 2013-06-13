(function ( window, document ) {
  var metaQuery = {
    breakpoints: {},
    _events: {},
    _eventMatchCache: {},
    _globalEvents: [],
    bindGlobal: function ( fn ) {
      metaQuery._globalEvents.push( fn );
    },
    bind: function ( name, fn ) {
      ( metaQuery._events[name] = [] ).push( fn );

      mqChange();
    }
  },

  // Pinched domready
  // http://www.dustindiaz.com/smallest-domready-ever/
  readyState = function ( fn ) {
    if ( /in/.test( document.readyState ) ) {
      window.setTimeout( function () {
       readyState( fn );
      }, 9 );
    } else {
      fn();
    }
  },

  addEvent = function ( element, event, fn ) {
    if ( document.addEventListener ) {
      element.addEventListener( event, fn );
    } else {
      element.attachEvent( 'on' + event, fn );
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

  hasClass = function( element, className ) {
    return element.className.split(' ').indexOf( className ) !== -1;
  },

  removeClass = function( element, className ) {
    var classes = element.className.split( ' ' ),
        id = classes.indexOf( className );

    if ( hasClass( element, className ) ) {
      classes.splice( id, 1 );
      element.className = classes.join( ' ' );
    }
  },

  addClass = function(element, className) {
    if ( !hasClass( element, className ) ) {
      element.className = ( element.className !== '' ) ? ( element.className + ' ' + className ) : className;
    }
  },

  updateClasses = function ( matches, name ) {
    var breakpoint = 'breakpoint-' + name,
        htmlNode = document.documentElement;

    if ( matches ) {
      addClass( htmlNode, breakpoint );
    } else {
      removeClass( htmlNode, breakpoint );
    }
  },

  updateElements = function ( matches, name ) {
    if ( !matches ) { return; }

    var elements = document.getElementsByTagName( 'img' );

    for ( var i = 0; i < elements.length; i++ ) {
      var el = elements[i],
          template = el.getAttribute( 'data-mq-src' );

      if ( template ) {
        el.src = template.replace( '[breakpoint]', name );
      }
    }
  },

  // Called when a media query changes state
  mqChange = function () {
    for( var name in metaQuery.breakpoints ) {
      var query = metaQuery.breakpoints[name],
          matches = window.matchMedia( query ).matches;

      // Call events bound to a given breakpoint
      if ( metaQuery._events[name] && metaQuery._eventMatchCache[name] !== matches ) {
        for ( var i = 0; i < metaQuery._events[name].length; i++ ) {
          var fn = metaQuery._events[name][i];
          metaQuery._eventMatchCache[name] = matches;

          if ( typeof fn === 'function' ) { fn( matches ); }
        }

      }

      // call any global events
      if ( matches ) {
        for ( var j = 0; j < metaQuery._globalEvents.length; j++ ) {
          var gfn = metaQuery._globalEvents[j];
          if ( typeof gfn === 'function' ) { gfn(); }
        }
      }

      updateClasses( matches, name );
      updateElements( matches, name );
    }
  },

  collectMediaQueries = function () {
    var meta = document.getElementsByTagName( 'meta' );

    // Add classes to the HTML node when a breakpoint matches
    for ( var i = 0; i < meta.length; i++ ) {
      if ( meta[i].name === 'breakpoint' ) {
        var name = meta[i].getAttribute( 'content' ),
            query = meta[i].getAttribute( 'media' );

        metaQuery.breakpoints[name] = query;
      }
    }
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

    addEvent( window, 'resize', debounce( function () {
      mqChange();
    }, 50 ));

    mqChange();
  };

  window.metaQuery = metaQuery;

  preDomReady();
  readyState( onDomReady );

}( this, this.document ));

