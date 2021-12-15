<template>
  <div>
    <van-nav-bar
      title="更换手机"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  background: rgba(44, 193, 107, 1);
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
</style>