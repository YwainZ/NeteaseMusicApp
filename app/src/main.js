// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import indexMusic from '../src/components/indexMusic.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import store from '../store/index'

Vue.prototype.$http = axios
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.component('indexMusic', indexMusic)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
