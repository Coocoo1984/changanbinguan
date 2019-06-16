<template>
  <div>
    <div class="weui-cells__title">筛选项</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">退货日期：</label>
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
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" @click="load">查询筛选</a>
      </div>
    </div>
    <div class="weui-panel__hd">退货列表：</div>
    <div class="weui-panel__bd">
      <div
        v-for="(item,index) in datas"
        :key="index"
        @click="click(item)"
        class="weui-media-box weui-media-box_text"
      >
        <h4 class="weui-media-box__title">
          [{{(item.purchasing_state_name)}}]{{item.department_name}}
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
      type: "1",
      status: "0",
      startDate: "2018-11-11",
      endDate: "2018-11-30",
      datas: []
    };
  },
  computed: {
    bizTypes() {
      return this.$store.state.Home.bizTypes;
    }
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
        path: "/quote/back/" + item.id,
        query: {
          deptID: item.department_id,
          time: item.create_time,
          state: item.purchasing_order_state_id
        }
      });
    },
    getStatus(status) {
      switch (status) {
        case 11:
          return "待审核";
        case 12:
          return "否定";
        case 13:
          return "备货中";
        case 14:
          return "已发货";
        case 15:
          return "收货中";
        case 16:
          return "完成";
      }
    },
    load() {
      this.$loading(true);
      this.$GET(
        "ChargeBackList?venderID=" +
          this.$store.state.User.deptid +
          "&startTime=" +
          this.startDate +
          "&endTime=" +
          this.endDate
      ).then(r => {
        this.datas = r.data;
        this.$loading(false);
      });
    }
  },
  mounted() {
    //this.load();
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    this.startDate = year + "-" + (mouth - 2) + "-1";
    this.endDate = year + "-" + mouth + "-30";
  }
};
</script>

<style>
.desc {
  float: right;
}
</style>
