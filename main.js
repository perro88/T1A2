import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { ModuleNode } from 'vite';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
// const torus = new THREE.Mesh(geometry, material)
// scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
// Light Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("beach.jpg");
scene.background = spaceTexture;

// About PLANE
const aboutPlane = new THREE.TextureLoader().load("black.jpeg");
const about = new THREE.Mesh(
  new THREE.PlaneGeometry(700, 700, 1, 1),
  new THREE.MeshBasicMaterial({ map: aboutPlane })
);
scene.add(about);

// Avatar
const jimmyTexture = new THREE.TextureLoader().load("jamesportfolio2.png");
const jimmy = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: jimmyTexture })
);
scene.add(jimmy);

// Projects
const projectBlock = new THREE.TextureLoader().load("code.png");
const code = new THREE.Mesh(
  new THREE.BoxGeometry(8, 8, 8),
  new THREE.MeshBasicMaterial({ map: projectBlock })
);
scene.add(code);

// workHistory
const workBlock = new THREE.TextureLoader().load("drillrig.jpeg");
const work = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: workBlock })
);
scene.add(work);

// Harley
const harleyBlock = new THREE.TextureLoader().load("harley.jpg");
const harley = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: harleyBlock })
);
scene.add(harley);

// Boart
const boartBlock = new THREE.TextureLoader().load("boart.jpeg");
const boart = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: boartBlock })
);
scene.add(boart);

// Hat
const hatBlock = new THREE.TextureLoader().load("hatme.jpg");
const hat = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: hatBlock })
);
scene.add(hat);

// Mars
const marsTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);
scene.add(mars);

mars.position.z = -15;
mars.position.y = 5;
mars.position.x = 10;
jimmy.position.z = 210;
jimmy.position.y = 2;
jimmy.position.x = 4;
code.position.x = 8;
code.position.y = 0;
code.position.z = 70;
work.position.z = 120;
work.position.y = 0;
work.position.x = -5;
harley.position.z = 30;
harley.position.y = 0;
harley.position.x = -10;
boart.position.z = 148;
boart.position.y = 0;
boart.position.x = 5;
hat.position.z = 175;
hat.position.y = 0;
hat.position.x = -5;
about.position.z = 27;
about.position.y = 0;
about.position.x = 0;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  const body = document.body;
  const html = document.documentElement;
  const bodyHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  console.log(bodyHeight);

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  // mars.rotation.z += 0.05

  jimmy.rotation.y += 0.01;
  jimmy.rotation.z += 0.01;

  code.rotation.x += 0.05;
  code.rotation.y += 0.075;
  // code.rotation.z += 0.05

  work.rotation.y += 0.05;
  boart.rotation.x += 0.05;
  hat.rotation.y += 0.05;

  harley.rotation.x += 0.01;

  camera.position.z = t * (-240 / bodyHeight);
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  mars.rotation.x += 0.001;
  mars.rotation.y += 0.001;
  mars.rotation.z += 0.001;
  jimmy.rotation.x += 0.02;
  jimmy.rotation.y += 0.01;
  jimmy.rotation.z += 0.02;
  code.rotation.x += 0.01;
  code.rotation.y += 0.005;
  code.rotation.z += 0.01;
  work.rotation.y += 0.01;
  boart.rotation.x += 0.01;
  hat.rotation.y += 0.01;
  harley.rotation.x += 0.01;
  controls.update;
  renderer.render(scene, camera);
}
// function animate ()
// {
//   requestAnimationFrame(animate)
//   torus.rotation.x += 0.01
//   torus.rotation.y += 0.005
//   torus.rotation.z += 0.01
//   controls.update
//   renderer.render(scene, camera)

// }

async function asyncGetJoke() {
  let result = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  let data = await result.json();
  if (data.joke) {
    document.getElementById("dadJoke").innerHTML = data.joke;
  }
  // throw new Error("Could not retrieve joke!")
}
asyncGetJoke();

fetch("https://official-joke-api.appspot.com/jokes/programming/random", {
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    document.querySelector("#setUp").innerHTML = data[0].setup;
    document.querySelector("#punchline").innerHTML = data[0].punchline;
  })
  .catch((err) => err);

fetch("http://quotes.stormconsultancy.co.uk/random.json", {
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector("#quote").innerHTML = data.quote;
    document.querySelector("#author").append(data.author);
  })
  .catch((err) => err);

animate();
