import './style.css';

import * as THREE from 'three';

import earthImg from './assets/jpeg/earth.jpg';
import earthNightImg from './assets/jpeg/earth-night.jpg';
import sunImg from './assets/jpeg/sun.jpg';

// loader

const loadingManager = new THREE.LoadingManager();

const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");

loadingManager.onProgress = (url, loaded, total) => {
	progressBar.value = (loaded / total) * 100;
}

loadingManager.onLoad = () => {
	console.log("loaded");

	progressBar.style.display = "none";
	progressLabel.style.display = "none";
	// progressBar.style.visibility = "hidden";
	// progressLabel.style.visibility = "hidden";
}

// scene and camera

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight + 20 );
camera.position.setZ(0);
camera.position.setY(-5);

renderer.render( scene, camera ); 

// lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

// const controls = new OrbitControls( camera, renderer.domElement );


function addStar() {
	const size = THREE.MathUtils.randFloat( 0, 0.5 );
	const geometry = new THREE.SphereGeometry(size, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh( geometry, material );

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);


// planets

const earthTexture = new THREE.TextureLoader(loadingManager).load(earthImg);

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(3, 128, 128),
	new THREE.MeshStandardMaterial( {
		map: earthTexture,
	} )
);

scene.add(earth);

earth.position.set(10, -5, -15);

// sun

const sunTexture = new THREE.TextureLoader(loadingManager).load(sunImg);

const sun = new THREE.Mesh(
	new THREE.SphereGeometry(50, 128, 128),
	new THREE.MeshStandardMaterial( {
		map: sunTexture,
	} )
);

scene.add(sun);

sun.position.set(130, -5, -15);

// moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');

// const moon = new THREE.Mesh(
// 	new THREE.SphereGeometry(1, 32, 32),
// 	new THREE.MeshStandardMaterial( {
// 		map: moonTexture,
// 	} )
// );

// scene.add(moon);

// moon.position.setX(5);
// moon.position.setY(-10);
// moon.position.setZ(-10);

// kanye

const quote = document.querySelector(".kanye");

fetch('https://api.kanye.rest/')
  .then((response) => response.json())
  .then((data) => {
	console.log(data.quote);
	quote.textContent = data.quote;
});



function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	earth.rotation.x += 0.05;
	earth.rotation.y += 0.075;
	earth.rotation.z += 0.05;
	
	camera.position.z += 0.1;
	camera.position.x += 0.2;
	camera.position.y += 0.05;
}

document.body.onscroll = moveCamera;


function animate() {
	requestAnimationFrame( animate );

	earth.rotation.z += 0.01;
	sun.rotation.z += 0.0005;

	renderer.render( scene, camera );
}

animate();