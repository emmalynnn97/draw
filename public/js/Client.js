function Client( context, color ) {
  
  let cx = null;
  let cy = null;
  let isPointerDown = false;
  
  function draw( x1, y1, x2, y2 ) {
    
    if ( x1 === null ) return;
    
    let dx = x2 - x1;
		let dy = y2 - y1;
		let d = Math.sqrt( dx * dx + dy * dy ) * 0.02;

    context.beginPath();
    context.moveTo( x1, y1 );
    context.lineTo( x2, y2 );
    // context.strokeStyle = color;
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
      }

    },
    move: function ( x, y ) {

      if ( isPointerDown ) {        
        draw( cx, cy, x, y );
      }

      cx = x;
      cy = y;

    },
    down: function ( x, y ) {

      isPointerDown = true;
      cx = x;
      cy = y;

    },
    up: function () {

      isPointerDown = false;
      cx = null;
      cy = null;

    }
    
  };
  
}

export { Client }