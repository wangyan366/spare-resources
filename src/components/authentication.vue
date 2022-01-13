<template>
  <div id="authentication">
    <van-nav-bar
      title="设置提现账号"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="authentication">
      <van-form @submit="onSubmit" ref="myform">
        <span class="title">
          <span class="redStylle">*</span>
          支付宝账号</span
        >
        <van-field
          v-model="userInfo.alipay"
          placeholder="请填写支付宝账号"
          :rules="[{ required: true }]"
          name="alipay"
          clearable
        />
        <span class="title"> <span class="redStylle">*</span>输入登录密码</span>
        <van-field
          v-model="password"
          placeholder="请输入登录密码"
          :rules="[{ required: true }]"
          name="password"
          clearable
           right-icon="eye"
          :type="!passwordStatus ? 'password' : 'text'"
          @click-right-icon="passwordStatus = !passwordStatus"
        />
        <van-button type="primary" native-type="submit">提交</van-button>
        <van-button type="default" @click="onClickLeft">取消</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell, CellGroup, Form, Toast } from "vant";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Toast.name]: Toast,
  },
  computed: {
    ...mapState(["userInfo","userId"]),
  },
  data() {
    return {
      passwordStatus: false,
      value: "",
      password: "",
      alipay: "",
      dataInfo: {},
    };
  },

  mounted() {
    this.setTabbarShow(false);
  },

  methods: {
    ...mapActions(["getDetail", "updateAlipay"]),
    ...mapMutations(["setTabbarShow"]),
    onSubmit(val) {
      this.updateAlipay(val).then((res) => {
        Toast("修改成功");
        if (decodeURIComponent(this.$route.query.redirect) == "cash") {
          this.$router.replace ({
            path: decodeURIComponent(this.$route.query.redirect),
          });
          this.setTabbarShow(true);
        }
      });
    },
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.replace ({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      }
    },
  },
    beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.userId == "") {
        vm.$router.replace({
          path: "/login",
          query: {
            redirect: encodeURIComponent(vm.$router.currentRoute.fullPath),
          },
        });
        return;
      }
      next();
    });
  },
};
</script>

<style lang="less" scoped>
#authentication {
  position: relative;
  width: 100%;
  height: 100%;
}
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

  // text-align: center;
}
.redStylle {
  color: #ee0a24;
  margin-right: 10px;
}
.van-button--primary {
  background: rgba(224, 224, 224, 1);
  border-color: rgba(224, 224, 224, 1);
  display: block;
  margin: auto;
  margin-top: 10px;
}
.van-button--default {
  margin: auto;
  color: rgba(224, 224, 224, 1);
  display: block;
  margin-top: 10px;
}
.authentication {
  padding: 20px 10px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    color: #333333;
    // margin-top: 20px;
    padding: 2.667vw 4.267vw;
  }
  .bar {
    display: inline-block;
    width: 100%;
    height: 1px;
    background: rgba(51, 51, 51, 0.1);
  }
}
</style>