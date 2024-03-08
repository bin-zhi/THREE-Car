// 事件总线
export class EventBus {
  constructor() {
    // 声明一个对象  用来装所以的事件名称 和对应的事件
    this.eventList = {}
  }
  // 使用单例模式
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus()
    }
    return this.instance
  }
  // 用来装入事件
  on(eventName, fn) {
    // 判断当前事件名是否存在
    if (!this.eventList[eventName]) {
      // 不存在则创建一个数组啊
      this.eventList[eventName] = []
    }
    // 往当前事件名内 加入事件
    this.eventList[eventName].push(fn)
  }
  emit(eventName, ...args) {
    // 调用事件
    this.eventList[eventName].forEach((fn) => {
      fn(...args)
    })
  }
}
