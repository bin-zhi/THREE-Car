import { camera } from '@/entry/index.js'
import { ClickHandler } from '@/util/Clickhander'
import { EventBus } from '@/util/EventBus'
ClickHandler.getInstance().init(camera)
// 注册颜色模块点击事件
let colorStringList = document.querySelectorAll('.col_group>div')
colorStringList.forEach((el) => {
  el.addEventListener('click', () => {
    EventBus.getInstance().emit('changeColor', el.dataset.col)
  })
})
// 注册高光磨砂点击事件
let lightStringList = document.querySelectorAll('.coat_group>div')
lightStringList.forEach((el) => {
  el.addEventListener('click', () => {
    // 改变材质
    EventBus.getInstance().emit('changeMaterial', el.dataset.co)
    // 改变总价
    EventBus.getInstance().emit('changeTotalPrice')
  })
})
// 场景切换事件
let sky = document.querySelectorAll('.scene_group>div')
sky.forEach((el) => {
  el.addEventListener('click', () => {
    EventBus.getInstance().emit('changeSky', el.dataset.poi)
  })
})
// EventBus.getInstance().emit('changeColor',)
