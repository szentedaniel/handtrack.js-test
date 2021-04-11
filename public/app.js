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
    flipHorizontal: true, // flip e.g for video 

    //imageScaleFactor: 0.7, // reduce input image size for (maybe) gains in speed.
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.8, // confidence threshold for predictions.
}

handTrack.load(modelParams).then(newModel => {
    model = newModel
});

handTrack.startVideo(video).then((status) => {
    if (status) {
        videoOn = false;
        setInterval(() => {
            runDetection()
        }, 1000 / 30);
        //console.log(status);
    } else {
        console.log("Please enable video")
    }
});

const knife = {}

let handX = 0;
let handY = 0;
const kes = document.createElement('div')
kes.style.position = 'relative'
kes.textContent = '🔪'
kes.style.fontSize = '5em'
document.body.appendChild(kes)

const runDetection = () => {
    model.detect(video).then(predictions => {
        //model.renderPredictions(predictions, canvas, context, video);
        //console.log(predictions);
        //requestAnimationFrame(runDetection);
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox;
            handX = hand1[0];
            handY = hand1[1];
            //console.log(handX, handY);
            moveMouse(handX, handY)

            // socket.emit('hand-motion', {
            //     id: socket.id,
            //     x: x,
            //     y: y
            // })
        }
    });
}
let coords = [{}]

document.addEventListener("handevent", (e) => {
    const x = e.detail.clientY / video.height * window.innerHeight
    const y = e.detail.clientX / video.width * window.innerWidth
    if (coords.length <=5) {
        coords.push({x: x, y: y})
    }else {
        coords.shift()
        coords.push({x: x, y: y})
    }
    let sumX = 0
    let sumY = 0
    coords.forEach(cord => {
        sumX += cord.x
        sumY += cord.y
    });
    
    kes.style.top = sumX/5 + 'px'
    kes.style.left = sumY/5 + 'px'
    //console.log(e.detail.clientX, e.detail.clientY);
})


// socket.on('hand-motion', data => {
//     console.log(data.id, '\n', data.x, data.y);
//     let knife_ = knife[data.id]
//     if(!knife_){
//         const div = document.createElement('div')
//         div.style.position= 'relative'
//         div.textContent = '🔪'
//         div.style.fontSize = '5em'
//         knife[data.id] = div
//         knife_ = div
//         document.body.appendChild(div)
//     }
//     const x = data.y/video.height * window.innerHeight
//     const y = data.x/video.width * window.innerWidth


//     //knife_.style.top = x + 'px'
//     //knife_.style.left = y + 'px'

// })

const moveMouse = (x, y) => {
    const event = new CustomEvent("handevent", { //MouseEvent-mousemove
        bubbles: true,
        cancelable: true,
        detail: {
            clientX: x,
            clientY: y
        }
    });
    document.dispatchEvent(event)
}





// const noiseX = (noise.simplex2(0, a*0.0005) + 1) / 2;
//   // We get another noise value for the y axis but because we don't want the same value than x, we need to use another value for the first parameter
// const noiseY = (noise.simplex2(1, a*0.0005) + 1) / 2;