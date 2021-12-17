<template>
  <div>
    <van-nav-bar
      title="更换手机"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div id="phone-app">
      <span class="top"> 已绑定手机号 </span>
      <div class="phone">156******74</div>
      <div class="down">
        一个手机号只可以绑定一个账号，绑定手机号将作为您身份验证的
        重要方式，请慎重操作！
      </div>
      <van-button type="primary">更换手机号</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from "vant";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index" }); //返回上一层
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
/deep/ .van-button--normal {
  width: 86%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
}
#phone-app {
  padding: 27px 20px;
  position: relative;
}
.top {
  font-size: 16px;
  color: #333333;
}
.phone {
  font-size: 34px;
  color: #333333;
  margin-bottom: 36px;
}
.down {
  font-size: 12px;
  color: #969799;
}
</style>