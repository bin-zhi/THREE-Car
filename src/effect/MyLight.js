import * as THREE from 'three'
export class MyLigt {
  constructor(scene) {
    this.scene = scene
    this.nowSpotLight = {} // 聚光灯光源对象
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0],
    ]
    this.init()
    this.createSportL()
  }
  init() {
    this.dirPosList.forEach((postionArr) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(...postionArr)
      this.scene.add(directionalLight)
    })
  }
  createSportL() {
    this.nowSpotLight = new THREE.SpotLight(0xffffff, 1)
    this.nowSpotLight.angle = 0.16 * Math.PI
    this.nowSpotLight.penumbra = 1
    this.nowSpotLight.castShadow = true
    this.nowSpotLight.shadow.mapSize.set(4096, 4096)
    this.nowSpotLight.position.set(0, 5, 0)
    this.scene.add(this.nowSpotLight)
  }
}
