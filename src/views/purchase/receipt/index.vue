<template>
  <div class="weui-cells">
    <a
      @click="click(item)"
      v-for="(item,index) in list"
      :key="index"
      class="weui-cell weui-cell_access"
      href="javascript:;"
    >
      <div class="weui-cell__bd">
        <p>{{item.department_name}}{{item.po_code}}</p>
      </div>
      <div class="weui-cell__ft">
        <div>{{item.po_item_count}}个项目</div>
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
    click(item) {
      this.$router.push("/purchase/receipt/" + item.po_id);
    },
    load() {
      this.$GET(
        "PurchasingOrderLists4Dept?departmentID=1&PageIndex=1&PageSize=5"
      ).then(r => {
        console.log(r);
        this.list = r.data;
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style></style>
