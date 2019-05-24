// based on https://github.com/servall/pi-camera-connect
//
const { StillCamera } = require("pi-camera-connect");
const fs = require('fs');

const stillCamera = new StillCamera();

stillCamera.takeImage().then(image => {

	    fs.writeFileSync("still-image.jpg", image);
});
