import * as THREE from '/Users/youngbloodcyb/Projects/audio-visual/node_modules/three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);

camera.position.z = 100;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(64, 64, 64 , 64);
const planeMaterial = new THREE.MeshNormalMaterial({ 
    // color: 0x00ff00,
    wireframe: true 
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX = -Math.PI / 2 + Math.PI / 4;
planeMesh.scale.x = 2;
planeMesh.scale.y = 2;
planeMesh.scale.z = 2;
planeMesh.getWorldPosition.y = 8;
scene.add(planeMesh);

function animate() {
    requestAnimationFrame(animate);

    planeMesh.rotation.x += 0.001;
    planeMesh.rotation.y += 0.001;
    planeMesh.rotation.z += 0.001;
    
    renderer.render(scene, camera);
}

animate();

// audio 

// const setupAudioContext = () => {
//     source.connect(analyzer);
//     analyzer.connect(audioContext.destination);
//     analyzer.fftSize = 1024;
//     dataArray = new Uint8Array(analyzer.frequencyBinCount);
// }

// (function(){
//     var widgetIframe = document.getElementById('sc-widget'),
//         widget       = SC.Widget(widgetIframe);

//     widget.bind(SC.Widget.Events.READY, function() {
//       widget.bind(SC.Widget.Events.PLAY, function() {
//         // get information about currently playing sound
//         widget.getCurrentSound(function(currentSound) {
//             console.log('sound ' + JSON.stringify(currentSound) + 'began to play');
//             // create audio stream
//             // audioEl.setAttribute("src", currentSound.uri);


//         });
//       });
//       // get current level of volume
//       widget.getVolume(function(volume) {
//         console.log('current volume value is ' + volume);
//       });
      
//       // play music
//       widget.play();
//     });
//   }());

const audioContext = new window.AudioContext();
const audioElement = document.getElementById("audio");
const analyzer = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyzer);
analyzer.connect(audioContext.destination);
analyzer.fftSize = 1024;
const dataArray = new Uint8Array(analyzer.frequencyBinCount);

const render = () => {
    analyzer.getByteFrequencyData(dataArray);
    console.log(dataArray);
    requestAnimationFrame(render);
}

// setupAudioContext();
render();