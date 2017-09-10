var http = require('http');
var url = require('url');

server = http.createServer(function(req, res) {
	var headerParsed = {
		ipaddress: req.headers.host,
		language: req.headers.acceptLanguage,
		software: req.headers.userAgent
	};

	console.log(headerParsed);
	res.end(JSON.stringify(headerParsed));
});

server.listen(3000);
