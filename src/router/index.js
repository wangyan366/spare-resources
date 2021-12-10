import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: resolve => (require(["@/components/login"], resolve))
  }, {
    path: '/',
    name: 'online',
    component: resolve => (require(["@/components/online"], resolve))
  }, {
    path: '/index',
    name: 'index',
    component: resolve => (require(["@/components/index"], resolve))
  }, {
    path: '/carCenter',
    name: 'carCenter',
    component: resolve => (require(["@/components/car-center"], resolve))
  }, {
    path: '/refresh',
    name: 'refresh',
    component: resolve => (require(["@/components/refresh"], resolve))
  }]
})
const isLogin = () => Boolean(localStorage.getItem('token'))//判断登录
//路由守卫

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    localStorage.removeItem("token");
  }
  // if (!isLogin() && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next();
  // }
  next();

});
export default router