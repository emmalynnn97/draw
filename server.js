const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );
app.get( '/', function ( request, response ) {
  response.sendFile( __dirname + '/views/index.html' );
} );

app.ws( '/', function ( ws, request ) {
  ws.on( 'message', function( data ) {
    aWss.clients.forEach(function ( client ) {
      client.send( data );
    });
  } );
  console.log( 'socket' );
} );

const listener = app.listen( process.env.PORT, function () {
  console.log( "Your app is listening on port " + listener.address().port );
} );