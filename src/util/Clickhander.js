import * as THREE from 'three'
export class ClickHandler {
  // 单例类  一个类只有一个实例 外部使用直接调用ClickHandler.getInstance()拿到公用实例
  static getInstance() {
    if (!this.instance) {
      this.instance = new ClickHandler()
    }
    return this.instance
  }
  init(camera) {
    // 接收传进来的相机  因为光射投影判断点击事件需要用到
    this.camera = camera
    // 声明一个数组  用来装需要组测点击事件的物体（否则就是遍历整个scene里面的物体数组  ，只遍历有事件的可以提高效率）
    this.list = []
    // 键值  map的键可以是任何类型  所以物体来标识键 值就是对应要执行的函数
    this.map = new Map()
    // 创建光射投影
    const raycaster = new THREE.Raycaster()
    // 二维向量
    const pointer = new THREE.Vector2()
    // 场景
    const app = document.querySelector('.app')
    window.addEventListener('click', (event) => {
      pointer.x = (event.clientX / app.clientWidth) * 2 - 1
      pointer.y = -(event.clientY / app.clientHeight) * 2 + 1
      raycaster.setFromCamera(pointer, this.camera)
      // 拿到所点击的物体数组
      const intersects = raycaster.intersectObjects(this.list)
      intersects.forEach((item) => {
        // 找到物体对应的函数
        const fn = this.map.get(item.object)
        // 给回调函数返回无图
        fn(item.object)
      })
    })
  }
  addMesh(mesh, fn) {
    // 添加物体
    this.list.push(mesh)
    this.map.set(mesh, fn)
  }
}
