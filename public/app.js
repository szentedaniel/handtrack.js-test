const socket = io();

//import * as handTrack from 'handtrackjs';

navigator.getUserMedia_ = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for (maybe) gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.load().then(newModel => {  
    model = newModel
    //trackButton.disabled = false
});

  
//model.setModelParameters(modelParams)


handTrack.startVideo(video).then(function (status) {
    if (status) {
        videoOn = true;
        runDetection()
        console.log("run");
    } else {
        console.log("Please enable video")
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        model.rederPredictions(predictions, canvas, context, video);
        requestAnimationFrame(runDetection);
    });
}












// const modelParams = {
//     flipHorizontal: true, // flip e.g for video 
//     imageScaleFactor: 0.7, // reduce input image size for gains in speed.
//     maxNumBoxes: 20, // maximum number of boxes to detect
//     iouThreshold: 0.5, // ioU threshold for non-max suppression
//     scoreThreshold: 0.79, // confidence threshold for predictions.
// }

// navigator.getUserMedia_ = (navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia);

// const video = document.querySelector('#video');
// const canvas = document.querySelector('#canvas');
// const context = canvas.getContext('2d');
// let model;


// handTrack.startVideo().then(status => {
//     if (status) {
//         navigator.getUserMedia({
//                 video: {}
//             }, stream => { //width: { min: 1024, ideal: 1280, max: 1920}, height: { min: 776, ideal: 720, max: 1080}
//                 video.srcObject = stream;
//                 //Run decetion
//                 setInterval(() => {
//                     runDetection()
//                 }, 1000 / 60);
//             },
//             err => console.log(err)
//         );
//     }
// })

// function runDetection() {
//     model.detect(video).then(predictions => {
//         console.log(predictions);
//     })
//     requestAnimationFrame(runDetection)
// }

// handTrack.load(modelParams).then(lmodel => {
//     model = lmodel;
// })
