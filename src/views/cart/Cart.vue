<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot='center'>购物车({{length}})</div>
    </nav-bar>

    <cart-list class="cart-list"></cart-list>

    <bottom-bar></bottom-bar>
  </div>
</template>

<script>


  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './CartList/CartList'
  import BottomBar from './CartList/BottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      //两种方法
      // 1在使用getters里原方法时用
      // ...mapGetters(['cartLength','cartList'])
      // 2在使用自定义名称时使用对象中的键值对定义
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
    #cart {
      position: relative;
      background-color: #fff;
      height: 100vh;
    }
    .nav-bar {
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
    }



</style>
