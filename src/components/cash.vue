<template>
  <div>
    <van-nav-bar
      title="我要提现"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />

    <div id="tixian-app">
      <van-form @submit="onSubmit">
        <van-field
          v-model="dataInfo.realName"
          name="realName"
          label="姓名"
          readonly
        />

        <van-field
          v-model="dataInfo.alipay"
          required
          name="alipay"
          readonly
          label="支付宝账号"
          placeholder="请输入支付宝账号"
          :rules="[{ required: true }]"
        >
        </van-field>
        <van-field
          v-model="tixianMoney"
          center
          required
          clearable
          name="tixianMoney"
          label="提现现金"
          :rules="[{ required: true }]"
          :placeholder="placeholderText"
          @touchstart.native.stop="show = true"
          :formatter="formatter"
          :error-message="errorText"
        >
        </van-field>
        <p class="explain"></p>
        <van-field
          v-model="password"
          center
          required
          clearable
          name="password"
          label="登录密码"
          placeholder="登录密码"
          :rules="[{ required: true, trigger: 'onBlur' }]"
          right-icon="eye"
          :type="!passwordStatus ? 'password' : 'text'"
          @click-right-icon="passwordStatus = !passwordStatus"
        >
        </van-field>

        <div style="margin: 16px">
          <van-button round block type="danger" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 输入键盘 -->
    <van-number-keyboard
      theme="custom"
      :show="show"
      :title="'￥' + tixianMoney"
      :maxlength="maxlength"
      extra-key="."
      @input="handleInput"
      @delete="handleDelete"
      @close="handleClose"
      close-button-text="确定"
      @blur="show = false"
      safe-area-inset-bottom
      hide-on-click-outside
    ></van-number-keyboard>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import {
  NavBar,
  Button,
  Dialog,
  Step,
  Steps,
  Form,
  Field,
  Toast,
  NumberKeyboard,
} from "vant";
export default {
  name: "Phone",
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [Form.name]: Form,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    ...mapState(["userId", "userInfo"]),
  },
  data() {
    return {
      passwordStatus: false,
      tixianMoney: "",
      password: "",
      dataInfo: { realName: "", alipay: "", balance: 0.0 },
      placeholderText: "提现现金",
      maxlength: 8,
      show: false,
      errorText: "",
    };
  },

  mounted() {
    this.setTabbarShow(false);
  },
  watch: {
    tixianMoney(val) {
      if (/^0[1-9]/.test(val)) {
        this.tixianMoney = val.substring(1);
      }
    },
  },
  methods: {
    ...mapActions(["getDetail", "doPay"]),
    ...mapMutations(["setTabbarShow"]),
    formatter(val) {
      const reg = /^\d+(\.\d{1,2})?$/;

      if (!val) return "";
      // return reg.test(val);
      if (!reg.test(val)) {
        this.errorText = "支持小数点后两位";
      } else {
        this.errorText = "";
      }
      return val;
    },
    handleInput(key) {
      this.tixianMoney = this.tixianMoney + "";
      if (this.tixianMoney === "" && key === ".") {
        this.tixianMoney = "0";
      } else if (this.tixianMoney.indexOf(".") !== -1 && key === ".") {
        return;
      } else if (
        this.tixianMoney.indexOf("0") !== -1 &&
        this.tixianMoney.length === 1 &&
        key === 0
      ) {
        return;
      } else if (/\.\d{2}$/.test(this.tixianMoney)) {
        return;
      }
      this.tixianMoney += key;
    },
    handleDelete() {
      this.tixianMoney = this.tixianMoney + "";
      if (!this.tixianMoney) {
        return;
      }
      this.tixianMoney = this.tixianMoney.substring(
        0,
        this.tixianMoney.length - 1
      );
    },
    handleClose() {
      this.tixianMoney = Number(this.tixianMoney);
      this.$emit("input", this.tixianMoney);
    },
    onSubmit(val) {
      let obj = {
        password: val.password,
        tixianMoney: val.tixianMoney,
      };
      this.doPay(obj).then((res) => {
        this.tixianMoney = "";
        this.password = "";
      });
    },
    authenticationClick(from) {
      this.$router.replace({
        path: "/authentication",
        query: {
          redirect: from.fullPath,
        },
      });
    },
    certification(from) {
      this.$router.replace({
        path: "/certification",
        query: {
          redirect:from.fullPath,
        },
      });
    },
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.replace({
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
            redirect: from.fullPath,
          },
        });
        return;
      }
      vm.getDetail().then((res) => {
        vm.dataInfo = res;
        vm.placeholderText = `本次最多可提现${res.balance}元`;
        if(from.name=='certification'){
              next();
                  return;
        }
         if(from.name=='authentication'){
              next();
                  return;
        }
        if (!vm.dataInfo.alipay || vm.dataInfo.alipay == "") {
          vm.authenticationClick(from);
          return;
        } else if (
          !vm.dataInfo.realName ||
          vm.dataInfo.realName == ""
        ) {
          vm.certification(from);
          return;
        }else{
              next();
        }
      });
      next();
    });
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
#tixian-app {
  padding: 27px 20px;
  position: relative;
}
.top {
  font-size: 16px;
  color: #333333;
}
.tixian {
  font-size: 34px;
  color: #333333;
  margin-bottom: 36px;
}
.down {
  font-size: 12px;
  color: #969799;
}
.explain {
  font-size: 12px;
  color: #969799;
  margin-top: 20px;
  text-align: center;
}
</style>