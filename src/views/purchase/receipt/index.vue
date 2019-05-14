<template>
  <div>
    <div class="weui-cells">
      <a
        @click="click(item)"
        v-for="(item,index) in list"
        :key="index"
        class="weui-cell weui-cell_access"
        href="javascript:;"
      >
        <div class="weui-cell__bd">
          <p>{{item.department_name}}</p>
          <p class="code">{{item.po_code}}</p>
        </div>
        <div class="weui-cell__ft">
          <div>{{item.po_item_count}}个项目</div>
        </div>
      </a>
    </div>
    <v-scroll :load="load" :busy="busy" :not-data="page>1&&list.length<=0" :more="more"></v-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 0,
      busy: true,
      busy: false,
      more: true
    };
  },
  methods: {
    click(item) {
      this.$router.push("/purchase/receipt/" + item.po_id);
    },
    load() {
      if (this.busy) return;
      this.busy = true;
      this.$loading(true);
      this.page = this.page + 1;
      this.$GET(
        "PurchasingOrderLists4Dept?departmentID=" +
          this.$store.state.User.deptid +
          "&PageIndex=" +
          this.page +
          "&PageSize=10"
      ).then(r => {
        this.list = r.data;
        this.$loading(false);
        this.busy = true;
        if (r.data.length >= 10) {
          this.busy = false;
        } else this.more = false;
      });
    }
  },
  mounted() {
    this.list = [];
    this.page = 0;
    this.load();
  }
};
</script>

<style></style>
