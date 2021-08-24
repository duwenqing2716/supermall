<template>
  <div id="detail">
    <!-- <div>{{$store.state.cartList}}</div> -->
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref='nav' />
    <scroll class="content" ref="scroll" @scroll='contentScroll' :pullUpLoad='true'>
      <detail-swiper :top-images="topImages" ref='bases' />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo' ref='params'></detail-param-info>
      <detail-comment-info :commentInfo='commentInfo' ref='comments'></detail-comment-info>
      <good-lists :goods='recommend' ref='recommends'></good-lists>
    </scroll>
     <detail-bottom-bar  @addToCart='addToCart'></detail-bottom-bar>
     <back-top  @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import GoodLists from 'components/content/goods/GoodLists';
  import DetailBottomBar from './childComps/DetailBottomBar';
  import backTop from 'components/content/backTop/backTop'


  import scroll from 'components/common/scroll/Scroll'

  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodParam
  } from 'network/detail'

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTops: [],
        Index: 0,
        curIndex: 0,
        currentIndex: 0,
        isShow:false
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodLists,
      DetailBottomBar,
      backTop
    },
    created() {
      // console.log(this.$route)
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
          console.log(res)
          const data = res.result
          this.topImages = data.itemInfo.topImages
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo;
          this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule)
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        }),
        getRecommend().then(res => {
          console.log(res, 'recommend')
          this.recommend = res.data.list
        })
    },
    updated() {

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.themeTops = []
        this.themeTops.push(this.$refs.bases.$el.offsetTop-44)
        this.themeTops.push(this.$refs.params.$el.offsetTop-50)
        this.themeTops.push(this.$refs.comments.$el.offsetTop-50)
        this.themeTops.push(this.$refs.recommends.$el.offsetTop-50)
      },
      titleClick(index) {
          this.$refs.scroll.scrollTo(0, -this.themeTops[index], 400)
          // this.scrolltop=-this.themeTops[index]
      },
      contentScroll(position) {
        this.isShow =(-position.y)>1000
        const positionY = -position.y
        if (positionY > 0) {
          this.curIndex = positionY >= this.themeTops[this.Index + 1] ? this.Index++ : (positionY >= this.themeTops[this.Index] ?
            this.Index : this.Index--)
            // console.log(this.currentIndex)
          if (this.currentIndex !== this.curIndex) {
            this.currentIndex=this.curIndex
            // console.log('调用---',this.currentIndex,this.themeTops,positionY)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      backClick(){
        // console.log('ssssssssss')
        this.$refs.scroll.scrollTo(0,0)
      },
      addToCart() {
       // console.log('sadasd')
       // 获取信息 图片,标题,描述,价格，iid
       const obj ={}
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.newPrice;

       // 添加到购物车 vuex
       // 一般不能这么直接加入state,而是通过mutations的方法进行添加,让他进入vuex的相应
      // this.$store.state.cartList.push(product)
      // this.$store.commit('addCart', obj)
      this.$store.dispatch('addCart',obj).then(res =>{
              this.$toast.show(res,2000)
              // console.log(res,this.$toast)
      })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
  }


</style>
