function Player( context ) {
  
  let cx = null;
  let cy = null;
  let isPointerDown = false;
  
  function draw( x1, y1, x2, y2 ) {
    
    if ( x1 === null ) return;

    context.beginPath();
    context.moveTo( x1, y1 );
    context.lineTo( x2, y2 );
    context.strokeStyle = 'blue';
    context.stroke();

  }

  return {
    execute: function ( data ) {
      
      let px = cx;
      let py = cy;
      
      switch ( data.getUint8( 1 ) ) {

        case 2:
          isPointerDown = true;
          cx = data.getUint16( 2 );
          cy = data.getUint16( 4 );
          break;
          
        case 3:
          isPointerDown = false;
          cx = null;
          cy = null;
          break;
          
        case 4:
          cx = data.getUint16( 2 );
          cy = data.getUint16( 4 );
          break;

        case 5:
          cx += data.getInt8( 2 );
          cy += data.getInt8( 3 );            
          break;          
      }
      
      if ( isPointerDown ) {
        
        draw( px, py, cx, cy );  
        
      }
    
    }
    
  };
  
}

export { Player }