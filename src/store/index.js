import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  //mutations唯一目的就是修改state的状态
  // mutations的每一个方法尽可能完成的事件比较单一
  mutations,
  actions,
  getters
})

export default store
