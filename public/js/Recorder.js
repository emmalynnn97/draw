/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Client } from './Client.js';

function Recorder( context ) {
  
  const client = new Client( context );
  
  const commands = [
    /* 0: POINTER_DOWN */ new DataView( new ArrayBuffer( 1 + 1 + 2 + 2 + 1 ) ),
    /* 1: POINTER_UP */ new DataView( new ArrayBuffer( 1 + 1 ) ),
    /* 2: POINTER_MOVE_ABS */ new DataView( new ArrayBuffer( 1 + 1 + 2 + 2 ) ),
    /* 3: POINTER_MOVE_REL */ new DataView( new ArrayBuffer( 1 + 1 + 1 + 1 ) )
  ];

  let cx = 0;
  let cy = 0;
  let ccolor = 0;
  
  function isNotInt8( value ) {
    
    return value > 127 || value < - 128;
    
  }

  return {

    move: function ( x, y ) {

      client.move( x, y );
      
      let command;
      let dx = x - cx;
      let dy = y - cy;

      if ( isNotInt8( dx ) || isNotInt8( dy ) ) {

        command = commands[ 2 ];
        command.setUint8( 1, 2 );
        command.setUint16( 2, x );
        command.setUint16( 4, y ); 
        // debug
        // context.fillStyle = 'blue';
        // context.fillRect( x - 2, y - 2, 4, 4 );

      } else {

        command = commands[ 3 ];
        command.setUint8( 1, 3 );
        command.setInt8( 2, dx );
        command.setInt8( 3, dy );
        // debug
        // context.fillStyle = 'red';
        // context.fillRect( x - 2, y - 2, 4, 4 );

      }

      cx = x;
      cy = y;
      
      return command.buffer;

    },
    color: function ( color ) {

      ccolor = color;

    },
    down: function ( x, y ) {

      client.down( x, y, ccolor );

      let command = commands[ 0 ];
      command.setUint8( 1, 0 );
      command.setUint16( 2, x );
      command.setUint16( 4, y );
      command.setUint8( 6, ccolor );
      return command.buffer;

    },
    up: function () {

      client.up();
      
      let command = commands[ 1 ];
      command.setUint8( 1, 1 );
      return command.buffer;

    }

  };
  
}

export { Recorder }