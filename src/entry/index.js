// 初始化 three.js 基础环境
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { loadManager } from '../model/loadManager'
import { Car } from '../model/Car'
import { MyLigt } from '../effect/MyLight'
import { Sky } from '../effect/Sky'
export let scene, camera, renderer, controls
// 这次 app 标签作为 three.js 的画布容器
const app = document.querySelector('.app')

function init() {
  // 创建场景
  scene = new THREE.Scene()
  // 创建相机
  camera = new THREE.PerspectiveCamera(75, app.clientWidth / app.clientHeight, 0.1, 1000)
  // 设置相机的位置
  camera.position.set(3, 1.5, 3)
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  // 开启渲染器加载阴影
  renderer.shadowMap.enabled = true
  // 设置渲染器的宽高
  renderer.setSize(app.clientWidth, app.clientHeight)
  // 将渲染器添加到 app 标签中
  document.querySelector('.app').appendChild(renderer.domElement)
  // 加载模型
  loadManager('/public/glb/Lamborghini.glb', (e) => {
    new Car(e.scene, scene, camera, controls)
    new MyLigt(scene)
    new Sky(scene)
  })
}

function createControls() {
  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
}

function createHelper() {
  // 创建辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
}

function resizeRender() {
  // 创建窗口适应
  window.addEventListener('resize', () => {
    renderer.setSize(app.clientWidth, app.clientHeight)
    camera.aspect = app.clientWidth / app.clientHeight
    camera.updateProjectionMatrix()
  })
}

function renderLoop() {
  // 渲染
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(renderLoop)
}

function start() {
  init()
  createControls()
  createHelper()
  resizeRender()
  renderLoop()
}

start()
