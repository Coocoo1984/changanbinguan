<template>
  <div>
    <div class="weui-grids">
      <grid-item message name="采购" @click="toPurchase"></grid-item>
      <grid-item message='1' name="复核" @click="toReview"></grid-item>
      <grid-item message='10' name="报价" @click="toQuote"></grid-item>
      <grid-item name="库存管理" @click="toStock"></grid-item>
      <grid-item name="管理" @click="toManager"></grid-item>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toPurchase() {
      this.$router.push("/purchase");
    },
    toReview() {
      this.$router.push("/review");
    },
    toQuote() {
      this.$router.push("/quote");
    },
    toManager() {
      this.$router.push("/manager");
    },
    toStock() {
      this.$router.push("/stock");
    }
  }
};
</script>


