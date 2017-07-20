var key = "xzdc65mdu8asdl4fp2lra96uv3x623";


function getStreamers(stream) {
	var twitchUserStream = document.createElement("div");

	$.ajax({
		url: "https://wind-bow.gomix.me/twitch-api/streams/" + stream + "/",
		dataType: 'jsonp',
		success: function(twitchResponse) {
			console.log(twitchResponse);
		}
	});

	$.ajax({
		url: "https://wind-bow.gomix.me/twitch-api/channels/" + stream + "/",
		dataType: 'jsonp',
		success: function(twitchResponse) {
			console.log(twitchResponse);
		}
	});
 
}

var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

for (streamer in streamers) {
	getStreamers(streamers[streamer]);
}