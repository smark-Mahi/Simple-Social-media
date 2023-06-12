import React from "react";
import * as THREE from "three";
///<refrence path="../node_modules/@types/three/index.d.ts"/>
import { OrbitControls } from "@three-ts/orbit-controls";

const Strtpage = () => {
  const scene = new THREE.Scene();

  //create our sphere

  const geometry = new THREE.SphereGeometry(3, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
  });
  //combination of geometry and mesh
  const mesh = new THREE.Mesh(geometry, material);
  //let scene it means show it to camera
  scene.add(mesh);
  //set our own sizes

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  //lets setup a lights
  const light = new THREE.PointLight(0xffffff, 1, 100);
  //x,y,z positions
  light.position.set(0, 10, 10);
  scene.add(light);
  //lets add camera
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1
  );
  camera.position.z = 20;
  //Add camera
  scene.add(camera);
  //now render scene on screen
  const canvas: HTMLElement | undefined = document.querySelector(".webgl");
  const renderer = new THREE.WebGL1Renderer({ canvas });
  //how much your scene should cover your screen
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  //now render
  renderer.render(scene, camera);
  //orbit
  const contols = new OrbitControls(camera, canvas);
  contols.enableDamping = true;
  contols.enablePan = false;
  contols.enableZoom = false;
  contols.autoRotate = true;
  contols.autoRotateSpeed = 2;
  const loop = () => {
    contols.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };
  loop();
  return <div></div>;
};

export default Strtpage;
