<template>
  <div>
    <van-nav-bar
      title="更换手机号"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div id="changephone-app">
      <van-steps :active="active">
        <van-step>验证身份</van-step>
        <van-step>更换绑定手机</van-step>
        <van-step>成功</van-step>
      </van-steps>
      <van-form @submit="onSubmit" ref="myform">
        <van-field
          v-model="userInfo.mobileLabel"
          name="mobileLabel"
          label="已验证手机号"
          readonly
          v-if="active == 0"
        />
        <van-field
          v-model="mobile"
          v-else
          required
          clearable
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
          :rules="[{ required: true }]"
        />

        <van-field
          v-model="verifyCode"
          required
          name="verifyCode"
          clearable
          center
          label="验证码"
          placeholder="请输入验证码"
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
        <van-field
          v-model="dynamicCode"
          center
          required
          clearable
          name="dynamicCode"
          label="短信验证码"
          placeholder="请输入短信验证码"
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
        <p class="explain">
          短信10分钟之内有效，若已失效或未收到验证码，请点击重新获取
        </p>
        <div style="margin: 16px">
          <van-button round block type="danger" native-type="submit">
            {{ buttonTex() }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { NavBar, Button, Dialog, Step, Steps, Form, Field } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
export default {
  name: "Phone",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      mobile: "",
      time: "",
      dialogshow: false,
      active: 0,
      captchaSrc: "",
      dynamicCode: "",
      verifyCode: "",
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.getCaptchaSrc();
  },

  methods: {
    buttonTex() {
      switch (this.active) {
        case 0:
          return "下一步";
        case 1:
          return "完成";
        case 2:
          return "修改成功";

        default:
          break;
      }
    },
    clearObj() {
      this.captchaSrc = "";
      this.dynamicCode = "";
      this.verifyCode = "";
      this.getCaptchaSrc();
    },
    smsVerificationClick() {
      let obj = {
        mobile: this.active == 0 ? this.userInfo.mobile : this.mobile,
        verifyCode: this.verifyCode,
        time: this.time,
        sendType: 3,
      };
      this.sendMessage(obj).then((res) => {
        console.log(
          "🚀 ~ file: changephone.vue ~ line 127 ~ this.confirmMobile ~ res",
          res
        );
      });
    },
    // 获取图片验证码
    getCaptchaSrc() {
      // 也可以处理图片
      this.time = new Date().getTime();
      this.captchaSrc = `${base.VUE_APP_BASE_API}/voucher/login/randImage.do?time=${this.time}`;
    },
    ...mapMutations(["setTabbarShow"]),
    ...mapActions(["sendMessage", "confirmMobile", "updateMobile"]),
    onSubmit(val) {
      if (this.active == 0) {
        let obj = {
          time: this.time,
          verifyCode: this.verifyCode,
          dynamicCode: this.dynamicCode,
        };
        this.confirmMobile(obj)
          .then((res) => {
            this.active = 1;
            this.getCaptchaSrc();
            this.clearObj();
          })
          .catch((err) => {
            this.getCaptchaSrc();
          });
        return;
      }
      if (this.active == 1) {
        let obj = {
          time: this.time,
          verifyCode: this.verifyCode,
          dynamicCode: this.dynamicCode,
          mobile: this.mobile,
        };
        this.updateMobile(obj)
          .then((res) => {
            this.active = 2;
            return;
          })
          .catch((err) => {
            this.active = 2;
            this.getCaptchaSrc();
            this.clearObj();
          });
        return;
      }
      if (this.active == 2) {
        this.onClickLeft();
        return;
      }
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
#changephone-app {
  padding: 27px 20px;
  position: relative;
}
.top {
  font-size: 16px;
  color: #333333;
}
.changephone {
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
}
.capchaImg {
  border: 1px solid #ccc;
}
</style>