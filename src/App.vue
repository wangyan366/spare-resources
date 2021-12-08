<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->
    <div v-if="!network">
      <h3>我没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div>
    <router-view />
    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["network"]),
  },
  methods: {
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh() {
      this.$router.replace("/refresh");
    },
  },
};
</script>

<style>
#app {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}
</style>
