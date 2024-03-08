/**
 * @param {*} pash 模型文件路径
 * @param {*} callback 加载成功回调
 */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
export function loadManager(pash, callback) {
  const loader = new GLTFLoader()
  loader.load(
    pash,
    (e) => {
      callback(e)
    },
    (e) => {
      // console.log('加载中', e),
      ;(e) => {
        throw new Error(e)
      }
    }
  )
}
