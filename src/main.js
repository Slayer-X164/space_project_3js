import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'dat.gui'
// import { planets } from './planetsData.js'



const scene = new THREE.Scene()
const gui = new GUI()
// Create the loading manager
const loadingManager = new THREE.LoadingManager();

// Get reference to the loader circle and percentage text
const loaderCircle = document.getElementById('loader');
const loaderContainer = document.querySelector('.loader-container')
// Track progress during loading
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progress = (itemsLoaded / itemsTotal) * 100;
  console.log(`Loading: ${url} - ${itemsLoaded}/${itemsTotal} - ${Math.round(progress)}%`);

  // Update the circular loader's stroke
  const dashOffset = 440 - (440 * progress) / 100;
  loaderCircle.style.strokeDashoffset = dashOffset;
};

loadingManager.onLoad = function () {
  console.log("loaded!!!!");
  setTimeout(()=>{
    gsap.to(loaderContainer,{
      opacity: 0,
      duration: 0.5,
      ease:'power1.out',
      display:'none'
    })
  },3000)
}


// Use the loading manager with the texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

//bacground
scene.background = new THREE.CubeTextureLoader()
	.setPath( '/textures/Standard-Cube-Map/' )
	.load( [
				'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
			] );


const sunTexture = textureLoader.load('textures/2k_sun.jpg')
const mercuryTexture = textureLoader.load('textures/2k_mercury.jpg')
const venusTexture = textureLoader.load('textures/2k_venus.jpg')
const earthTexture = textureLoader.load('textures/2k_earth.jpg')
const moonTexture = textureLoader.load('textures/2k_moon.jpg')
const marsTexture = textureLoader.load('textures/2k_mars.jpg')
const jupiterTexture = textureLoader.load('textures/2k_jupiter.jpg')
const saturnTexture = textureLoader.load('textures/2k_saturn.jpg')
const uranusTexture = textureLoader.load('textures/2k_uranus.jpg')
const neptuneTexture = textureLoader.load('textures/2k_neptune.jpg')

sunTexture.colorSpace = THREE.SRGBColorSpace
mercuryTexture.colorSpace = THREE.SRGBColorSpace
venusTexture.colorSpace = THREE.SRGBColorSpace
earthTexture.colorSpace = THREE.SRGBColorSpace
moonTexture.colorSpace = THREE.SRGBColorSpace
marsTexture.colorSpace = THREE.SRGBColorSpace
jupiterTexture.colorSpace = THREE.SRGBColorSpace
saturnTexture.colorSpace = THREE.SRGBColorSpace
uranusTexture.colorSpace = THREE.SRGBColorSpace
neptuneTexture.colorSpace = THREE.SRGBColorSpace

const geometry = new THREE.SphereGeometry(1,32,32)
//sun
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture })
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture })
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture })
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture })
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture })
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture })
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture })
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture })
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture })

const planets = [
  {
    name: 'mercury',
    radius: 0.4,
    distance: 7,
    speed: 0.02,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: 'venus',
    radius: 0.95,
    distance: 10,
    speed: 0.012,
    material: venusMaterial,
    moons: []
  },
  {
    name: 'earth',
    radius: 1,
    distance: 15,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 2,
        speed: 0.015
      }
    ]
  },
  {
    name: 'mars',
    radius: 0.7,
    distance: 20,
    speed: 0.004,
    material: marsMaterial,
    moons: [
      { name: 'Phobos', radius: 0.1, distance: 1.5, speed: 0.02 },
      { name: 'Deimos', radius: 0.08, distance: 2.5, speed: 0.018 }
    ]
  },
  {
    name: 'jupiter',
    radius: 1.8,
    distance: 25,
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      { name: 'Io', radius: 0.1, distance: 2, speed: 0.03 },
      { name: 'Europa', radius: 0.2, distance: 2.1, speed: 0.025 },
      { name: 'Ganymede', radius: 0.13, distance: 2.4, speed: 0.02 },
      { name: 'Callisto', radius: 0.15, distance: 2.2, speed: 0.015 }
    ]
  },
  {
    name: 'saturn',
    radius: 2,
    distance: 35,
    speed: 0.0018,
    material: saturnMaterial,
    moons: [{ name: 'Titan', radius: 0.2, distance: 2, speed: 0.012 }]
  },
  {
    name: 'uranus',
    radius: 1.8,
    distance: 45,
    speed: 0.0012,
    material: uranusMaterial,
    moons: [{ name: 'Titania', radius: 0.3, distance: 2, speed: 0.01 }]
  },
  {
    name: 'neptune',
    radius: 1.5,
    distance: 55,
    speed: 0.001,
    material: neptuneMaterial,
    moons: [{ name: 'Triton', radius: 0.25, distance: 2, speed: 0.009 }]
  }
];

const planetMeshes = planets.map((planet)=>{
  //create mesh
  const planetMesh = new THREE.Mesh(
    geometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  //add to scene
  scene.add(planetMesh)
  //loop through each moon
  planet.moons.forEach((moon)=>{
    const moonMesh = new THREE.Mesh(geometry,moonMaterial)
    moonMesh.scale.setScalar(moon.radius)
    moonMesh.position.x = moon.distance
    planetMesh.add(moonMesh)
  })

  return planetMesh
})
console.log(planetMeshes);

//light
const ambientLight = new THREE.AmbientLight(0xffffff,0.02)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff,300)
scene.add(pointLight)

const sunMesh = new THREE.Mesh(geometry,sunMaterial)
sunMesh.scale.set(5,5,5)
scene.add(sunMesh)


const camera = new THREE.PerspectiveCamera(
  85,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)
camera.position.z = 25
camera.position.y = 5

const canvas = document.querySelector('.threejs_canvas')
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.autoRotate = false

const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth,window.innerHeight)
})
//seetin position and rotation

const renderLoop = ()=>{
  sunMesh.rotation.y += 0.001
  planetMeshes.forEach((planet, planetIndex)=>{
    planet.rotation.y += planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y)*planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y)*planets[planetIndex].distance

    planet.children.forEach((moon,moonIndex)=>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y)*planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y)*planets[planetIndex].moons[moonIndex].distance

    })
  })
  controls.update()
  renderer.render(scene,camera)
  requestAnimationFrame(renderLoop)
}
renderLoop()
