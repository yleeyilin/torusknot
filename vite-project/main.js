import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";

// scene 
const scene = new THREE.Scene();

// sphere
const geometry = new THREE.TorusKnotGeometry(3, 0.8, 10000);
const material = new THREE.MeshStandardMaterial({
  emissive: '#4f00a5',
  roughness: 0,
  metalness: 0.265
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Size of the viewport 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// light
const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// render scene
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false; 
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// handle changes 
window.addEventListener('resize', () => {
  // update view port metrics
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop()

// gsap
const tl = gsap.timeline({defaults : { duration : 1 }});
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo('nav', {y: "-100%"}, {y: "0%"});

// mouse animation 
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    let newColour = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.emissive, {
      r: newColour.r,
      g: newColour.g, 
      b: newColour.b,
    });
  }
})