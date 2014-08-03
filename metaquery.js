(function ( window, document ) {
  "use strict";

  var metaQuery = {
    breakpoints: {},
    _isTicking: false,
    _debounceLastTime: 0,
    _namedEvents: {},
    _eventMatchCache: {},
    _globalEvents: [],
    onBreakpointChange: function () {
      var args = Array.prototype.slice.call( arguments ),
            fn = args.pop(),
            name = args.pop();

      if ( typeof name === "undefined" ) {
        metaQuery._globalEvents.push( fn );
      } else {
        ( metaQuery._namedEvents[name] = [] ).push( fn );
      }
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

  removeClass = function( element, className ) {
    var classes = element.className.split( ' ' ),
        index = classes.indexOf( className );

    if ( index > -1 ) {
      classes.splice( index, 1 );
      element.className = classes.join( ' ' );
    }
  },

  addClass = function(element, className) {
    if ( element.className.indexOf(className) === -1 ) {
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

  callGlobalEvents = function( activeBreakpoints ) {
    metaQuery._globalEvents.forEach(function(gfn) {
      if ( typeof gfn === 'function' ) { gfn(activeBreakpoints); }
    });
  },

  requestMqChange = function() {
    if( !metaQuery._isTicking ) {
      requestAnimationFrame( mqChange );
    }
    metaQuery._isTicking = true;
  },

  // A rAF fallback, adapted from https://gist.github.com/paulirish/1579671
  requestAnimationFrame = function( callback, element ) {
    if ( window.requestAnimationFrame ) {
      window.requestAnimationFrame( callback, element );
    } else {
      var currTime = new Date().getTime();
      var timeToCall = Math.max( 0, 16 - ( currTime - metaQuery._debounceLastTime ) );
      var id = window.setTimeout(function () {
        callback( currTime + timeToCall );
      }, timeToCall );

      metaQuery._debounceLastTime = currTime + timeToCall;

      return id;
    }
  },

  // Called when a media query changes state
  mqChange = function () {
    metaQuery._isTicking = false;
    var activeBreakpoints = [];

    for( var name in metaQuery.breakpoints ) {
      var query = metaQuery.breakpoints[name],
          matches = window.matchMedia( query ).matches;

      // Call events bound to a given breakpoint
      if ( metaQuery._namedEvents[name] && metaQuery._eventMatchCache[name] !== matches ) {
        metaQuery._eventMatchCache[name] = matches;
        for ( var i = 0; i < metaQuery._namedEvents[name].length; i++ ) {
          var fn = metaQuery._namedEvents[name][i];

          if ( typeof fn === 'function' ) { fn( matches ); }
        }
      }

      // store the matching mq
      if ( matches ) {
        activeBreakpoints.push( name );
      }

      updateClasses( matches, name );
    }

    // call any global events
    if ( activeBreakpoints.length !== 0 ) {
      callGlobalEvents( activeBreakpoints );
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
    mqChange();
    window.addEventListener( 'resize', requestMqChange );
  };

  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = metaQuery;
  } else {
    window.metaQuery = metaQuery;
  }

  preDomReady();
  readyState( onDomReady );

}( window, document ));
