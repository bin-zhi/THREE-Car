import * as THREE from 'three'
export class Sky {
  constructor(scene) {
    this.scene = scene
    this.noMesh = []
    this.init()
  }
  init() {
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
    this.scene.add(groundSphere)
    this.noMesh.push(groundSphere)
  }
}
