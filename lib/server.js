'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;

const PUBLIC_DIR = path.join(__dirname, './client/public/');

const server = http.createServer((req, res) => {
	console.log('Requested URL:', req.url);
	switch (req.url) {
		case '/':
			///////////////////////////////////////////////////
			/// Home route
			///////////////////////////////////////////////////
			sendFile(res, path.join(__dirname, './client/home.html'));
			break;
		default:
			const potentialFile = path.join(PUBLIC_DIR, req.url);
			fs.access(potentialFile, fs.constants.R_OK, error => {
				if (error) {
					///////////////////////////////////////////////////
					/// 404
					///////////////////////////////////////////////////
					res.statusCode = 404;
					res.end('404 Not found.');
				} else {
					///////////////////////////////////////////////////
					/// Public file
					///////////////////////////////////////////////////
					sendFile(res, potentialFile);
				}
			});
			break;
	}
});

function sendFile(response, absolutePath) {
	fs.readFile(absolutePath, (error, contents) => {
		if (error) {
			throw error;
		}
		response.statusCode = 200;
		response.end(contents);
	});
}

server.listen(port, error => {
	if (error) {
		return console.log('something bad happened', error)
	}

	console.log(`server is listening on ${port}`)
});