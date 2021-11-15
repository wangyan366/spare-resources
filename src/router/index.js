import Vue from 'vue'
import Router from 'vue-router'
import online from '@/components/online'
import home from '@/components/home'
import carCenter from '@/components/car-center'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'online',
    component: online
  }, {
    path: '/home',
    name: 'home',
    component: home
  }, {
    path: '/carCenter',
    name: 'carCenter',
    component: carCenter
  }]
})
