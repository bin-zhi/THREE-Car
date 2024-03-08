import * as THREE from 'three'
export class MySprite {
  constructor({ name, url, position, scale }) {
    const map = new THREE.TextureLoader().load(url)
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    sprite.position.set(...position)
    sprite.scale.set(...scale)
    sprite.name = name
    return sprite
  }
}
