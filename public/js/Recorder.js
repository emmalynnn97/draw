function Recorder( context ) {

  const commands = [
    new Uint8Array( [ 0, 0 ] ),
    new Uint8Array( [ 0, 1 ] ),
    new Uint8Array( [ 0, 2 ] ),
    new Uint8Array( [ 0, 3 ] ),
    new DataView( new ArrayBuffer( 1 + 1 + 2 + 2 ) ),
    new DataView( new ArrayBuffer( 1 + 1 + 1 + 1 ) )
  ];

  let cx = 0;
  let cy = 0;
  
  function isInt8( value ) {
    
    return value <= 127 && value >= - 128;
    
  }

  return {
    moveTo: function ( x, y ) {
      let command;
      let dx = x - cx;
      let dy = y - cy;
      if ( isInt8( dx ) && isInt8( dy ) ) {
        command = commands[ 5 ];
        command.setUint8( 1, 5 );
        command.setInt8( 2, dx );
        command.setInt8( 3, dy );
        // debug
        context.fillStyle = 'red';
        context.fillRect( x - 2, y - 2, 4, 4 );
      } else {
        command = commands[ 4 ];
        command.setUint8( 1, 4 );
        command.setUint16( 2, dx );
        command.setUint16( 4, dy );        
        // debug
        context.fillStyle = 'blue';
        context.fillRect( x - 2, y - 2, 4, 4 );
      }
      cx = x;
      cy = y;
      return command.buffer;
    }
  };
  
}

export { Recorder }