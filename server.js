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
      console.log( i );
      ws._id = i; // Uhmm
      console.log( ws._id );
      return;
      
    }
    
  }
  
}

function emptySpot( ws ) {
  
  var index = room.indefOf( ws );
  
  if ( index !== -1 ) {
    
    room.splice( index, 1 );
    
  }
  
}

app.ws( '/', function ( ws, request ) {
  
  //console.log( 'request', ws );
  
  ws.on( 'connection', function () {

    console.log( 'connection', ws );
    findSpot( ws );
  
  } );
  
  ws.onopen = function () {
    
    console.log( 'open' );
    
  };
  
  ws.on( 'open', function () {

    console.log( 'open', ws );
    findSpot( ws );
  
  } );
  
  ws.on( 'close', function () {

    emptySpot( 'close', ws );
  
  } );
  
  ws.on( 'message', function ( data ) {
    
    aWss.clients.forEach( function ( client ) {
      
      console.log( ws._id );
      
      if ( client !== ws ) {

        client.send( data );

      }

    } );

  } );

} );

const listener = app.listen( process.env.PORT, function () {
  console.log( "Listening on port " + listener.address().port );
} );