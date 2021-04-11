const socket = io();

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;




navigator.getUserMedia_ = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

const modelParams = {
    flipHorizontal: false, // flip e.g for video 
    //imageScaleFactor: 0.7, // reduce input image size for (maybe) gains in speed.
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.8, // confidence threshold for predictions.
}

handTrack.startVideo(video).then((status) => {
    if (status) {
        videoOn = true;
        setInterval(() => {
            runDetection()
        }, 1000 / 60);
        console.log("Running");
    } else {
        console.log("Please enable video")
    }
});

const knife = {}

const runDetection = () => {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video);
        //console.log(predictions);
        //requestAnimationFrame(runDetection);
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            //console.log(`x: ${x} \n y: ${y}`);
            socket.emit('hand-motion', {
                id: socket.id,
                x: x,
                y: y
            })
        }
    });
}


handTrack.load(modelParams).then(newModel => {
    model = newModel
});

socket.on('hand-motion', data => {
    console.log(data.id, '\n', data.x, data.y);
    let knife_ = knife[data.id]
    if(!knife_){
        const span = document.createElement('span')
        span.style.position= 'relative'
        span.textContent = '🔪'
        knife[data.id] = span
        knife_ = span
        document.body.appendChild(span)
    }
    knife_.style.top = data.y/video.offsetHeight * window.innerHeight + 'px'
    knife_.style.left = data.x/video.offsetWidth * window.innerWidth + 'px'
})











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