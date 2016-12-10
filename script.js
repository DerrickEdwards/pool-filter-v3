// =============================================================================
// call the server to get the current power status and set the display
//      and the button label accordingly.

function filterPower(){

    console.log( "filterPower() called");
    $.get( "/gpioPinValue", function( data ){

        if ( data === "1" ){
            $( "#filterPowerStatusDisplay" ).html( "On" );
        } else {
            $( "#filterPowerStatusDisplay" ).html( "Off" );
        }
        console.log( data );
        return data;
    });

}; // end filterPowerStatus()


// =============================================================================
function filterPowerToggle(){
    // toggle the current power state
    console.log( "toggleFilterPower() called");
    $.get( "/gpioPinToggle", function( data ){
        console.log( data );
    });

    // reread and display the current power state
    filterPower();
    
}; // end filterPowerStatus()



// =============================================================================
function currentWeather(){ 

// wunderground api key 94d35539887201df
	$.ajax({
		url : "http://api.wunderground.com/api/94d35539887201df/geolookup/conditions/q/WI/River_Falls.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location 	= parsed_json['location']['city'];
			var temp_f 		= parsed_json['current_observation']['temp_f'];
			var icon_url 	= parsed_json['current_observation']['icon_url'];
			$( "#weatherIcon" ).css( "background-image", "url(" + icon_url + ")" );			
			$( "#temperature" ).text( temp_f );
		}
	});		
} // end currentWeather()