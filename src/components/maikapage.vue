<template>
  <div class="maikapage">
    <van-nav-bar
      title="卖卡记录"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="maikapage-row">
      <van-tabs
        type="card"
        v-model="timeRange"
        @click="onClick"
        color="#2ecc71"
        class="maikapage-row-tabs"
      >
        <van-tab title="全部"></van-tab>
        <van-tab title="今天"></van-tab>
        <van-tab title="7天内"></van-tab>
        <van-tab title="1个月内"></van-tab>
        <van-tab title="3个月内"></van-tab>
      </van-tabs>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="maikapage-box"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div class="maikapage-box-header">
              <span class="l">订单号{{ item.sno }}</span>
              <div class="pic r" v-show="item.sellState == 2"></div>
            </div>
            <div class="maikapage-box-content">
              <div>
                <span>日 期</span>
                <p>{{ item.createTime }}</p>
              </div>
              <div>
                <span>卡种</span>
                <p>{{ item.cardCategoryName }}</p>
              </div>
              <div>
                <span>预计可得</span>
                <p>{{ item.discountValue }}</p>
              </div>
              <div>
                <span>实际到账</span>
                <p>
                  {{ item.auditValue }}
                </p>
              </div>
              <div>
                <span>交易状态</span>
                <p>{{ item.sellStateLabel }}</p>
              </div>
              <div>
                <span> 审核备注 </span>
                <p>{{ item.remark }}</p>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, List, Tab, Tabs, PullRefresh } from "vant";
import { mapMutations, mapActions,mapState} from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
  },
    computed: {
    ...mapState({
      userId: "userId", // 第一种写法
    }),
  },
  data() {
    return {
      // active:1,
      dataList: [],
      loading: false,
      pageSize: 10,
      page: 1,
      totalCount: 2,
      finished: false, //加了个总页数变量，自定义个比page大的数字，否则会直接this.finished = true;
      timeRange: 0,
      refreshing: false,
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.onLoad();
  },

  methods: {
    onRefresh() {
      this.finished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.clearData();
      this.onLoad();
    },

    clearData() {
      this.page = 1;
      this.totalCount = 2;
      this.finished = false;
      this.dataList = [];
    },
    onClick(val) {
      this.clearData();
      this.onLoad();
    },
    onLoad() {
      if (this.loading) {
        return;
      }
      this.finished = false;
      this.loading = true;
      // 异步更新数据
      let obj = {
        pageNo: this.page,
        pageSize: this.pageSize,
        timeRange: this.timeRange,
      };
      var that = this;
      this.getMaiKaList(obj).then((res) => {
        this.refreshing = false;
        that.dataList = [...that.dataList, ...res.paginateData]; //追加数据
        that.loading = false;
        console.log(
          "🚀 ~ file: maikapage.vue ~ line 120 ~ this.getWithdrawalList ~ this",
          this
        );
        console.log(
          "🚀 ~ file: maikapage.vue ~ line 121 ~ this.getWithdrawalList ~ that",
          that
        );
        that.totalCount = res.totalCount;
        if (that.totalCount > that.dataList.length) {
          that.page = that.page + 1;
          that.onLoad();
        } else {
          that.finished = true;
          that.loading = false;
        }
      });
    },
    ...mapActions(["getMaiKaList"]),
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
.maikapage {
  background: rgba(245, 247, 250, 1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.maikapage-row {
  overflow-y: auto;
  flex: 1;
  padding-top: 20px;
  box-sizing: border-box;
}
.maikapage-box {
  margin-top: 18px;
  background: #fff;
}
.maikapage-box:last-child {
  margin-bottom: 20px;
}
.maikapage-box-header {
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
.maikapage-box-content {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  padding-bottom: 10px;
}
.maikapage-box-content > div {
  width: 50%;
  padding-left: 13px;
  box-sizing: border-box;
  color: #333;
  font-size: 12px;
  margin-top: 10px;
  p {
    padding-top: 6px;
    color: #747474;
  }
}
</style>