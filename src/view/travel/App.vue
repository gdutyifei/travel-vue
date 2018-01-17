/**
* Created by luoyifei on 2017/12/31.
*/
<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer class="footer">
      <div class="module">
        <img src="./assets/img/index.png"/>
        <p>首页</p>
      </div>
      <div class="module">
        <img src="./assets/img/discovery.png"/>
        <p>发现</p>
      </div>
      <div class="module">
        <img src="./assets/img/stroke.png"/>
        <p>行程</p>
      </div>
      <div class="module">
        <img src="./assets/img/mine.png"/>
        <p>我的</p>
      </div>
    </footer>
    <!-- 底部tab结束 -->
  </div>
</template>

<script>
  export default {
    name: "travel"
  }
</script>

<style scoped>
  .footer {
    width: 100%;
    height: 4rem;
    position: fixed;
    bottom: 0;
    display: table;
    border-top: 0.0125rem solid #888888;
  }
  .module {
    height: 2rem;
    display: table-cell;
    width: 25%;
    text-align: center;
    vertical-align: middle;
  }
  .module img {
    width: 2rem;
    height: 2rem;
  }

</style>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  /* div 点击时取消点击效果 */
  div{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }

  /* 手机 */
  @media screen and (min-width: 320px) and (max-width: 650px) {

  }
  /* pad */
  @media screen and (min-width: 650px) and (max-width: 980px) {

  }
  /* pc */
  @media screen and (min-width: 980px) and (max-width: 1240px) {

  }
</style>
