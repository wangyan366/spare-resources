import Vue from 'vue'
import Router from 'vue-router'
import online from '@/components/online'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'online',
      component: online
    },{
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
