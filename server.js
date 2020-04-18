/**
 * @author mrdoob / http://mrdoob.com/
 */

const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );

//

var clients = [];
var room = new Array( 255 );

function add( ws ) {

  clients.push( ws );

  for ( var i = 0; i < room.length; i ++ ) {
    if ( room[ i ] === undefined ) {
      ws._id = i;
      room[ i ] = ws;
      return;
    }
  }

}

function remove( ws ) {

  var index = clients.indexOf( ws );
  if ( index !== - 1 ) clients.splice( index, 1 );

  var index = room.indexOf( ws );
  if ( index !== - 1 ) room[ index ] = undefined;

}

function broadcast( ws, data ) {

  for ( var i = 0; i < clients.length; i ++ ) {
    var client = clients[ i ];
    if ( client !== ws && client.readyState === client.OPEN ) client.send( data );
  }

}

app.ws( '/', function ( ws, request ) {

  add( ws );

  console.log( 'USERS:', clients.length );

  ws.on( 'close', function () {

    remove( ws );
    broadcast( ws, Buffer.from( [ ws._id , 8 ] ) );
  
  } );
  
  ws.on( 'message', function ( data ) {
    
    data.writeUInt8( ws._id , 0 );
    broadcast( ws, data );

  } );

} );

//

const listener = app.listen( process.env.PORT, function () {

  console.log( "Listening on port " + listener.address().port );

} );