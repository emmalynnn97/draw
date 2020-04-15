/**
 * @author mrdoob / http://mrdoob.com/
 */

const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );

// TODO: Limit users somehow?

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
    
    room[ index ] = undefined;
    
  }
  
}

//

app.ws( '/', function ( ws, request ) {
  
  ws._id = findSpot( ws );
  
  ws.on( 'close', function () {
    
    var data = Buffer.from( [  ws._id , 6 ] );

    aWss.clients.forEach( function ( client ) {

      if ( client !== ws && client.readyState === client.OPEN ) {

        client.send( data );

      }

    } );

    emptySpot( ws );
  
  } );
  
  ws.on( 'message', function ( data ) {
    
    data.writeUInt8( ws._id , 0 );
    
    aWss.clients.forEach( function ( client ) {
      
      if ( client !== ws && client.readyState === client.OPEN ) {

        client.send( data );

      }

    } );

  } );

} );

//

const listener = app.listen( process.env.PORT, function () {

  console.log( "Listening on port " + listener.address().port );

} );