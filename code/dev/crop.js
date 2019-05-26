'use strict';

const fs = require('fs');
const sharp = require('sharp');

// original image
let originalImage = 'test.jpg';

// file name for cropped image
let outputImage = 'croppedTest.jpg';
let faceDataFile = fs.readFileSync('test.json');  
let faceDataRect = JSON.parse(faceDataFile)[0].faceRectangle;  
console.log(faceDataRect);

sharp(originalImage).extract({ width: faceDataRect.width, height: faceDataRect.height, left: faceDataRect.left, top: faceDataRect.top }).toBuffer()
    .then(function(image) {
        fs.writeFileSync(outputImage, image);
        console.log("Image cropped and saved");
    })
    .catch(function(err) {
        console.log("An error occured");
        console
    });