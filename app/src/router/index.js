import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import playListDetail from '../views/playListDetail.vue'
Vue.use(Router)
const songlist = resolve => require(['../views/songlist.vue'], resolve)
const playerDetail = resolve => require(['../views/playerDetail.vue'], resolve)
const playBar = resolve => require(['../components/playBar.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: songlist
    },
    {
      path: '/playListDetail',
      name: 'playListDetail',
      component: playListDetail
    },
    {
      path: '/playerDetail',
      name: 'playerDetail',
      component: playerDetail
    },
    {
      path: '/playBar',
      name: 'playBar',
      component: playBar
    }
  ]
})
