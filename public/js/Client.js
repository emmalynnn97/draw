function Client() {

  var index = 0;
  var data = new Uint8Array( 60 * 2 );
  
  return {
    buffer: function () {
      return data.buffer;
    },
    moveTo: function ( x, y ) {
      data[ index ++ ] = x;
      data[ index ++ ] = y;
    },
    reset: function () {
      index = 0;
    }
    
  }
  
}

export { Client }