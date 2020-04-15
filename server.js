const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );

app.ws( '/', function ( ws, request ) {
  
  console.log( ws );
  
  ws.on( 'message', function ( data ) {
    
    aWss.clients.forEach( function ( client ) {
      
      client.send( data );

    } );

  } );

} );

const listener = app.listen( process.env.PORT, function () {
  console.log( "Listening on port " + listener.address().port );
} );