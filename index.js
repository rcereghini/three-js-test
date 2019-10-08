console.log("Hello World from your main file!");
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
var THREE = require("three");
require("three/examples/js/loaders/GLTFLoader");

const mixers = [];
const clock = new THREE.Clock();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, 100);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xc5c5c3);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

var loader = new THREE.GLTFLoader();
loader.load("./models/Parrot.glb", function(gltf) {
	// var mixer = new THREE.AnimationMixer(gltf);
	// var clips = gltf.animations;

	// function update() {
	// 	mixer.update(deltaSeconds);
	// }

	const animation = gltf.animations[0];

	const mixer = new THREE.AnimationMixer(gltf.scene);
	mixers.push(mixer);

	const action = mixer.clipAction(animation);
	action.play();

	console.log("gltf ===>", gltf);
	gltf.scene.scale.set(1, 1, 1);
	gltf.scene.position.x = 0; //Position (x = right+ left-)
	gltf.scene.position.y = 0; //Position (y = up+, down-)
	gltf.scene.position.z = 0;
	scene.add(gltf.scene);

	// var clip = THREE.AnimationClip.findByName(clips, "parrot_A_");
	// var action = mixer.clipAction(clip);
	// action.play();
});

var ambientLight = new THREE.AmbientLight("blue");
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

console.log("loader", loader);

console.log("scene ==>", scene);
// camera.position.z = 5;

var animate = function() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// camera.position.z += 0.01;

	const delta = clock.getDelta();

	for (const mixer of mixers) {
		mixer.update(delta);
	}

	renderer.render(scene, camera);
};

animate();
