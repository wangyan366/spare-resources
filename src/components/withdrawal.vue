<template>
  <div class="withdrawal">
    <van-nav-bar
      title="提现记录"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="withdrawal-row">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="withdrawal-box" v-for="(item, index) in list" :key="index">
          <div class="withdrawal-box-header">
            <span class="l">订单号</span>
            <div class="pic r"></div>
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
              <p>{{ item.account }}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- <div class="withdrawal-row">
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
    </div> -->
  </div>
</template>

<script>
import { NavBar, Button, List } from "vant";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [List.name]: List,
  },
  data() {
    return {
      list: [],
      loading: false,
      pageSize: 10,
      page: 1,
      totalPage: 2,
      finished: false, //加了个总页数变量，自定义个比page大的数字，否则会直接this.finished = true;
    };
  },

  mounted() {
    this.setTabbarShow(false);
    this.getList();
  },

  methods: {
    getList() {
      this.loading = true;
      //判断当前页数 和总页数
      if (this.page >= this.totalPage) {
        this.finished = true;
      } else {
        this.onLoad();
      }
    },
    onLoad() {
      // 异步更新数据
      let obj = {
        pageNo: this.page,
        pageSize: this.pageSize,
        timeRange: 0,
      };
      this.getWithdrawalList(obj).then((res) => {
        this.loading = false;
        var resData = res;
        this.totalPage = res.totalPages;
        if (resData.paginateData.length > 0) {
          this.list = this.list.concat(resData.paginateData); //追加数据
          console.log("增加page前");
          console.log(this.page);
          this.page = this.page + 1;
          console.log("增加page后");
          console.log(this.page);
        } else {
          this.finished = true;
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
  p{
    padding-top: 6px;
    color: #747474;
  }
}
</style>