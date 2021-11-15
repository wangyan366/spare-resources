<template>
  <div>
    <van-nav-bar
      title="让闲置资源更有价值"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      safe-area-inset-top
      :border="false"
      fixed
    >
      <template #left>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-swipe :autoplay="3000" height="140">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" fit="contain" width="100%" height="100%" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="false" square>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        <span class="grid-text">111</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
        <span class="grid-text">111</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
        <span class="grid-text">111</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
        <span class="grid-text">111</span>
      </van-grid-item>
    </van-grid>
    <div class="card">
      <div>公告</div>
      <div class="body">
        <p>6666</p>
      </div>
    </div>
    <van-tabs swipeable>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
        内容 {{ index }}
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Image as VanImage,
  Grid,
  GridItem,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
} from "vant";
export default {
  name: "Home",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [VanImage.name]: VanImage,
    [Lazyload.name]: Lazyload,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    //  'van-lazyload': Lazyload
  },
  data() {
    return {
      active: 0,
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },

  mounted() {},

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style lang="less" scoped>
.grid-text {
  font-size: 14px;
}
.card {
  width: 96%;
  height: 100px;
  display: flex;
  flex-direction: column;
  background: red;
  border-radius: 10px;
  margin: auto;
  font-size: 13px;
}
</style>