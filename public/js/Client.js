function Client() {

  let cx = 0;
  let cy = 0;

  let byteOffset = 0;
  let byteTotal = ( 2 * 4 ) + ( 60 );
  let buffer = new ArrayBuffer( byteTotal );
  
  let data = new DataView( buffer );

  return {
    buffer: function () {
      return buffer;
    },
    isFull: function () {
      return byteOffset >= byteTotal;
    },
    moveTo: function ( x, y ) {
      if ( byteOffset === 0 ) {
        data.setUint16( byteOffset, x );
        data.setUint16( byteOffset + 2, y );
        byteOffset += 4;
      } else {
        data.setUint8( byteOffset, x - cx );
        data.setUint8( byteOffset + 1, y - cy );
        byteOffset += 2;
      }
      cx = x;
      cy = y;
    },
    reset: function () {
      byteOffset = 0;
      data.fill( 0 );
    }
  };
  
}

export { Client }