<template>
  <div class="detail-swiper">
  <swiper class='swiper-item'>
    <swiper-item v-for="item in topImages">
        <img :src="item" alt="" class="detail-swiper-img"  @load="imageLoad">
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
          if(!this.isLoad){
            console.log('----------')
            this.$emit('swiperImageLoad')
            this.isLoad=!this.isLoad
          }
      }
    }
  }
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
  .detail-swiper-img{
    margin-top: -70px;
  }
</style>
