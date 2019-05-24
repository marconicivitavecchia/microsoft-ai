// This example uses https://www.npmjs.com/package/pi-camera

console.log("This example uses pi-camera and it is not supported anymore");
console.log("Please see main.js");
return;

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
	mode: 'photo',
	output: `${ __dirname }/test.jpg`,
	width: 1920,
	height: 1080,
	nopreview: true,
});

myCamera.snap()
	.then((result) => {
		// Your picture was captured
	})
	.catch((error) => {
		// Handle your error
	});
