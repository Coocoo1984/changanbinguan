<template>
  <div>
    <div class="weui-cells__title">报价管理</div>
    <div class="weui-grids">
      <grid-item name="报价" @click="toSubmit()" icon="ios-locate"></grid-item>
      <grid-item name="订单" @click="toOrder()" icon="ios-play"></grid-item>
      <grid-item name="退货" @click="toBack()" icon="ios-play"></grid-item>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSubmit() {
      this.$router.push("/quote/submit");
    },
    toOrder() {
      this.$router.push("/quote/order");
    },
    toBack() {
      this.$router.push("/quote/back");
    }
  }
};
</script>

<style>
</style>
