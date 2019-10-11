console.log("Hello World from your main file!");
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
var THREE = require("three");
// require("three/examples/js/loaders/GLTFLoader");
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
require("three/examples/js/loaders/OBJLoader");

const mixers = [];
const clock = new THREE.Clock();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, 100);
var renderer = new THREE.WebGLRenderer();
var textureLoader = new THREE.TextureLoader();
var map = textureLoader.load("models/low-poly-fox-by-pixelmannen-obj/texture.png");
var material = new THREE.MeshPhongMaterial({ map: map });
renderer.setClearColor(0xc5c5c3);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	"models/low-poly-fox-by-pixelmannen-obj/low-poly-fox-by-pixelmannen.obj",
	// called when resource is loaded

	function(object) {
		object.traverse(function(node) {
			if (node.isMesh) node.material = material;
		});
		scene.add(object);
	},
	// called when loading is in progresses
	function(xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	// called when loading has errors
	function(error) {
		console.log("An error happened");
	}
);

// var loader = new THREE.GLTFLoader();
// loader.load("./models/walkingCrab/WalkingCrab.obj", function(gltf) {
// 	// var mixer = new THREE.AnimationMixer(gltf);
// 	// var clips = gltf.animations;

// 	// function update() {
// 	// 	mixer.update(deltaSeconds);
// 	// }

// 	const animation = gltf.animations[0];

// 	const mixer = new THREE.AnimationMixer(gltf.scene);
// 	mixers.push(mixer);

// 	const action = mixer.clipAction(animation);
// 	action.play();

// 	console.log("gltf ===>", gltf);
// 	gltf.scene.scale.set(1, 1, 1);
// 	gltf.scene.position.x = 0; //Position (x = right+ left-)
// 	gltf.scene.position.y = 0; //Position (y = up+, down-)
// 	gltf.scene.position.z = 0;
// 	scene.add(gltf.scene);

// 	// var clip = THREE.AnimationClip.findByName(clips, "parrot_A_");
// 	// var action = mixer.clipAction(clip);
// 	// action.play();
// });

var ambientLight = new THREE.AmbientLight("whitesmoke");
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

console.log("loader", loader);

console.log("scene ==>", scene);
camera.position.z = 5;
camera.position.y = 25;

var animate = function() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	scene.children[2].position.x += 0.01;
	scene.children[2].rotation.y += 0.001;
	camera.position.z += 0.05;
	// console.log("loader ===>", loader);

	const delta = clock.getDelta();

	for (const mixer of mixers) {
		mixer.update(delta);
	}

	renderer.render(scene, camera);
};

animate();
