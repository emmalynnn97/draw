function Player( context ) {
  
  let cx = null;
  let cy = null;
  
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
      
      // console.log( data.getUint8( 1 ) );

      switch ( data.getUint8( 1 ) ) {

        case 4:
          cx = data.getUint16( 2 );
          cy = data.getUint16( 3 );
          break;

        case 5:
          cx += data.getInt8( 2 );
          cy += data.getInt8( 3 );
          break;          
      }
      
      if ( px !== null && py !== null ) {
        
        draw( px, py, cx, cy );  
        
      }
    
    }
    
  };
  
}

export { Player }