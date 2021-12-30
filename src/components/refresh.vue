<template>
  <div>
    <van-nav-bar
      title="欢迎注册"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div id="refresh-app">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          required
          clearable
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="password"
          name="password"
          label="设置密码"
          placeholder="请设置密码，字母、数字、符号至少两种"
          :formatter="formatter"
          :error-message="errorText"
          :rules="[{ required: true, trigger: 'onBlur' }]"
          right-icon="eye"
          :type="!passwordStatus ? 'password' : 'text'"
          @click-right-icon="passwordStatus = !passwordStatus"
        />
        <van-field
          v-model="newpassword"
          required
          label="确认密码"
          name="newpassword"
          placeholder="请确认密码"
          clearable
          :error-message="errorText1"
          :rules="[{ required: true, validator: validatornewPassword1 }]"
        />
        <van-field
          v-model="QQ"
          clearable
          name="QQ"
          label="联系QQ"
          placeholder="请填写联系QQ"
        />
        <van-field
          v-model="mobile"
          required
          clearable
          name="mobile"
          label="手机号"
          placeholder="请填写手机号"
          type="tel"
          :rules="[{ validator, message: '请输入正确内容'  }]"
        />
        <van-field
          v-model="dynamicCode"
          center
          required
          clearable
          name="dynamicCode"
          label="短信验证码"
          placeholder="请填写短信验证码"
          :rules="[{ required: true }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              native-type="button"
              @click.stop="smsVerificationClick()"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="verifyCode"
          required
          name="verifyCode"
          clearable
          center
          label="验证码"
          placeholder="请填写验证码"
          :rules="[{ required: true }]"
        >
          <template #button>
            <img
              class="capchaImg"
              :src="captchaSrc"
              @click.stop="getCaptchaSrc()"
            />
          </template>
        </van-field>

        <!-- <p class="explain">
          短信10分钟之内有效，若已失效或未收到验证码，请点击重新获取
        </p> -->
        <div style="margin: 16px">
          <van-button round block type="danger" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { NavBar, Button, Dialog, Step, Steps, Form, Field, Toast } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Dialog.Component.name]: Dialog.Component,
    [Form.name]: Form,
    [Field.name]: Field,
    [Toast.name]: Toast,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      pattern: /^(1+\d{10})$/,
      username: "",
      mobile: "",
      time: "",
      captchaSrc: "",
      dynamicCode: "",
      verifyCode: "",
      password: "",
      newpassword: "",
      errorText: "",
      errorText1: "",
      passwordStatus: false,
      QQ:"",
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.getCaptchaSrc();
  },

  methods: {
     validator(val) {
      return /1\d{10}/.test(val);
    },
    ...mapActions(["sendMessage","save"]),
    smsVerificationClick() {
      if (this.mobile == "") {
        Toast("请先填写手机号");
        return;
      }
      let obj = {
        time: this.time,
        verifyCode: this.verifyCode,
        dynamicCode: this.dynamicCode,
        mobile: this.mobile,
        sendType: 1,
      };
      this.sendMessage(obj).then((res) => {
        console.log(
          "🚀 ~ file: changephone.vue ~ line 127 ~ this.confirmMobile ~ res",
          res
        );
      });
    },
    validatornewPassword1(val) {
      if (!val) return true;
      if (val !== this.password) {
        this.errorText1 = "重复输入密码错误";
        return false;
      }
      this.errorText1 = "";
      return true;
    },
    formatter(val) {
      const reg =
        /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$/;

      if (!val) return "";
      // return reg.test(val);
      if (!reg.test(val)) {
        this.errorText = "请输入字母、数字、符号至少两种组合的字符";
      } else {
        this.errorText = "";
      }
      return val;
    },
    // 获取图片验证码
    getCaptchaSrc() {
      // 也可以处理图片
      this.time = new Date().getTime();
      this.captchaSrc = `${base.VUE_APP_BASE_API}/voucher/login/randImage.do?time=${this.time}`;
    },
    clearObj() {
      this.captchaSrc = "";
      this.dynamicCode = "";
      this.verifyCode = "";
      this.username = "";
      this.password = "";
      this.getCaptchaSrc();
    },
    onSubmit(val) {
      debugger
      if (this.newpassword !== this.password) {
        this.errorText1 = "重复输入密码错误";
        Toast.fail("重复输入密码错误");
        return;
      }
      let obj={
        time:this.time,
        verifyCode:this.verifyCode,
        dynamicCode:this.dynamicCode,
        mobile:this.mobile,
        username:this.username,
        password:this.password,
        QQ:this.QQ,
      }
      console.log("🚀 ~ file: refresh.vue ~ line 193 ~ onSubmit ~ val", val);
      // this.save().then(res=>{

      // })
    },
    ...mapMutations(["setTabbarShow"]),
    changephoneClick() {
      this.$router.replace({
        path: "/changephone",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.push({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      }
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
#refresh-app {
  padding: 27px 20px;
  position: relative;
}
.top {
  font-size: 16px;
  color: #333333;
}
.refresh {
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
  color: #333;
  margin-top: 20px;
  background: #eee;
  padding: 6px;
}
.capchaImg {
  border: 1px solid #ccc;
}
</style>