import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: resolve => (require(["@/components/login"], resolve))
  }, {
    path: '/online',
    name: 'online',
    component: resolve => (require(["@/components/online"], resolve))
  }, {
    path: '/home',
    name: 'home',
    component: resolve => (require(["@/components/home"], resolve))
  }, {
    path: '/carCenter',
    name: 'carCenter',
    component: resolve => (require(["@/components/car-center"], resolve))
  }]
})
const isLogin = () => Boolean(sessionStorage.getItem('token') || localStorage.getItem('token'))//判断登录
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  }
  if (!isLogin() && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next();
  }


});
export default router