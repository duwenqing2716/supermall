<template>
  <transition name="fade">
  <div class="toast" v-show="isShow">
    <div>{{messages}}</div>
  </div>
  </transition>
</template>

<script>
  export default{
    name:'Toast',
    props:{
      // messages:{
      //   type:String,
      //   default(){
      //     return ''
      //   }
      // }
    },
    data(){
      return {
        messages:'',
        isShow:false
      }
    },
    methods:{
      show(messages='默认文字',duration=2000){
        // duration=duration || 2000
        this.isShow = true;
        this.messages = messages

        setTimeout(()=>{
          this.isShow = false
          this.messages = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    /* transform: all 0.2s; */
    transform:translate(-50%,-50%) ;
    z-index: 999;
    color: #fff;
    padding: 10px 12px;
    background-color: rgba(0,0,0,0.6);
  }
  	.fade-enter{
  		opacity: 0;
  	}
  	.fade-enter-active{
  		transition: opacity 0.5s;
  	}
  	
</style>
