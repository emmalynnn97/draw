function Player( context ) {
  
  let cx = 0;
  let cy = 0;
  
  let byteOffset = 0;
  let data;

  return {
    setBuffer: function ( buffer ) {
      data = new DataView( buffer );

      context.beginPath();

      let cx = data.getUint16( 0 );
      let cy = data.getUint16( 2 );

      context.moveTo( cx, cy );

      for ( var i = 0; i <= 60; i += 2 ) {
        context.lineTo( cx, cy );

      }

      context.strokeStyle = 'blue';
      context.stroke();
      
    },
    next: function () {
      
      if ( byteOffset === 0 ) {
        cx = data.getUint16( 0 );
        cy = data.getUint16( 2 );
        byteOffset += 4;
      } else {
        cx += data.getInt8( 4 + i + 0 );
        cy += data.getInt8( 4 + i + 1 );        
      }
      
    }
    
  };
  
}

export { Player }