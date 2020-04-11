/*
const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );

app.use( express.static( 'public' ) );
app.get( '/', function ( request, response ) {
  response.sendFile( __dirname + '/views/index.html' );
} );

app.ws( '/', function ( ws, request ) {
  ws.on( 'message', function( message ) {
    console.log( message );
  } );
  console.log( 'socket' );
} );

const listener = app.listen( process.env.PORT, function () {
  console.log( "Your app is listening on port " + listener.address().port );
} );
*/