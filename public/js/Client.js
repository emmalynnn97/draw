function Client( context, dom ) {
  
  let dpr = window.devicePixelRatio;
  
  let c = document.createElement( 'canvas' );
  c.width = 16 * dpr;
  c.height = 16 * dpr;
  c.style.position = 'absolute';
  c.style.top = 0;
  c.style.left = 0;
  c.style.width = '16px';
  c.style.height = '16px';

  let ctx = c.getContext("2d");
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc( 8 * dpr, 8 * dpr, 7, 0, Math.PI * 2 );
  ctx.stroke();

  if ( dom ) dom.appendChild( c );
  
  let cx = null;
  let cy = null;
  let isPointerDown = false;
  let isNewLine = false;
  
  function draw( x1, y1, x2, y2 ) {
    
    if ( isNewLine === true ) {
      isNewLine = false;
      return;
    }
    
    let dx = x2 - x1;
		let dy = y2 - y1;
		let d = Math.sqrt( dx * dx + dy * dy ) * 0.02;

    context.beginPath();
    context.moveTo( x1, y1 );
    context.lineTo( x2, y2 );
    context.strokeStyle = 'rgba(0, 0, 0, ' + ( 1 - d )  + ')';
    context.stroke();

  }

  return {
    execute: function ( data ) {
      
      switch ( data.getUint8( 1 ) ) {

        case 2:
          this.down(
            data.getUint16( 2 ),
            data.getUint16( 4 )
          );
          break;
          
        case 3:
          this.up();
          break;
          
        case 4:
          this.move(
            data.getUint16( 2 ),
            data.getUint16( 4 )
          );
          break;

        case 5:
          this.move(
            cx + data.getInt8( 2 ),
            cy + data.getInt8( 3 )
          );
          break;  
        
        case 6:
          this.disconnect();
          break;
      }

    },
    move: function ( x, y ) {

      if ( isPointerDown ) {

        draw( cx, cy, x, y );

      }

      cx = x;
      cy = y;

      //
      
      c.style.left = ( ( x / dpr ) - 8 ) + 'px';
      c.style.top = ( ( y / dpr ) - 8 ) + 'px';
      c.style.display = '';

    },
    down: function ( x, y ) {

      isPointerDown = true;
      cx = x;
      cy = y;

    },
    up: function () {

      isPointerDown = false;
      isNewLine = true;

    },
    disconnect: function () {
      
      c.style.display = 'none';
      
    }
    
  };
  
}

export { Client }