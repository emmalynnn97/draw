function Client() {

  let cx = 0;
  let cy = 0;

  let index = 0;
  let buffer = new ArrayBuffer( 30 * 2 );
  let data = new DataView( buffer );

  return {
    buffer: function () {
      return buffer;
    },
    isFull: function () {
      return index === 30 * 2;
    },
    moveTo: function ( x, y ) {
      if ( index === 0 ) {
        data.
      }
      data[ index + 0 ] = x - cx;
      data[ index + 1 ] = y - cy;
      cx = x;
      cy = y;
      index += 2;
    },
    reset: function () {
      index = 0;
      data.fill( 0 );
    }
  };
  
}

export { Client }