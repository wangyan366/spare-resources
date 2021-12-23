<template>
  <div class="withdrawal">
    <van-nav-bar
      title="提现记录"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="withdrawal-row">
      <div class="withdrawal-box" v-for="index in 8" :key="index">
        <div class="withdrawal-box-header">
          <span class="l">订单号</span>
          <div class="pic r"></div>
        </div>
        <div class="withdrawal-box-content">
          <div>
            <span>日 期</span>
          </div>
          <div>
            <span>提现金额</span>
          </div>
          <div>
            <span>手 续 费</span>
          </div>
          <div>
            <span>实际到账</span>
          </div>
          <div>
            <span>提现类型</span>
          </div>
          <div>
            <span>提现账号</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from "vant";
import { mapMutations, mapActions } from "vuex";
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
    ...mapMutations(["getTabBarActive"]),
    onClickLeft() {
      if (this.$route.query.type == "my") {
        this.getTabBarActive("my");
      } else {
        this.getTabBarActive("home");
      }
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
.withdrawal {
  background: rgba(245, 247, 250, 1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.withdrawal-row {
  overflow-y: auto;
  flex: 1;
}
.withdrawal-box {
  margin-top: 18px;
  background: #fff;
}
.withdrawal-box:last-child {
  margin-bottom: 20px;
}
.withdrawal-box-header {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  span {
    margin-left: 13px;
  }
  .pic {
    width: 59px;
    height: 40px;
    background: url("../assets/images/wancheng.png") no-repeat;
    background-size: cover;
  }
}
.withdrawal-box-content {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  padding-bottom: 10px;
}
.withdrawal-box-content > div {
  width: 50%;
  padding-left: 13px;
  box-sizing: border-box;
  color: rgba(129, 129, 129, 1);
  font-size: 12px;
  margin-top: 10px;
}
</style>