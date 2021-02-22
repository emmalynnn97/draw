/**
 * @author mrdoob / http://mrdoob.com/
 */

const express = require( 'express' );
const app = express();

const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss('/');

app.use( express.static( 'public' ) );

//

const clients = [];
const room = new Array( 255 );

function add( ws ) {

  clients.push( ws );

  for ( let i = 0; i < room.length; i ++ ) {
    if ( room[ i ] === undefined ) {
      ws._id = i;
      ws._strokes = 0;
      ws._time = Date.now();
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

  for ( let i = 0; i < clients.length; i ++ ) {
    const client = clients[ i ];
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
    
    ws._strokes ++;
    ws._time = Date.now();
    
    data.writeUInt8( ws._id , 0 );
    broadcast( ws, data );

  } );

} );

setInterval( function () {
  
  const idleTime = Date.now() - 600000;

	for ( let i = 0; i < clients.length; i ++ ) {
		const client = clients[ i ];
		if ( client._strokes > 100 ) {
      client.close();
      console.log( 'ABUSE:', client._id );
    }
		if ( client._time < idleTime ) {
      client.close();
      console.log( 'IDLE:', client._id );
    }
    client._strokes = 0;
	}

}, 1000 );

//

const listener = app.listen( process.env.PORT, function () {

  console.log( "Listening on port " + listener.address().port );

} );