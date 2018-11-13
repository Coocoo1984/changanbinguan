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
          title: "收货单：2018112208305511",
          slot: "12个项目"
        },
        {
          title: "收货单：2018112208305511",
          slot: "13个项目"
        },
        {
          title: "收货单：2018112208305511",
          slot: "17个项目"
        }
      ]
    };
  },
  methods: {
    click() {
      this.$router.push("/purchase/receipt/1");
    }
  }
};
</script>

<style></style>
