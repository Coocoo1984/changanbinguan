<template>
  <cells :datas="list" @item-click="click"></cells>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "报价",
          link: "add"
        },
        {
          title: "历史报价",
          link: "list"
        }
      ]
    };
  },
  methods: {
    click(item) {
      this.$router.push("/quote/" + item.link);
    }
  }
};
</script>
<style>
</style>

