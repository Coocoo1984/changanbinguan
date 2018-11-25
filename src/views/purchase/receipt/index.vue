<template>
        <div class="weui-cells">
            <a @click="click(item)" v-for="(item,index) in list" :key="index" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>{{item.title}}</p>
                </div>
                <div class="weui-cell__ft">
                    <div v-html="item.slot"></div>
                </div>
            </a>
        </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    click() {
      this.$router.push("/purchase/receipt/1");
    },
    load() {
      this.$GET(
        "PurchasingOrderLists4Dept?departmentID=1&PageIndex=1&PageSize=5"
      ).then(r => {
        console.log(r);
        this.list = r.data.map(i => {
          return {};
        });
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style></style>
