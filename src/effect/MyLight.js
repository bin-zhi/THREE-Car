import * as THREE from 'three'
export class MyLigt {
  constructor(scene) {
    this.scene = scene
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0],
    ]
    this.init()
  }
  init() {
    this.dirPosList.forEach((postionArr) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(...postionArr)
      this.scene.add(directionalLight)
    })
  }
}
