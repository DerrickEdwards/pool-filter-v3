// =============================================================================
function filterPower(){


} // end filterPowerStatus()


// =============================================================================
function toggleFilterPower(){


} // end filterPowerStatus()



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