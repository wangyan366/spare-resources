<template>
  <div id="problem">
    <van-nav-bar
      title="常见问题"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="problem-content">
      <img src="@/assets/images/problem/a.png" alt="" class="top-pic" />
      <div class="problem-box" v-for="item in faqList" :key="item.id">
        <div class="problem-box-top">
          <div class="problem-box-top-pic"></div>
          <div class="problem-box-content">{{ item.title }}</div>
        </div>
        <div class="problem-box-down">
          <div class="problem-box-down-pic"></div>
          <div class="problem-box-content">{{ item.content }}</div>
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
    return {
      value: "",
      faqList: [],
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.getlistFaq().then((res) => {
      console.log("🚀 ~ file: problem.vue ~ line 41 ~ mounted ~ res", res);
      this.faqList = res;
    });
  },

  methods: {
    ...mapActions(["getlistFaq"]),
    ...mapMutations(["setTabbarShow"]),
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
#problem {
  background: rgba(245, 247, 250, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  .problem-content{
      flex: 1;
      overflow-y: auto;
     
  }
}
.problem-box {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 1px 21px 0px rgba(40, 46, 45, 0.06);
  width: 90%;
  margin: auto;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  .problem-box-content {
    flex: 1;
  }
  .problem-box-top {
    line-height: 30px;
    border-bottom: 1px dashed #ccc;
    font-size: 18px;
    display: flex;
    padding: 6px 0;
    .problem-box-top-pic {
      width: 30px;
      height: 30px;
      background: url("../assets/images/problem/b.png");
      background-size: cover;
      display: inline-block;
      margin-right: 6px;
    }
  }
  .problem-box-down {
    font-size: 14px;
    display: flex;
    color: #747474;
    padding: 6px 0;
    .problem-box-down-pic {
      margin-right: 16px;
      width: 20px;
      height: 20px;
      background: url("../assets/images/problem/c.png");
      background-size: cover;
      display: inline-block;
    }
  }
}
.problem-box:last-child{
    margin-bottom: 45px;
}
// /deep/ .van-nav-bar__content {
//   background: rgba(44, 193, 107, 1);
//   color: #fff;
// }
// /deep/ .van-nav-bar__title {
//   color: #fff;
// }
// /deep/ .van-nav-bar .van-icon {
//   color: #fff;
// }
/deep/ .van-button--normal {
  width: 86%;

  // text-align: center;
}
.top-pic {
  width: 90%;
  display: block;
  margin: auto;
  margin-top: 20px;
}
.van-button--primary {
  background: rgba(224, 224, 224, 1);
  border-color: rgba(224, 224, 224, 1);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0%);
}
.van-button--default {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, 0%);
  color: rgba(224, 224, 224, 1);
}
</style>