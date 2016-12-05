var express = require( "express" );
var app     = express();
var path    = require( "path" );

var Gpio = require( "onoff" ).Gpio; // https://www.npmjs.com/package/onoff
var led = new Gpio( 12,'low');


// This is only serving static pages
// This is the worlds most simplistic security protocol
//      if the requestor does not know to supply the "abc" "token" then they will not get access to the page.

// No routing per se, this is using a virtual path for security

// @todo: make sure that the server does not respond to bad requests so that it fails silently to robohackers
// @todo: add a time in if there is a bad request so that the server cannot be made to respond quickly to a brute force attack


// allow CORS so a local browser working from "localhost" can make calls to the server's ip address
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// use "/abc/<filename>" as a virtual path to "/<filename>"
//app.use( "/abc", express.static("./"));

app.get( "/", function(req,res){ res.sendFile( path.join( __dirname, "index.html" ) ) })
app.get( "/style.css", function(req,res){ res.sendFile( path.join( __dirname, "style.css" ) ) })
app.get( "/script.js", function(req,res){ res.sendFile( path.join( __dirname, "script.js" ) ) })

app.get('/ledToggle', ledToggle );
app.get('/ledOn', ledOn );
app.get('/ledOff', ledOff );

app.listen( 80, console.log( "[ Express Server ] Listening on port 80" ));



// ===========================================================
function ledToggle( req, res ){
    res.sendStatus(200);
    console.log( "toggleLed() called");
    if ( led.readSync() === 1 ){
        led.writeSync(0); 
    } else {
        led.writeSync(1);
    }
}; // end toggleLed()

// ===========================================================
function ledOn( req, res ){
    res.sendStatus(200);
    console.log( "ledOn() called");
    led.writeSync(1);
}; // end toggleLed()

// ===========================================================
function ledOff( req, res ){
    res.sendStatus(200);
    console.log( "ledOff() called");
    led.writeSync(0);
}; // end toggleLed()