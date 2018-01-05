/**
 * Created by luoyifei on 2017/12/31.
 */

import Vue from 'vue'
import App from './App'
import vuex from 'Vuex'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import index from './index'
import discovery from './discovery'
import stroke from './stroke'
import mine from './mine'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(vuex)
Vue.use(Router)
Vue.use(VueAwesomeSwiper)

const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/discovery',
    name: 'discovery',
    component: discovery
  }, {
    path: '/stroke',
    name: 'stroke',
    component: stroke
  }, {
    path: './mine',
    name: 'mine',
    component: mine
  }]
});


router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
