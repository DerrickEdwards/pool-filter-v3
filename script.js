function helloMessage(){

   document.getElementById( "messageDisplay" ).innerHTML = "Hello From JavaScript"

}; // end hello()


// =============================================================================

// wunderground api key 94d35539887201df

function getCurrentWeather(){ 
	$.ajax({
		url : "http://api.wunderground.com/api/94d35539887201df/geolookup/conditions/q/WI/River_Falls.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location 	= parsed_json['location']['city'];
			var temp_f 		= parsed_json['current_observation']['temp_f'];
			var icon_url 	= parsed_json['current_observation']['icon_url'];
			$( "#weatherIcon" ).css( "background-image", "url(" + icon_url + ")" );			
			$( "#messageDisplay" ).text( temp_f );
		}
	});		
} // end getCurrentWeather()