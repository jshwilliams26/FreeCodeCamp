// Retrieve the latitude and longitude of the current location
function latlongRequest() {
	var req = new XMLHttpRequest();

	req.open("GET", "https://freegeoip.net/json/", true);
	req.send(null);
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.response);
			weatherRequest(response.latitude, response.longitude, response.region_code, response.city);
		} else {
    		console.log("Could not retrieve location");
		}
	});
}

// Get the weather
function weatherRequest(latitude, longitude, region, city) {
	// My dark sky API key
	var apiKey = 'e9fa700a10c6beaac412f53eb4e51989';
	
	var weatherUrl = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude;
	
	// AJAX request for the current weather at the given latitude and longitude
	$.ajax({
		url: weatherUrl,
		dataType: 'jsonp',
		success: function(wResponse) {
			// Display the location
			document.getElementById("loc").innerHTML = "<span style='color: #888888;'>Location:</span> " + city + ", " + region;

			// Get the temperatures	
			var tempF = wResponse.currently.temperature.toFixed(2);
			var tempC = ((wResponse.currently.temperature - 32) * 5/9).toFixed(2);
			document.getElementById("tc").innerHTML = "<span style='color: #888888;'>Temperature:</span> " + tempC + " &deg<span style='color: #FF6666;'>C</span>";
			document.getElementById("tf").innerHTML = "<span style='color: #888888;'>Temperature:</span> " + tempF + " &deg<span style='color: #5555FF;'>F</span>";
			
			// Pick a background image for the current conditions
			switch (wResponse.currently.icon) {
				case "clear-day":
					document.body.className = "clear-day";			
					break;
				case "clear-night":
					document.body.className = "clear-night";			
					break;
				case "rain":
					document.body.className = "rain";			
					break;
				case "snow":
					document.body.className = "snow";			
					break;
				case "sleet":
					document.body.className = "sleet";			
					break;
				case "wind":
					document.body.className = "wind";			
					break;
				case "fog":
					document.body.className = "fog";			
					break;
				case "cloudy":
					document.body.className = "cloudy";			
					break;
				case "partly-cloudy-day":
					document.body.className = "partly-cloudy-day";			
					break;
				case "partly-cloudy-night":
					document.body.className = "partly-cloudy-night";			
					break;
				default:
					document.body.className = "partly-cloudy-day";			
			}
			
			// Make sure the default background color is black
			document.body.style.backgroundColor = "#000000";
			
			// Set the weather status
			document.getElementById("stat").innerHTML = "<span style='color: #888888;'>Status:</span> " + wResponse.currently.summary;
		}
	});
}

latlongRequest();

// Begin by showing the temperature in Celsius
$("#tc").hide();

// By clicking on the temperature, the temperature switches between Fahrenheit and Celsius
$("#tc, #tf").on(
	'click', function() {
	$('#tc, #tf').toggle();
});