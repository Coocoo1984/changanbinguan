<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        v-for="(type,index) in types"
        :key="type"
        :class="index==current?'weui-bar__item_on':''"
        @click="click(type,index)"
        class="weui-navbar__item"
      >{{type}}</div>
    </div>
    <div class="weui-tab__panel">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      types: [
        "计划初审",
        "计划复审",
        "计划终审",
        "报价初审",
        "报价复审",
        "退货审核"
      ],
      current: 0
    };
  },
  mounted() {
    window.onpopstate = () => {
      this.$router.push("/")  //输入要返回的上一级路由地址
    }
  },
  destroyed(){
    window.onpopstate =  undefined;
  },
  methods: {
    click(item, index) {
      this.current = index;
      switch (item) {
        case "计划初审":
          this.$router.push({ path: "/review/purchase", query: { state: 1 } });
          break;
        case "计划复审":
          this.$router.push({ path: "/review/purchase", query: { state: 2 } });
          break;
        case "计划终审":
          this.$router.push({ path: "/review/purchase", query: { state: 3 } });
          break;
        case "报价初审":
          this.$router.push({ path: "/review/qoute", query: { state: 1 } });
          break;
        case "报价复审":
          this.$router.push({ path: "/review/qoute", query: { state: 2 } });
          break;
        case "退货审核":
          this.$router.push({ path: "/review/qoute", query: { state: 3 } });
          break;
        default:
          break;
      }
    }
  }
};
</script>