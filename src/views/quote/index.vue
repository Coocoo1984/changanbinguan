<template>
  <div>
    <div class="weui-cells__title">报价管理</div>
    <div class="weui-grids">
      <grid-item name="报价" @click="toSubmit()"></grid-item>
      <grid-item name="订单" @click="toOrder()"></grid-item>
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
    }
  }
};
</script>

<style>
</style>
