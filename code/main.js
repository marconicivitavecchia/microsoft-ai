'use strict';

const request = require('request');
const fs = require('fs');
const raspberryPiCamera = require('raspberry-pi-camera-native');

const subscriptionKey = '8b22cb7e2112497c93cd5fec0567f1fb';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect';

const imageUrl = './face.jpg';

// Request parameters.
const params = {
	'returnFaceId': 'true',
	'returnFaceLandmarks': 'false',
	'returnFaceAttributes': 'emotion'
};

const cameraOptions = {
	width: 3280,
	height: 2464,
	fps: 1,
	encoding: 'JPEG',
	quality: 100
}

raspberryPiCamera.on('frame', (frameData) => {
	// frameData is a Node.js Buffer
	console.log("frame!!");	
	const postOptions = {
		uri: uriBase,
		qs: params,
		body: frameData,//fs.readFileSync(imageUrl),
		headers: {
			'Content-Type': 'application/octet-stream',
			'Ocp-Apim-Subscription-Key': subscriptionKey
		}
	};

	request.post(postOptions, (error, response, body) => {
		if (error) {
			console.log('Error: ', error);
			return;
		}
		let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
		console.log('JSON Response\n');
		console.log(jsonResponse);
	});
});


raspberryPiCamera.start(cameraOptions);


