var express = require( "express" );
var app     = express();

// This is only serving static pages
// This is the worlds most simplistic security protocol
//      if the requestor does not know to supply the "abc" "token" then they will not get access to the page.

// No routing per se, this is using a virtual path for security

// @todo: make sure that the server does not respond to bad requests so that it fails silently to robohackers
// @todo: add a time in if there is a bad request so that the server cannot be made to respond quickly to a brute force attack


// use "/abc/<filename>" as a virtual path to "/<filename>"
app.use( "/abc", express.static("./"));

app.listen( 80, console.log( "[ Express Server ] Listening on port 80" ));


 