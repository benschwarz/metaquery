(function ( window, document ) {
  window.metaQuery = {
    breakpoints: {}
  };
  
  var readyState = function ( fn ) {
    if( /in/.test( document.readyState ) ) {
      window.setTimeout( function () {
       readyState( fn );
      }, 9 );
    } else {
      fn();
    }
  },
  
  addClass = function ( element, className ) {
    var classes = className.split(' ');
    for( var i = 0; i < classes.length; i++ ) {
      if( !hasClass( element, classes[i] ) ) {
        element.className = element.className !== '' ? ( element.className + ' ' + classes[i] ) : classes[i];
      }
    }
  },
  
  removeClass = function ( element, className ) {
    var classes = className.split(' ');
    for( var i = 0; i < classes.length; i++ ) {
      element.className = element.className.replace( new RegExp( '\\b' + classes[i] + '\\b( )?', 'g' ), '' );
    }
  },
  
  hasClass = function ( element, className ) {
    return new RegExp( '(^| )' + className + '( |$)', 'g' ).test( element.className );
  },
  
  updateClasses = function ( mq, name ) {
    var breakpoint = 'breakpoint-' + name,
        htmlNode = document.documentElement;
        
    if( mq.matches ) {
      addClass( htmlNode, breakpoint );
    } else {
      removeClass( htmlNode, breakpoint );
    }
  },
  
  updateElements = function ( mq, name ) {
    if( !mq.matches ) { return; }

    var elements = document.getElementsByTagName( 'img' );
    
    for( var i = 0; i < elements.length; i++ ) {
      var el = elements[i];
      
      for( var j = 0; j < el.attributes.length; j++ ) {
        var attribute = el.attributes[j],
            rattr = attribute.name.match( /^data\-mq\-(.*)/ );

        if( rattr ) { el.setAttribute( rattr[1], attribute.value.replace( '[breakpoint]', name ) ); }
      }
    }
  },
  
  // Called when a media query changes state
  mqChange = function ( mq ) {  
    var breakpoint;
    for( var b in window.metaQuery.breakpoints ) {
      if( window.metaQuery.breakpoints[b].query === mq.media ) { breakpoint = b; }
    }
    updateClasses( mq, breakpoint );
    updateElements( mq, breakpoint );
  },
  
  collectBreakPoints = function () {
    var meta = document.getElementsByTagName( 'meta' );
    
    // Add classes to the HTML node when a breakpoint matches
    for( var i = 0; i < meta.length; i++ ) {
      if( meta[i].name === 'breakpoint' ) {
        var name = meta[i].getAttribute( 'data' ),
            query = meta[i].getAttribute( 'media' ),
            mq = window.matchMedia( query );

        /* 
          Store mq.media too. 
          MediaQueryList can return the mediaquery in
          a different syntax to that it was created in.
        */
        window.metaQuery.breakpoints[name] = {
          query: mq.media,
          mq: mq
        };

        mq.addListener( mqChange );
        mqChange( mq );
      }
    }
  };
  
  window.metaQuery.init = collectBreakPoints;

  // DOM ready  
  readyState( collectBreakPoints );

}( this, this.document ));