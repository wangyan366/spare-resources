
<template>
  <div class="online">
    <van-image :src="img" />
   
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { Image as VanImage } from "vant";
export default {
  name: "Online",
  components: {
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      img: require("@/assets/images/header.png"),
    };
  },
  computed: {
  
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ path: "/index" });
    }, 1000);
  },
  methods: {
 
  },
  //   beforeRouteLeave(to, from, next) {
  //     // debugger;
  //     // if (this.$store.state.firstLogin) {
  //     //   //   next({ path: "/login" });
  //     //   next({ path: "/login" });
  //     // } else {
  //     //   next({ path: "/home" });
  //     // }
  //   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.online {
  width: 100%;
  height: 100%;
  position: relative;
}
.deep/ .van-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
