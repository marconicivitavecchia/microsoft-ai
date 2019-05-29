// based on https://github.com/servall/pi-camera-connect
//
const { StillCamera } = require("pi-camera-connect");
const fs = require('fs');

const cameraOptions = {
	//1920x1080
	width: 1920,
	height: 1080,
	rotation: Rotation.Rotate180
};
const stillCamera = new StillCamera(cameraOptions);


stillCamera.takeImage().then(image => {

	fs.writeFileSync("still-image.jpg", image);
})
	.catch(function (err) {
		console.log("An error occured with raspberry camera");
		let jsonData = { status: "error capturing image" };
		let jsonResponse = JSON.stringify(jsonData, null, '  ');
		console.log('JSON Response\n');
		console.log(jsonResponse);
		res.status(501).send(jsonResponse);
	});

;
