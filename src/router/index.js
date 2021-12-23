import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/index'　// 路由重定向，当用户访问根路径时，重新跳转到home下的login组件　
  }, {
    path: '/login',
    name: 'login',
    component: resolve => (require(["@/components/login"], resolve))
  }, {
    path: '/online',
    name: 'online',
    component: resolve => (require(["@/components/online"], resolve))
  }, {
    path: '/index',
    name: 'index',
    component: resolve => (require(["@/components/index"], resolve))
  }, {
    path: '/refresh',
    name: 'refresh',
    component: resolve => (require(["@/components/refresh"], resolve))
  }, {
    path: '/phone',
    name: 'phone',
    component: resolve => (require(["@/components/phone"], resolve))
  }, {
    path: '/withdrawal',
    name: 'withdrawal',
    component: resolve => (require(["@/components/withdrawal"], resolve))
  }, {
    path: '/certification',
    name: 'certification',
    component: resolve => (require(["@/components/certification"], resolve))
  }, {
    path: '/password',
    name: 'password',
    component: resolve => (require(["@/components/password"], resolve))
  }]
})
// const isLogin = () => Boolean(localStorage.getItem('token'))//判断登录
//路由守卫

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   localStorage.removeItem("token");
  // }
  // if (!isLogin() && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next();
  // }
  next();

});
export default router