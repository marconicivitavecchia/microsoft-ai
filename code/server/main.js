'use strict';

const request = require('request');
//const fs = require('fs');
const sharp = require('sharp');
const { StillCamera, Rotation } = require("pi-camera-connect");

// Web Server
const express = require('express');
const app = express();

// Environmental variables
const dotenv = require('dotenv');
dotenv.config();


const subscriptionKey = process.env.API_KEY;
console.log(`Your subscription key is: ${subscriptionKey}. If undefined, please create .env with the API_KEY set to a valid Azure key`);

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

// Note: remove width and height to full resolution
const cameraOptions = {
	//1920x1080
	width: 1920,
	height: 1080,
	rotation: Rotation.Rotate180
};

const stillCamera = new StillCamera(cameraOptions);

app.get('/camera', function (req, res) {
	// Take a still picture
	stillCamera.takeImage(cameraOptions).then(image => {
		console.log(`image captured, size ${image.length}`);
		// DEBUG: save image
		fs.writeFileSync("/home/pi/Desktop/out.jpg", image);
		// Create POST options
		const postOptions = {
			uri: uriBase,
			qs: faceRequestParams,
			body: image,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			}
		};
		// Making POST request
		console.log("making a POST request to Azure Face API...");
		request.post(postOptions, (error, response, body) => {
			if (error) {
				console.log('Error posting image: ', error);
				let jsonData = { status: "POST error" };
				let jsonResponse = JSON.stringify(jsonData, null, '  ');
				console.log('JSON Response\n');
				console.log(jsonResponse);
				res.status(501).send(jsonResponse);
				return;
			}

			let azureData = JSON.parse(body);
			console.log('AzureData\n');
			console.log(azureData);
			console.log(`Found ${azureData.length} faces`);
			if (azureData.length > 0) {
				// take only the first face
				let faceData = azureData[0];
				let faceDataRect = faceData.faceRectangle;
				console.log(faceDataRect);
				// Crop the image
				console.log("Cropping image...");
				sharp(image).extract({ width: faceDataRect.width, height: faceDataRect.height, left: faceDataRect.left, top: faceDataRect.top }).toBuffer()
					.then(function (croppedImage) {
						console.log(`Image cropped, size ${croppedImage.length}`);
						fs.writeFileSync(`${faceData.faceId}.jpg`, image);
						let jsonData = {};
						jsonData.faceImg = new Buffer(croppedImage).toString('base64');
						jsonData.emotion = faceData.faceAttributes.emotion;
						jsonData.status = "OK";
						let jsonResponse = JSON.stringify(jsonData, null, '  ');
						console.log('JSON Response\n');
						console.log(jsonResponse);
						res.status(200).send(jsonResponse);
					})
					.catch(function (err) {
						console.log("An error occured cropping the face");
					});
			} else {
				let jsonData = {
					img: "",
					emotion: null,
					status: "no face found"
				};
				let jsonResponse = JSON.stringify(jsonData, null, '  ');
				console.log('JSON Response\n');
				console.log(jsonResponse);
				res.status(200).send(jsonResponse);
			}
		});
	})
		.catch(function (err) {
			console.log("An error occured with raspberry camera");
			let jsonData = { status: "error capturing image" };
			let jsonResponse = JSON.stringify(jsonData, null, '  ');
			console.log('JSON Response\n');
			console.log(jsonResponse);
			res.status(501).send(jsonResponse);
		});;
});

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
	res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
	if (req.xhr) {
		res.status(500).send('Oops, Something went wrong!');
	} else {
		next(err);
	}
});

app.listen(3000);
console.log('App Server running at port 3000');

