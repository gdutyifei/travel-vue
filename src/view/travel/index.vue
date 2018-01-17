<template>
  <div class="index">
    <nav>
      <div class="nav-search">
        <input type="search" class="id-search" results="10" placeholder="请输入城市名" autosave="getHardboiled" />
      </div>
    </nav>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="item in images">
        <img class="swiper-img" :src="require( '' +  item )"/>
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination " slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "index",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: {
            stopOnLastSlide: false
          },
          // direction : 'vertical',
          // effect:"coverflow",
          grabCursor : true,
          setWrapperSize :true,
          centeredSlides: true,
          // autoHeight: true,
          // paginationType:"bullets",
          pagination : {
            el: '.swiper-pagination',
            clickable: true
          },
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          // scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        images: [
          './assets/img/1.jpg',
          './assets/img/2.jpg',
          './assets/img/3.jpg'
        ]
      }
    },
    //定义这个sweiper对象
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
      console.log('this is current swiper instance object', this.swiper);
      this.swiper.slideTo(0, 0, false);
    }
  }
</script>

<style scoped>
  .index {
    position: relative;
  }
  nav {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    text-align: center;
    margin-top: 1rem;
  }
  .nav-search {
    height: 2.5rem;
    line-height: 2.5rem;
    width: 100%;
    color: #333333;
  }
  .nav-search input {
    width: 92%;
    height: 100%;
    border-radius: 0.5rem;
    margin: 0 auto;
    border: 0.0125rem solid #DEDFE0;
    outline: none;
    resize: none;
    box-shadow: none;
    opacity: 0.45;
    background-color: #FFF;
    padding: 0 1rem;
  }
  .swiper-img {
    width: 100%;
  }
</style>
