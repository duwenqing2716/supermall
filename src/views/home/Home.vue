<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
    @tabClick='tabClick'
    ref='tabControl1'
    class="tabControl2"
    v-show="isShowtab"
    ></tab-control>
    <scroll
     class="content"
     ref='scroll'
     :probe-type='3'
     @scroll='contentScroll'
     :pull-up-load='true'
     @pullUpLoad='loadMore'
    >
    <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'> </home-swiper>
    <recommend-view :recommends='recommends'></recommend-view>
    <feature-view> </feature-view>
    <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref='tabControl2'></tab-control>
    <good-lists :goods="showGoods"></good-lists>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/TabControl/TabControl';
  import GoodLists from 'components/content/goods/GoodLists';
  import scroll from 'components/common/scroll/Scroll';
  import backTop from 'components/content/backTop/backTop';

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodLists,
      scroll,
      backTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop' : {page:0, list:[]},
          'new' : {page:0, list:[]},
          'sell' : {page:0, list:[]}
        },
        currentType:'pop',
        isShow:false,
        tabOffsetTop:0,
        isShowtab:false
      }
    },
    created() {
      // 组件创建完成
      // 1.请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){
      // setTimeout(()=>{
      //   console.log(this.$refs.tabControl.$el.offsetTop)
      // },2000)
       // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    destroyed(){
      console.log('销毁')
    },
    // 旧版bs bug,不能保持上次的位置通过activated,deactivated进行保存位置并添加
    activated(){
      this.$refs.scroll.refresh()
      // console.log('切换',this.saveY)
      // this.$refs.scroll.scrollTo(0,0)
      this.$refs.scroll.scrollTo(0,this.saveY,1)
    },
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()
      console.log(this.saveY)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods:{
      // 事件监听
      tabClick(index){
        // 可以通过二次三元表达式一步写完
        switch (index) {
          case 0:
          this.currentType='pop'
          break
          case 1:
          this.currentType='new'
          break
          case 2:
          this.currentType='sell'
          break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick(){
        // console.log('ssssssssss')
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // console.log(position.y)
         this.isShow =(-position.y)>1000
         this.isShowtab = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        // console.log('加载成功')
        this.getHomeGoods(this.currentType)
      },
      // 网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          console.log(res.data)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res =>{
         this.goods[type].list=this.goods[type].list.concat(res.data.list)
           // this.goods[type].list.push(...res.data.list) //es6
           this.goods[type].page +=1
           this.$refs.scroll.finishPullUp()
        })
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>/* scoped作用域 */
  #home{
    height: 100vh;
    position: relative;
    padding-top: 44px;
  }
  /* position: sticky 当元素达到top为44值时,自动变更为fixed 新属性大部分移动端开发兼容 浏览器低版本不兼容 */
  .home-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    /* 方法一 */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    /* 方法二 */
    /* 通过calc计算属性进行屏幕适配 */
   /* height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px; */
  }
  .tabControl2{
    position: relative;
    z-index: 9;
  }
</style>
