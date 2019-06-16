<template>
  <div>
    <div class="weui-tab">
      <div class="weui-navbar">
        <div
          @click="type=0"
          class="weui-navbar__item"
          :class="type==0?'weui-bar__item_on':''"
        >已完成的订单</div>
        <div
          @click="type=1"
          class="weui-navbar__item"
          :class="type==1?'weui-bar__item_on':''"
        >未完成的退货</div>
        <div
          @click="type=2"
          class="weui-navbar__item"
          :class="type==2?'weui-bar__item_on':''"
        >已完成的退货</div>
      </div>
    </div>
    <div class="weui-tab__panel">
      <purchase-list @click="click" style="margin-top:44px" :datas="datas[type]"></purchase-list>
      <v-scroll
        :load="load(type)"
        :busy="busy[type]"
        :not-data="page[type]>1&&datas[type].length<=0"
        :more="more[type]"
      ></v-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: [0, 0, 0],
      busy: [false, false, false],
      more: [true, true, true],
      datas: [[], [], []],
      type: 0
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    },
    user() {
      return this.$store.state.User;
    }
  },
  methods: {
    click(item) {
      if (this.type == 0) {
        this.$router.push({
          path: "/purchase/back_add",
          query: {
            id: item.id
          }
        });
      } else {
        this.$router.push({
          path: "/purchase/back/" + item.id,
          query: {
            id: item.id,
            status: item.status
          }
        });
      }
    },

    load(type) {
      if (this.busy[type]) return;
      this.busy[type] = true;
      this.$loading(true);
      this.page[type] = this.page[type] + 1;
      var url = "";
      if (type == 0) {
        url =
          "PurchasingOrderLists4Dept?departmentID=" +
          this.user.deptid +
          "&PageIndex=" +
          this.page[type] +
          "&PageSize=20";
      } else if (type == 1) {
        url =
          "ChargeBackList?listDepartmentIDs=" +
          this.user.deptid +
          "&PageIndex=" +
          this.page[type] +
          "&PageSize=20&listStateIds=11,12,13,14,15";
      } else if (type == 2) {
        url =
          "ChargeBackList?listDepartmentIDs=" +
          this.user.deptid +
          "&PageIndex=" +
          this.page[type] +
          "&PageSize=20&listStateIds=16";
      }
      this.$GET(url).then(r => {
        for (var i of r.data) {
          if (type == 0) {
            this.datas[type].push({
              title: i.department_name,
              code: i.po_code,
              slot: i.purchasing_order_state_name,
              status: i.purchasing_state_id,
              department_name: i.vendor_name,
              id: i.po_id
            });
          } else {
            this.datas[type].push({
              title: i.vendor_name,
              code: i.create_time,
              slot: i.purchasing_state_name,
              status: i.purchasing_state_id,
              department_name: i.vendor_name,
              id: i.id
            });
          }
        }
        this.$loading(false);
        if (r.data.length >= 10) {
          this.busy[type] = false;
        } else this.more[type] = false;
      });
    }
  },
  mounted() {
    this.page = [0, 0, 0];
    this.datas = [[], [], []];
    this.load(this.type);
  }
};
</script>

<style>
</style>
