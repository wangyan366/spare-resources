
<template>
  <div class="hello">
    <h1>首页</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      count: "", //倒计时
    };
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ path: "/home" }); // 强制切换当前路由 path
    }, 3000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
