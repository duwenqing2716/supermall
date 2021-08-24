import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
    [ADD_COUNTER](state,payload){
      payload.count+=1
    },
    [ADD_TO_CART](state,payload){
      payload.checked = false
      state.cartList.push(payload)
    },
    checkedChange(state,payload){
      // console.log(state.cartList[payload].checked)
      state.cartList[payload].checked=!state.cartList[payload].checked
    }
}
