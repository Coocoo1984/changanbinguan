<template>
  <cells :datas="list" @item-click="click"></cells>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "分类管理",
          link: "commodity/category"
        },
        {
          title: "商品管理",
          link: "commodity"
        },
        {
          title: "采购方管理",
          link: "purchase"
        },
        {
          title: "供应商管理",
          link: "quote"
        }
      ]
    };
  },
  methods: {
    click(item) {
      this.$router.push("/manager/" + item.link);
    }
  }
};
</script>
<style>
</style>

