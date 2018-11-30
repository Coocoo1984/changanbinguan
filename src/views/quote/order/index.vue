<template>
  <div>
    <div class="weui-cells__title">筛选项</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">订单类型：</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="type">
            <option value="0">全部</option>
            <option value="1">食材</option>
            <option value="2">办公用品</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">订单日期：</label>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-flex">
            <div class="weui-flex__item">
              <div class="placeholder" @click="selectStartDate()">{{startDate}} 到</div>
            </div>
            <div class="weui-flex__item">
              <div class="placeholder" @click="selectEndDate()">{{endDate}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">订单状态：</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="status">
            <option value="0">全部</option>
            <option value="1">食材</option>
            <option value="2">办公用品</option>
          </select>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" @click="load">查询筛选</a>
      </div>
    </div>
    <div class="weui-panel__hd">订单列表：</div>
    <div class="weui-panel__bd">
      <div
        v-for="(item,index) in datas"
        :key="index"
        @click="click(item)"
        class="weui-media-box weui-media-box_text"
      >
        <h4 class="weui-media-box__title">
          [{{getStatus(item.purchasing_order_state_id)}}] {{item.department_name||"订货单"}}
          <span
            class="desc"
          >{{item.po_item_count||0}} 项</span>
        </h4>
        <p class="weui-media-box__desc">{{item.purchasing_order_create_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "0",
      status: "0",
      startDate: "2018-11-11",
      endDate: "2018-11-30",
      vendorID: 3,
      datas: []
    };
  },
  methods: {
    selectStartDate() {
      this.$picker.show({
        type: "datePicker",
        date: this.startDate,
        endTime: "3000-09-08",
        startTime: "2000-06-09",
        onOk: date => {
          this.startDate = date;
        }
      });
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "待确认";
        case 2:
          return "否定";
        case 3:
          return "备货中";
        case 4:
          return "已发货";
        case 5:
          return "收货中";
        case 6:
          return "完成";
      }
    },
    selectEndDate() {
      this.$picker.show({
        type: "datePicker",
        date: this.endDate,
        endTime: "3000-09-08",
        startTime: this.startDate,
        onOk: date => {
          this.endDate = date;
        }
      });
    },
    click(item) {
      this.$router.push({
        path: "/quote/order/item",
        query: {
          id: item.po_id,
          status: item.purchasing_order_state_id
        }
      });
    },
    load() {
      this.$GET(
        "PurchasingOrderList/GetPurchasingOrderList4Vendor?vendorID=" +
          this.vendorID
      ).then(r => {
        this.datas = r.data;
      });
    }
  },
  mounted() {
    //this.load();
  }
};
</script>

<style>
.desc {
  float: right;
}
</style>
