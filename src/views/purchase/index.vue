<template>
  <cells :datas="list" @item-click="click"></cells>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "新增采购",
          link: "add"
        },
        {
          title: "历史采购",
          link: "list"
        },
        {
          title: "入库",
          link: "receipt"
        }
      ]
    };
  },
  methods: {
    click(item) {
      this.$router.push("/purchase/" + item.link);
    }
  }
};
</script>
<style>
</style>

