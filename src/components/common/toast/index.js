import Toast from './Toast'

const obj={}
// 其中install的第一个参数Vue表示的是Vue的实例，第二个参数表示的是一些设置选项。
obj.install = function (Vue,options){
  // 创建组件构造器
  const toastConstrustor = Vue.extend(Toast)
  // new 的方式,根据组件构造器,可以创建出来一个组件对象
  const toast = new toastConstrustor()
  // 将组件对象,手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj