'use strict';

const request = require('request');
const fs = require('fs');
const { StillCamera } = require("pi-camera-connect");

const express = require('express');
const app = express();




const stillCamera = new StillCamera();

const subscriptionKey = '8b22cb7e2112497c93cd5fec0567f1fb';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect';

const imageUrl = './face.jpg';

// Request parameters.
const faceRequestParams = {
	'returnFaceId': 'true',
	'returnFaceLandmarks': 'false',
	'returnFaceAttributes': 'emotion'
};


app.get('/camera', function(req, res) {
	stillCamera.takeImage().then(image => {
		console.log("image captured");	
		const postOptions = {
			uri: uriBase,
			qs: faceRequestParams,
			body: image,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			}
		};

		console.log("making a POST request to Azure Face API...");	
		request.post(postOptions, (error, response, body) => {
			if (error) {
				console.log('Error: ', error);
				return;
			}
			let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
			console.log('JSON Response\n');
			console.log(jsonResponse);
			res.status(200).send(jsonResponse);
		});
	});
});

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
	res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send('Oops, Something went wrong!');
	} else {
		next(err);
	}
});

app.listen(3000);
console.log('App Server running at port 3000');

