// Discover if the streamer is streaming
function isStreaming(stream) {
	// Get the streamer
	return $.ajax({
		url: "https://wind-bow.gomix.me/twitch-api/streams/" + stream + "/",
		dataType: 'jsonp'
	});
}

// Fill a div with the streamer's channel data
function getStreamers(stream) {
	var twitchUserStream = document.createElement("div");
	var header = document.createElement("h1");
	var headerLink = document.createElement("a");
	var userImg = document.createElement("img");
	var details = document.createElement("p");
	var streaming = false;
	var streamingDetails = "";

	$.when(isStreaming(stream)).then(function(aj) {
		// Indicate if the streamer is streaming or not
		if (aj.stream !== null) streaming = true;

		// Get the channel
		$.ajax({
			url: "https://wind-bow.gomix.me/twitch-api/channels/" + stream + "/",
			dataType: 'jsonp',
			success: function(twitchResponse) {
				// Display the name with a link to the user's profile
				header.innerHTML = twitchResponse.display_name;
				headerLink.href = twitchResponse.url;
				// Display a logo
				if (twitchResponse.video_banner === null) userImg.src = twitchResponse.logo;
				else userImg.src = twitchResponse.video_banner;

				// Display details about what they are streaming
				streamingDetails = twitchResponse.game + ": " + twitchResponse.status;					

				if (streaming === false) {
					details.innerHTML = "Offline";
				} else {
					details.innerHTML = streamingDetails;
				}

				// Fill the div with the content
				twitchUserStream.appendChild(headerLink);
				headerLink.appendChild(header);
				twitchUserStream.appendChild(userImg);
				twitchUserStream.appendChild(details);	
				document.getElementById("streamers").appendChild(twitchUserStream);
			}
		});
	});
}

var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

for (streamer in streamers) {
	getStreamers(streamers[streamer]);
}