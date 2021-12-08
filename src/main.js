// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/assets/style/common.css'
import store from './store/index'
import axios from 'axios'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //讲自定义的store对象 与vue实例结合起来了，在任意的组件中 访问 this.$store
  components: { App },
  template: '<App/>'
})
