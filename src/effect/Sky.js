import * as THREE from 'three'
import { EventBus } from '@/util/EventBus'
export class Sky {
  constructor(scene) {
    this.scene = scene
    this.noMesh = []
    this.SkyName = '展厅' //当前场景名称  默认户外
    this.init()
  }
  init() {
    this.indoor()
    EventBus.getInstance().on('changeSky', (skyName) => {
      if (this.SkyName == skyName) return //防止是相同的造成重复销毁和新建
      this.clear() //先清除现有的物体释放空间
      if (skyName == '户外') {
        this.outdoor()
        this.SkyName = skyName
      } else if (skyName == '展厅') {
        this.indoor()
        this.SkyName = skyName
      }
    })
  }
  // 室内场景
  indoor() {
    // 创建球体
    const geometry = new THREE.SphereGeometry(10, 32, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x42454c, side: THREE.DoubleSide })
    const sphere = new THREE.Mesh(geometry, material)
    this.scene.add(sphere)
    this.noMesh.push(sphere)
    // 创建地板
    const groundGeometry = new THREE.CircleGeometry(10, 32)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x42454c,
      side: THREE.DoubleSide,
    })
    const groundSphere = new THREE.Mesh(groundGeometry, groundMaterial)
    groundSphere.rotateX(Math.PI / 2)
    groundSphere.receiveShadow = true
    this.scene.add(groundSphere)
    this.noMesh.push(groundSphere)
  }
  // 户外场景
  outdoor() {
    // 创建球体
    const geometry = new THREE.SphereGeometry(40, 32, 16)
    // 户外背景图
    const desert = new THREE.TextureLoader().load('image/desert.jpg')
    const material = new THREE.MeshBasicMaterial({ map: desert, side: THREE.DoubleSide })
    const sphere = new THREE.Mesh(geometry, material)
    this.scene.add(sphere)
    this.noMesh.push(sphere)
    // 创建地板
    const sand = new THREE.TextureLoader().load('image/sand.jpg')
    const groundGeometry = new THREE.CircleGeometry(20, 32)
    const groundMaterial = new THREE.MeshStandardMaterial({
      map: sand,
      color: 0xa0825a,
      side: THREE.DoubleSide,
    })
    const groundSphere = new THREE.Mesh(groundGeometry, groundMaterial)
    groundSphere.rotateX(Math.PI / 2)
    this.scene.add(groundSphere)
    this.noMesh.push(groundSphere)
  }
  // 清除物体
  clear() {
    this.noMesh.forEach((obj) => {
      obj.material.dispose()
      obj.geometry.dispose()
      obj.material.map && obj.material.map.dispose()
      obj.parent.remove(obj)
    })
    this.noMesh.splice(0, this.noMesh.length)
  }
}
