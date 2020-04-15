function Player( context ) {
  
  let cx = null;
  let cy = null;
  let isPointerDown = false;
  let hasAbsolutePosition = false;
  
  function draw( x1, y1, x2, y2 ) {

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
          break;
          
        case 3:
          isPointerDown = false;
          break;
          
        case 4:
          hasAbsolutePosition = true;
          cx = data.getUint16( 2 );
          cy = data.getUint16( 4 );
          break;

        case 5:
          if ( hasAbsolutePosition === true ) {
            cx += data.getInt8( 2 );
            cy += data.getInt8( 3 );            
          }
          break;          
      }
      
      if ( isPointerDown && hasAbsolutePosition ) {
        
        draw( px, py, cx, cy );  
        
      }
    
    }
    
  };
  
}

export { Player }