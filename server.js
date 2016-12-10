var express = require( "express" );
var app     = express();

var path    = require( "path" );

var Gpio    = require( "onoff" ).Gpio; // https://www.npmjs.com/package/onoff
var gpioPin = new Gpio( 12, 'low');

var PORT    = 8080;   //  NOTE: sometimes using port 80 crashes the server.


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

// This is the server's API'
app.get( '/gpioPinValue',    gpioPinValue );
app.get( '/gpioPinToggle',   gpioPinToggle );
app.get( '/gpioPinOn',       gpioPinOn );
app.get( '/gpioPinOff',      gpioPinOff );


app.listen( PORT, console.log( `[ Express Server ] Listening on port ${PORT}` ));



// ===========================================================
function gpioPinValue( req, res ){

    console.log( "gpioPin() called");

    // this section breaks if you return a numeric value, e.g., 1 or 0 instead of "1" or "0"
    // this may have to do with the default header value for return type

    // this could be improved by returning JSON data instead.
    if ( gpioPin.readSync() === 1 ){
        res.send( "1" ); 
    } else {
        res.send( "0" );
    };

}; // end gpioPinValue()

// ===========================================================
function gpioPinToggle( req, res ){
    res.sendStatus(200);
    console.log( "gpioPinToggle() called" );
    if ( gpioPin.readSync() === 1 ){
     gpioPin.writeSync(0); 
    } else {
     gpioPin.writeSync(1);
    }
}; // end gpioPinToggle()

// ===========================================================
function gpioPinOn( req, res ){
    res.sendStatus(200);
    console.log( "gpioPinOn() called" );
    gpioPin.writeSync(1);
}; // end gpioPinOn()


// ===========================================================
function gpioPinOff( req, res ){
    res.sendStatus(200);
    console.log( "gpioPinOff() called" );
    gpioPin.writeSync(0);
}; // end gpioPinOff()