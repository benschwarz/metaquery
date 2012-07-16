(function ( window, document ) {
  window.metaQuery = {
    breakpoints: {},
    mediaqueries: []
  };

  var addEventListener = window.addEventListener,
      documentElement = document.documentElement,

  updateClasses = function ( mq ) {
    var name = window.metaQuery.breakpoints[mq.media],
        breakpoint = 'breakpoint-' + name;
    
    if(mq.matches) { 
      documentElement.classList.add( breakpoint );
    } else { 
      documentElement.classList.remove( breakpoint ); 
    }
  },
  
  updateImages = function ( mq ) {
    if( !mq.matches ) { return; }

    var name = window.metaQuery.breakpoints[mq.media], 
        images = document.getElementsByTagName( 'img' );
    
    for( var i = 0; i < images.length; i++ ) {
      var attribute = images[i].getAttribute( 'data-breakpoint-template' );
      if( attribute ) { images[i].src = attribute.replace( '{{breakpoint}}', name ); }
    }
  },
  
  // Called when a media query changes state
  mqChange = function ( mq ) {
    updateClasses( mq );
    updateImages( mq );
  },
  
  collectBreakPoints = function () {
    var meta = document.getElementsByTagName( 'meta' );
    
    // Add classes to the HTML node when a breakpoint matches
    for( var i = 0; i < meta.length; i++ ) {
      if( meta[i].name === 'breakpoint' ) {
        var name = meta[i].getAttribute( 'data' ),
            query = meta[i].getAttribute( 'media' ),
            mq = window.matchMedia( query );
        
        window.metaQuery.mediaqueries.push(mq);
        
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
  
  // Add events to run metaQuery
  addEventListener( 'DOMContentLoaded', function () {
    collectBreakPoints();
    window.removeEventListener( 'load', collectBreakPoints );
  });

  addEventListener( 'load', collectBreakPoints );
}( this, this.document ));