(function ( window, document ) {
  var metaQuery = {
    breakpoints: {},
    _events: {},
    _eventMatchCache: {},
    bind: function ( name, fn ) {
      ( metaQuery._events[name] = [] ).push( fn );
      
      mqChange();
    }
  },
  
  // Pinched domready
  // http://www.dustindiaz.com/smallest-domready-ever/
  readyState = function ( fn ) {
    if( /in/.test( document.readyState ) ) {
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
  
  classRegex = {},
  getClassRegex = function(className) {
    if (!classRegex[className]) {
      classRegex[className] = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g');
    }
    classRegex[className].lastIndex = 0;
    return classRegex[className];
  },

  hasClass = function(element, className) {
    return getClassRegex(className).test(element.className);
  },

  removeClass = function(element, className) {
    element.className = (element.className || '').replace(getClassRegex(className), '');
  },

  addClass = function(element, className) {
    if (!hasClass(element, className)) {
      element.className = (element.className ? element.className + ' ' : '') + className;
    }
  },  
  
  updateClasses = function ( matches, name ) {
    var breakpoint = 'breakpoint-' + name,
        htmlNode = document.documentElement;
        
    if( matches ) {
      addClass( htmlNode, breakpoint );
    } else {
      removeClass( htmlNode, breakpoint );
    }
  },
  
  updateElements = function ( matches, name ) {
    if( !matches ) { return; }

    var elements = document.getElementsByTagName( 'img' );
    
    for( var i = 0; i < elements.length; i++ ) {
      var el = elements[i],
          attributes = el.attributes;
      
      for( var j = 0; j < attributes.length; j++ ) {
        var attribute = attributes[j],
            rattr = attribute.name.match( /^data\-mq\-(.*)/ );

        if( rattr ) { el.setAttribute( rattr[1], attribute.value.replace( '[breakpoint]', name ) ); }
      }
    }
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
      
      updateClasses( matches, name );
      updateElements( matches, name );
    }
  },
  
  collectMediaQueries = function () {
    var meta = document.getElementsByTagName( 'meta' );
    
    // Add classes to the HTML node when a breakpoint matches
    for( var i = 0; i < meta.length; i++ ) {
      if( meta[i].name === 'breakpoint' ) {
        var name = meta[i].getAttribute( 'data' ),
            query = meta[i].getAttribute( 'media' );

        metaQuery.breakpoints[name] = query;
      }
    }
  },
  
  init = function () {
    collectMediaQueries();
    
    addEvent( window, 'resize', debounce( function () {
      mqChange();
    }, 50 ));
    
    mqChange();
  };
  
  window.metaQuery = metaQuery;
  
  // DOM ready
  readyState( init );
}( this, this.document ));