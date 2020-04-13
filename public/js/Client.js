function Client() {

  var index = 0;
  var data = new Uint8Array( 30 * 2 );

  var cx = 0;
  var cy = 0;
  
  return {
    buffer: function () {
      return data.buffer;
    },
    moveTo: function ( x, y ) {
      data[ index ++ ] = x - cx;
      data[ index ++ ] = y - cy;
      cx = x;
      cy = y;
    },
    reset: function () {
      index = 0;
    }
  };
  
}

export { Client }