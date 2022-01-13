<template>
  <div id="notice">
    <van-nav-bar
      title="公告"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="notice-content">
      <div class="notice-box" v-for="item in noticeList" :key="item.id">
        <div class="notice-box-top">
          <div class="notice-box-content">{{ item.title }}</div>
        </div>
        <div class="notice-box-down">
          <div class="notice-box-content">{{ item.content }}</div>
        </div>
        <div style="font-size: 12px;color: #333;">
          {{ item.publishTimeLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from "vant";
import { mapMutations, mapActions ,mapState} from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
  },
  data() {
    return {
      value: "",
      noticeList: [],
    };
  },
 computed: {
    ...mapState({
      userId: "userId", // 第一种写法
    }),
  },
  mounted() {
    this.setTabbarShow(false);
    this.getlistNotice().then((res) => {
      console.log("🚀 ~ file: notice.vue ~ line 41 ~ mounted ~ res", res);
      this.noticeList = res;
    });
  },

  methods: {
    ...mapActions(["getlistNotice"]),
    ...mapMutations(["setTabbarShow"]),
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.replace ({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#notice {
  background: rgba(245, 247, 250, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  .notice-content {
    flex: 1;
    overflow-y: auto;
  }
}
.notice-box {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 1px 21px 0px rgba(40, 46, 45, 0.06);
  width: 90%;
  margin: auto;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  .notice-box-content {
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
  }
  .notice-box-top {
    line-height: 30px;
    border-bottom: 1px dashed #ccc;
    font-size: 18px;

    padding: 6px 0;
  }
  .notice-box-down {
    font-size: 14px;

    color: #747474;
    padding: 6px 0;
  }
}
.notice-box:last-child {
  margin-bottom: 45px;
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
</style>