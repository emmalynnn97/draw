function Recorder( context ) {

  let cx = 0;
  let cy = 0;

  let byteOffset = 0;
  let byteTotal = ( 2 * 4 ) + ( 30 * 2 );
  let buffer = new ArrayBuffer( byteTotal );
  
  let data = new DataView( buffer );

  return {
    getBuffer: function () {
      return buffer;
    },
    isFull: function () {
      return byteOffset === byteTotal;
    },
    moveTo: function ( x, y ) {        
      context.fillStyle = 'red';
      context.fillRect( x - 1, y - 1, 2, 2 );
      if ( byteOffset === 0 ) {
        data.setUint16( byteOffset + 0, x );
        data.setUint16( byteOffset + 2, y );
        byteOffset += 4;
      } else {
        data.setUint8( byteOffset + 0, x - cx );
        data.setUint8( byteOffset + 1, y - cy );
        byteOffset += 2;
      }
      cx = x;
      cy = y;
    },
    reset: function () {
      byteOffset = 0;
    }
  };
  
}

export { Recorder }