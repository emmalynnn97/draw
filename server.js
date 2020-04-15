const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );

const room = new Array( 255 );

function findSpot( ws ) {

  for ( var i = 0; i < 255; i ++ ) {
    
    if ( room[ i ] === undefined ) {
      
      room[ i ] = ws;
      return i;
      
    }
    
  }
  
}

function emptySpot( ws ) {
  
  var index = room.indexOf( ws );
  
  if ( index !== -1 ) {
    
    room.splice( index, 1 );
    
  }
  
}

app.ws( '/', function ( ws, request ) {
  
  ws._id = findSpot( ws );
  
  ws.on( 'close', function () {

    emptySpot( ws );
  
  } );
  
  ws.on( 'message', function ( data ) {
    
    console.log( data );
    
    let array = new ArrayBuffer( data );
    let view = new DataView( array );
    
    console.log( view );
    
    view.setUint8( 1, ws._id );
    
    aWss.clients.forEach( function ( client ) {
      
      if ( client !== ws ) {

        client.send( view.buffer );

      }

    } );

  } );

} );

const listener = app.listen( process.env.PORT, function () {

  console.log( "Listening on port " + listener.address().port );

} );