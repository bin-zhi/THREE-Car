/**
 * @param {*} model 物体
 * @param {*} scene 场景
 * @param {*} camera 相机
 * @param {*} controls 轨道控制器
 */
import gsap from 'gsap'
import * as THREE from 'three'
import { MySprite } from './MySprite'
import { ClickHandler } from '@/util/Clickhander'
import { EventBus } from '@/util/EventBus'
export class Car {
  constructor(model, scene, camera, controls) {
    this.model = model
    this.scene = scene
    this.camera = camera
    this.controls = controls
    // 要被修改的物体
    this.carModel = {
      body: {
        main: {
          //车身
          name: 'Object_103',
          model: {},
        },
        roof: {
          //车顶
          name: 'Object_110',
          model: {},
        },
        leftDoor: {
          name: 'Object_64',
          model: {},
          mark: [
            {
              name: 'sprite',
              url: 'image/sprite.png',
              scale: [0.2, 0.2],
              position: [1.07, 1.94, -0.23],
            },
          ],
        },
        rightDoor: {
          name: 'Object_77',
          model: {},
          mark: [
            {
              name: 'sprite',
              url: 'image/sprite.png',
              scale: [0.2, 0.2],
              position: [-1.05, 0.78, -0.23],
            },
          ],
        },
      },
      glass: {
        // 玻璃
        front: {
          // 前玻璃
          name: 'Object_90',
          model: {},
        },
        leftGlass: {
          // 左玻璃
          name: 'Object_68',
          model: {},
        },
        rightGlass: {
          // 右玻璃
          name: 'Object_81',
          model: {},
        },
      },
    }
    // 车数值相关（记录用于发给后台-保存用户要购车相关信息）
    this.info = {
      price: 2444700,
      color: [
        {
          name: '土豪金',
          color: '#ff9900',
          isSelected: true,
        },
        {
          name: '传奇黑',
          color: '#343a40',
          isSelected: false,
        },
        {
          name: '海蓝',
          color: '#409EFF',
          isSelected: false,
        },
        {
          name: '玫瑰紫',
          color: '#6600ff',
          isSelected: false,
        },
        {
          name: '银灰色',
          color: '#DCDFE6',
          isSelected: false,
        },
      ],
      // 贴膜
      film: [
        {
          name: '高光',
          price: 0,
          isSelected: true,
        },
        {
          name: '磨砂',
          price: 20000,
          isSelected: false,
        },
      ],
    }
    // 视角切换数据
    // 汽车各种视角坐标对象
    this.positionObj = {
      // 主驾驶
      main: {
        camera: {
          x: 0.36,
          y: 0.96,
          z: -0.16,
        },
        controls: {
          x: 0.36,
          y: 0.87,
          z: 0.03,
        },
      },
      // 副驾驶位
      copilot: {
        camera: {
          x: -0.39,
          y: 0.87,
          z: 0.07,
        },
        controls: {
          x: -0.39,
          y: 0.85,
          z: 0.13,
        },
      },
      // 外面观察
      outside: {
        camera: {
          x: 3,
          y: 1.5,
          z: 3,
        },
        controls: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    }
    this.init()
    this.modifyCarBody()
    // 创建热点标记
    this.creatdDoorSprite()
  }
  init() {
    // 把车模型加入到场景中
    this.scene.add(this.model)
    // 遍历所有子项开启阴影
    this.model.traverse((obj) => {
      obj.castShadow = true
    })
    // 拿到所有要被修改的模型
    Object.values(this.carModel.body).forEach((obj) => {
      obj.model = this.model.getObjectByName(obj.name)
    })
    // 拿到所有玻璃模型
    Object.values(this.carModel.glass).forEach((obj) => {
      obj.model = this.model.getObjectByName(obj.name)
    })
    // 注册eventbus事件
    EventBus.getInstance().on('changeColor', (colorString) => {
      // 把模型外出更换颜色
      Object.values(this.carModel.body).forEach((obj) => {
        obj.model.material.color = new THREE.Color(colorString)
      })
      // 把选择的颜色的isSelented 改为true
      Object.values(this.info.color).forEach((obj) => {
        obj.isSelected = false
        if (obj.color == colorString) {
          obj.isSelected = true
        }
      })
    })
    // 注册材质改变  磨砂and高光
    EventBus.getInstance().on('changeMaterial', (materialType) => {
      if (materialType === '高光') {
        Object.values(this.carModel.body).forEach((obj) => {
          obj.model.material.roughness = 0.5
          obj.model.material.metalness = 1
          obj.model.material.clearcoat = 1
        })
      } else if (materialType === '磨砂') {
        console.log(materialType)
        Object.values(this.carModel.body).forEach((obj) => {
          obj.model.material.roughness = 1
          obj.model.material.metalness = 0.5
          obj.model.material.clearcoat = 0
        })
      }
      this.info.film.forEach((obj) => {
        obj.isSelected = false
        if (obj.name === materialType) {
          obj.isSelected = true
        }
      })
    })
    // 注册总价改变事件
    EventBus.getInstance().on('changeTotalPrice', () => {
      const item = this.info.film.find((item) => item.isSelected)
      const price = item.price + this.info.price
      document.querySelector('.price span').innerHTML = `￥ ${price.toFixed(2)}`
    })
    // 注册视角切换事件
    EventBus.getInstance().on('changeCamera', (cameraType) => {
      this.setCameraAnimation(this.positionObj[cameraType])
    })
  }
  // 更改模型改材质颜色
  modifyCarBody() {
    // 更改模型默认颜色
    Object.values(this.carModel.body).forEach((obj) => {
      obj.model.material = new THREE.MeshPhysicalMaterial({
        color: 0xff9900,
        roughness: 0.5,
        metalness: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
      })
    })
    // 更改模型玻璃为单面渲染
    Object.values(this.carModel.glass).forEach((obj) => {
      obj.model.material.side = THREE.FrontSide //改为单面渲染
    })
    // 车顶改为双面渲染
    this.carModel.body.roof.model.material.side = THREE.DoubleSide
  }
  // 创建车门热点标记
  creatdDoorSprite() {
    const maskList = [this.carModel.body.leftDoor, this.carModel.body.rightDoor]
    maskList.forEach((obj) => {
      obj.mark.forEach((mask) => {
        const samll = new MySprite(mask)
        // 加入到父节点里 跟随父节点进行动画
        obj.model.add(samll)
        // 调用ClickHander类 传入热点标记对象加入物体
        // addmesh接收两个参数  一个是物体  另一个函数  也就是要执行的函数 这个函数接收一个参数；就是这个要执行的物体
        // 因为这里两个物体是传入的一样的函数  所以需要区分是哪个问题执行  所以需要从参数接收
        ClickHandler.getInstance().addMesh(samll, (mesh) => {
          // 因为点击的地方是热点标记；要旋转的是热点标记的父级；但是父级是根据中心点坐标旋转的；所以需要用到父级的父级；这个是固定的闷的边框点
          // 判断里面的自定义属性是否为true  如果为true则是打开的 就关闭回归0 关闭状态
          if (mesh.userData.isShow) {
            const clickMesh = mesh.parent.parent.parent
            this.setDoorAnimation(clickMesh, { x: 0 })
            mesh.userData.isShow = false
          } else {
            // 如果为false则是关闭的 就打开
            const clickMesh = mesh.parent.parent.parent
            this.setDoorAnimation(clickMesh, { x: Math.PI / 3 })
            mesh.userData.isShow = true
          }
        })
      })
    })
  }
  setDoorAnimation(mesh, obj) {
    gsap.to(mesh.rotation, {
      x: obj.x,
      duration: 1,
      ease: 'power1.inOut',
    })
  }
  // 摄像机和轨道控制器动画
  setCameraAnimation(obj) {
    // 相机
    gsap.to(this.camera.position, {
      ...obj.camera,
      duration: '1',
      ease: 'power1.inOut',
    })
    // 轨道控制器
    gsap.to(this.controls.target, {
      ...obj.controls,
      duration: '1',
      ease: 'power1.inOut',
    })
  }
}
