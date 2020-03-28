?
const WebSocket = require( 'ws' );
const wss = new WebSocket.Server( { port: 8080 } );

wss.on( 'connection', function ( ws ) {

  ws.on( 'message', function ( message ) {

    console.log('received: %s', message );

  } );
 
  ws.send( 'something' );

} );

//

const fs = require( 'fs' );
const http = require('http');

const server = http.createServer();
http.createServer( function ( request, response ) {

  response.write( 'Hello World!' ); 
  response.end();

} );
server.listen( 3000 );


/*
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
*/