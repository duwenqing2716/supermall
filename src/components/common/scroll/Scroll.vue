<template>
  <div class='wrapper' ref='wrapper'>
    <div class='content'>
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import BetterScroll from 'better-scroll'
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import ObserveImage from '@better-scroll/observe-image'
  import ObserveDOM from '@better-scroll/observe-dom'

  // 在goodlistitem中vue监听图片加载@load=''进行判断

  BScroll.use(Pullup)
  BScroll.use(ObserveDOM)
  BScroll.use(ObserveImage)

	export default {
		name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      // this.scroll = new BScroll(document.querySelector('.wrapper'))
      // 防止复用时name名重复调用错误
      this.scroll = new BScroll(this.$refs.wrapper,{
         click: true,
         // 是否在wrapper里div中能够实现点击
         probeType:this.probeType,
         //是否实时监听位置
         pullUpLoad:this.pullUpLoad,
         // 是否实时监听上拉
         observeDOM: true,
         observeImage: true
      })
      // this.scroll.scrollTo(0,0)
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullUpLoad')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=400){
        //防止网络请求过快 scroll还为undefined或者null
        console.log('响应成功')
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll? this.scroll.y:0
      }
    }
	}
</script>

<style scoped>

</style>
