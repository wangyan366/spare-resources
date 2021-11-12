<template>
  <div>
    <van-nav-bar
      title="让闲置资源更有价值"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      safe-area-inset-top
      :border="false"
    >
      <template #left>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <h1>333</h1>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
  name: "Home",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style lang="less" scoped>
</style>