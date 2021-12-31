<template>
  <div class="withdrawal">
    <van-nav-bar
      title="提现记录"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="withdrawal-row">
      <van-tabs
        type="card"
        v-model="timeRange"
        @click="onClick"
        color="#2ecc71"
        class="withdrawal-row-tabs"
      >
        <van-tab title="全部"></van-tab>
        <van-tab title="今天"></van-tab>
        <van-tab title="7天内"></van-tab>
        <van-tab title="1个月内"></van-tab>
        <van-tab title="3个月内"></van-tab>
      </van-tabs>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="withdrawal-box"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="withdrawal-box-header">
            <span class="l">订单号{{item.sno}}</span>
            <div class="pic r" v-show="item.successed==1"></div>
          </div>
          <div class="withdrawal-box-content">
            <div>
              <span>日 期</span>
              <p>{{ item.createTime }}</p>
            </div>
            <div>
              <span>提现金额</span>
              <p>{{ item.tixianMoney }}</p>
            </div>
            <!-- <div>
              <span>手 续 费</span>
            </div> -->
            <div>
              <span>提现方式</span>
              <p>{{item.tixianTypeLabel}}</p>
            </div>
            <div>
              <span>交易状态</span>
              <p>  {{item.successLabel}}</p>
            
            </div>
            <div>
              <span>提现账号</span>
              <p>{{ item.account }}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, List, Tab, Tabs } from "vant";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
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
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.onLoad();
  },

  methods: {
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
      this.getWithdrawalList(obj).then((res) => {
        that.dataList = [...that.dataList, ...res.paginateData]; //追加数据
        that.loading = false;
        console.log(
          "🚀 ~ file: withdrawal.vue ~ line 120 ~ this.getWithdrawalList ~ this",
          this
        );
        console.log(
          "🚀 ~ file: withdrawal.vue ~ line 121 ~ this.getWithdrawalList ~ that",
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
    ...mapActions(["getWithdrawalList"]),
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
  padding-top: 20px;
  box-sizing: border-box;
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
  color: #333;
  font-size: 12px;
  margin-top: 10px;
  p {
    padding-top: 6px;
    color: #747474;
  }
}
</style>