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
    		console.log("Could not retrieve zip code");
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
			if (wResponse.currently.icon === "clear-day") {
				document.body.style.background = "url('http://wallpaperswide.com/download/blue_heaven-wallpaper-2048x1152.jpg') no-repeat center center fixed";			
			} else if (wResponse.currently.icon === "clear-night") {
				document.body.style.background = "url('http://wallpaperswide.com/download/milky_way_glitters_over_arches_national_park_utah-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "rain") {
				document.body.style.background = "url('http://wallpaperswide.com/download/rainy_weather-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "snow") {
				document.body.style.background = "url('http://wallpaperswide.com/download/snowy_mountains_3-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "sleet") {
				document.body.style.background = "url('http://mediad.publicbroadcasting.net/p/wunc/files/201602/Sleet_on_the_ground.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "wind") {
				document.body.style.background = "url('https://w-dog.net/wallpapers/9/2/432722453144335/windy-day-landscape-dramatic-sky-tree.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "fog") {
				document.body.style.background = "url('http://wallpaperswide.com/download/foggy_landscape_bulgaria-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "cloudy") {
				document.body.style.background = "url('http://wallpaperswide.com/download/cloudy_day_4-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "partly-cloudy-day") {
				document.body.style.background = "url('http://wallpaperswide.com/download/beautiful_blue_cloudy_sky-wallpaper-2048x1152.jpg') no-repeat center center fixed";
			} else if (wResponse.currently.icon === "partly-cloudy-night") {
				document.body.style.background = "url('http://wallpaperswide.com/download/full_moon_night_2-wallpaper-2048x1152.jpg') no-repeat center center fixed";
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