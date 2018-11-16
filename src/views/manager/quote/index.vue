<template>
  <div>
    <cells :datas="list" @item-click="click"></cells>

  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "XXX",
          link: "info"
        }
      ]
    };
  },
  methods: {
    click(item) {
      this.$router.push("/manager/quote/info");
    }
  },
  mounted() {
    console.log(this.list);
  }
};
</script>
