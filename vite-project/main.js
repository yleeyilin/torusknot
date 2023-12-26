import * as THREE from 'three';

// instantiate sphere and scene 
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(15, 45, 32, 0, 6.2831, 0, 3.1415);
const material = new THREE.MeshStandardMaterial({
  color : "009387",
  emissive : "4f00a5",
  roughness : 0, 
  metalness : 0.307
});
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);

// instantiate a camera 
const camera = new THREE.PerspectiveCamera(45, 800, 600);
camera.position.z = 20;
scene.add(camera)

// render scene
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(800, 600);
renderer.render(scene, camera);