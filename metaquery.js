(function ( window, document, undefined ) {
  window.metaQuery = {
    breakpoints: {}
  };

  var addEventListener = window.addEventListener,

  htmlClasses = function ( mq ) {
    var name = window.metaQuery.breakpoints[mq.media],
        htmlclasses = document.getElementsByTagName( 'html' )[0].classList;
    
    if( mq.matches ) {
      htmlclasses.add( 'breakpoint-' + name  );
    } else {
      htmlclasses.remove( 'breakpoint-' + name  );
    }
  },
  
  images = function ( mq ) {
    if( !mq.matches ) { return; }

    var name = window.metaQuery.breakpoints[mq.media], 
        images = document.getElementsByTagName( 'img' );
    
    for( var i = 0; i < images.length; i++ ) {
      var attribute = images[i].getAttribute( 'data-breakpoint-template' );
      if( attribute ) { images[i].src = attribute.replace( /\{\{breakpoint\}\}/, name ); }
    }
  },
  
  // Called when a media query changes state
  mqChange = function ( mq ) {
    htmlClasses( mq );
    images( mq );
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
          Store using mq.media, rather than the media query set, 
          because MediaQueryList returns it in a different order
          then its entered in. 
        */
        window.metaQuery.breakpoints[mq.media] = name;
        mq.addListener( mqChange );
        mqChange( mq );
      }
    }
  };
  
  // Public methods
  window.metaQuery.init = collectBreakPoints;
  
  // Add events to re-run metaQuery
  addEventListener( 'DOMContentLoaded', function () {
    window.metaQuery.init();
    window.removeEventListener( 'load', window.metaQuery.init );
  });

  addEventListener( 'load', window.metaQuery.init );
  
  return window.metaQuery;
  
}( this, this.document ));