<template>
  <div class="index">
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
  .swiper-img {
    width: 100%;
  }
</style>
