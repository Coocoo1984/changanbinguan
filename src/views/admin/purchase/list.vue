 <template>
  <!-- <cells :datas="list" @item-click="click"></cells> -->
  <div>
    <purchase-list @click="click" :datas="datas"></purchase-list>
    <v-scroll :load="load" :busy="busy" :not-data="page>1&&datas.length<=0" :more="more"></v-scroll>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      page: 0,
      busy: false,
      more: true,
      datas: []
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    }
  },
  methods: {
    click(item) {
      this.$router.push({
        path: "/adm/purchase/content",
        query: {
          id: item.id,
          status: item.status,
          department_name: item.department_name
        }
      });
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "<span class='orgin'>采购已确认</span>";
        case 2:
          return "<span class='red'>供应商否定</span>";
        case 3:
          return "<span class='blur'>备货中</span>";
        case 4:
          return "<span class='blur'>已发货</span>";
        case 5:
          return "<span class='blur'>收货中</span>";
        case 6:
          return "<span class='green'>完成</span>";
      }
    },
    load() {
      if (this.busy) return;
      this.busy = true;
      this.$loading(true);
      this.page = this.page + 1;
      this.$GET(
        "PurchasingOrderList?PageIndex=" + this.page + "&PageSize=20"
      ).then(r => {
        for (var i of r.data) {
          this.datas.push({
            title: i.department_name || "采购单",
            code: i.po_code,
            slot: this.getStatus(i.purchasing_state_id),
            status: i.purchasing_state_id,
            department_name: i.department_name,
            id: i.po_id
          });
        }
        this.$loading(false);
        if (r.data.length >= 10) {
          this.busy = false;
        } else this.more = false;
      });
    }
  },
  activated() {
    this.page = 0;
    this.datas = [];
    this.load();
  }
};
</script>
 
 <style>
</style>
 