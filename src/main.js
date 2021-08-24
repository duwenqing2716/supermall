import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/common/toast/index'

import VueLazyload from 'vue-lazyload'

import FastClick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

Vue.use(Toast)
//使用懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
//解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

// Vue.use(VueLazyLoad, {
//   preLoad: 1,
//   loading: require('assets/img/common/placeholder.png')
// })

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
