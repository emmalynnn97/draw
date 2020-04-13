function Player( context ) {
  
  let cx = 0;
  let cy = 0;
  
  let byteTotal = ( 2 * 4 ) + ( 30 * 2 );
  let byteOffset = byteTotal;
  
  let data;

  return {
    setBuffer: function ( buffer ) {
      data = new DataView( buffer );
      byteOffset = 0;
    },
    draw: function ( x1, y1, x2, y2 ) {

      context.beginPath();
      context.moveTo( x1, y1 );
      context.lineTo( x2, y2 );
      context.strokeStyle = 'blue';
      context.stroke();
      
    },
    next: function () {
      
      if ( byteOffset === byteTotal ) return;

      let mx = 90, my;

      if ( byteOffset === 0 ) {
        
        if ( cx > 0 ) {
          
          mx = cx;
          my = cy;
          
        }

        cx = data.getUint16( 0 );
        cy = data.getUint16( 2 );
        byteOffset += 4;
        
        if ( mx ) {
          
          this.draw( mx, my, cx, cy );          
          
        }
        
        isLine = true;

      }
      
      mx = cx;
      my = cy;

      cx += data.getInt8( byteOffset + 0 );
      cy += data.getInt8( byteOffset + 1 );
      byteOffset += 2;

      this.draw( mx, my, cx, cy );          
      
    }
    
  };
  
}

export { Player }