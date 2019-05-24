// This example uses https://github.com/sandeepmistry/node-raspberry-pi-camera-native

console.log("This example uses raspberry-pi-camera-native and it is not supported anymore");
console.log("Please see main.js");
return;

const raspberryPiCamera = require('raspberry-pi-camera-native');

// add frame data event listener
raspberryPiCamera.on('frame', (frameData) => {
	// frameData is a Node.js Buffer
	console.log("frame!!");	
});

// start capture
const cameraOptions = {
	  width: 3280,
	  height: 2464,
	  fps: 1,
	  encoding: 'JPEG',
	  quality: 100
}
raspberryPiCamera.start(cameraOptions);
