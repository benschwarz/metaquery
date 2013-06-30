(function ( window, document ) {
  var metaQuery = {
    breakpoints: {},
    _globalEvents: [],

    onBreakpointChange: function ( breakpointName, callback ) {
      var fn = function ( mql ) {
        var breakpoint = findBreakpointByQuery( mql.media ),
            name = breakpoint['name'],
            matches = breakpoint['mql'].matches;

        callback( matches );
        runGlobalCallbacks( matches, name );
      };

      metaQuery.breakpoints[breakpointName].addListener( fn );
    },

    onAnyBreakpointChange: function ( callback ) {
      metaQuery._globalEvents.push( callback );
    }
  },

  // Node lists are 'live', lets use that functionality
  metaTags = document.getElementsByTagName( 'meta' ),
  elements = document.getElementsByTagName( 'img' ),

  // Utilities
  each = function ( collection, fn ) {
    for ( var i = 0; i < collection.length; i++ ) {
      fn( collection[i], i );
    }
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

  addClass = function( element, className ) {
    if ( !hasClass( element, className ) ) {
      element.className = ( element.className !== '' ) ? ( element.className + ' ' + className ) : className;
    }
  },

  // End utilities

  /*
    Adds and removes breakpoint classes to the HTML element
    depending on the media query match status
  */
  updateClasses = function ( matches, name ) {
    var breakpoint = 'breakpoint-' + name,
        htmlNode = document.documentElement;

    if ( matches ) {
      addClass( htmlNode, breakpoint );
    } else {
      removeClass( htmlNode, breakpoint );
    }
  },

  // Sets the img['src'] on images that have data-mq-src attributes
  updateElements = function ( matches, name ) {
    if ( !matches ) { return; }

    var setSrc = function ( element ) {
      var template = element.getAttribute( 'data-mq-src' );
      if ( template ) { element.src = template.replace( '[breakpoint]', name ); }
    };

    each( metaQuery.breakpoints, setSrc );
  },

  // Returns a metaQuery breakpoint
  findBreakpointByQuery = function ( mq ) {
    for ( var name in metaQuery.breakpoints ) {
      var mql = metaQuery.breakpoints[name];
      if ( mql.media === mq ) {
        return {
          name: name,
          mql: mql
        };
      }
    }
  },

  runGlobalCallbacks = function ( match, breakpointName ) {
    each( metaQuery._globalEvents, function ( callback ) {
      callback( match, breakpointName );
    });
  },

  collectMediaQueries = function () {
    // Add classes to the HTML node when a breakpoint matches
    each( metaTags, function ( tag ) {
      if ( tag.name === 'breakpoint' ) {
        var name = tag.getAttribute( 'content' ),
            mq = tag.getAttribute( 'media' );

        metaQuery.breakpoints[name] = window.matchMedia( mq );
        metaQuery.onBreakpointChange( name, updateClasses );
        metaQuery.onBreakpointChange( name, updateElements );
      }
    });
  },

  // Called as a warm up check for breakpoints
  globalCallbackInit = function () {
    for( var name in metaQuery.breakpoints ) {
      var matches = metaQuery.breakpoints[name].matches;
      runGlobalCallbacks( matches, name );
    }
  },

  onDomReady = function () {
    collectMediaQueries();
    globalCallbackInit();
  };

  // Use onBreakpointChange API to power changes
  metaQuery.onAnyBreakpointChange( updateClasses );
  metaQuery.onAnyBreakpointChange( updateElements );

  // If the META tags are defined above this script,
  // we don't need to wait for domReady to set the breakpoint
  // class on the HTML element, fighting the FOUT.
  onDomReady();

  window['metaQuery'] = metaQuery;
  window.addEventListener( 'DOMContentLoaded', onDomReady );

}( this, document ));
