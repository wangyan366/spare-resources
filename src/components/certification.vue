<template>
  <div id="certification">
    <van-nav-bar
      title="实名认证"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="certification">
      <van-form @submit="onSubmit" ref="myform">
        <span class="title">真实姓名</span>
        <van-field v-model="realName" placeholder="请填写您本人的真实姓名 " name="realName" />
        <!-- <span class="bar"></span> -->
        <span class="title">身份证</span>
        <van-field v-model="certificateNo" placeholder="请填写您本人的真实身份证" name="certificateNo"/>
        <!-- <span class="bar"></span> -->
        <!-- <span class="title"></span> -->
        <van-button type="primary" native-type="submit">提交</van-button>
        <van-button type="default" @click="onClickLeft">取消</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell, CellGroup, Form,Toast } from "vant";
import { mapMutations, mapActions,mapState } from "vuex";
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
  data() {
    return {
      value: "",
      certificateNo: "",
      realName: "",
    };
  },
  computed: {
    ...mapState({
      userId: "userId", // 第一种写法
    }),
  },
  mounted() {
    this.setTabbarShow(false);
  },

  methods: {
    ...mapMutations(["setTabbarShow"]),
    ...mapActions(["updateCertificate"]),
    onSubmit(val){
      this.updateCertificate(val).then(res=>{
      console.log("🚀 ~ file: certification.vue ~ line 53 ~ this.updateCertificate ~ res", res)
        Toast("认证成功")
      })
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
            redirect:vm.$router.currentRoute.fullPath,
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
#certification {
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
.certification {
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