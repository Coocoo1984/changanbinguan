<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        class="weui-navbar__item"
        @click="changeStatus(1)"
        :class="[status==1?'weui-bar__item_on':'']"
      >统计报表</div>
      <div
        class="weui-navbar__item"
        @click="changeStatus(2)"
        :class="[status==2?'weui-bar__item_on':'']"
      >明细报表</div>
      <div
        class="weui-navbar__item"
        @click="changeStatus(3)"
        :class="[status==31?'weui-bar__item_on':'']"
      >供应商报表</div>
    </div>
    <div v-if="status==1" class="weui-tab__panel">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购部门：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="all.dType">
              <option value="0">全部</option>
              <option v-for="(d,index) in depts" :key="index" :value="d.id">{{d.name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">时间段：</label>
          </div>
          <div class="weui-cell__bd">
            <div class="weui-flex">
              <div class="weui-flex__item">
                <div
                  class="placeholder"
                  @click="selectStartDate(all.startDate,all)"
                >{{all.startDate}} 到</div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder" @click="selectEndDate(all.endDate,all)">{{all.endDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <a class="weui-btn weui-btn_primary" @click="downloadAll()" href="javascript:">下载文件</a>
        </div>
      </div>
    </div>
    <div v-if="status==2" class="weui-tab__panel">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购类型：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="info.bType">
              <option
                v-for="(b,index) in bizType"
                :value="b.biz_type_id"
                :key="index"
              >{{b.biz_type_name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购部门：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="info.dType">
              <option value>全部</option>
              <option v-for="(d,index) in depts" :key="index" :value="d.id">{{d.name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购项：</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="infoKey" type="text" placeholder="请输入采购项">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">时间段：</label>
          </div>
          <div class="weui-cell__bd">
            <div class="weui-flex">
              <div class="weui-flex__item">
                <div
                  class="placeholder"
                  @click="selectStartDate(info.startDate,info)"
                >{{info.startDate}} 到</div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder" @click="selectEndDate(info.endDate,info)">{{info.endDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <a class="weui-btn weui-btn_primary" @click="downloadInfo()" href="javascript:">下载文件</a>
        </div>
      </div>
    </div>
    <div v-if="status==3" class="weui-tab__panel">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购类型：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="vendor.bType">
              <option
                v-for="(b,index) in bizType"
                :value="b.biz_type_id"
                :key="index"
              >{{b.biz_type_name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购部门：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="vendor.dType">
              <option value>全部</option>
              <option v-for="(d,index) in depts" :key="index" :value="d.id">{{d.name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">采购项：</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="vendorKey" type="text" placeholder="请输入采购项">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">时间段：</label>
          </div>
          <div class="weui-cell__bd">
            <div class="weui-flex">
              <div class="weui-flex__item">
                <div
                  class="placeholder"
                  @click="selectStartDate(vendor.startDate,vendor)"
                >{{vendor.startDate}} 到</div>
              </div>
              <div class="weui-flex__item">
                <div
                  class="placeholder"
                  @click="selectEndDate(vendor.endDate,vendor)"
                >{{vendor.endDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <a class="weui-btn weui-btn_primary" @click="downloadVendor()" href="javascript:">下载文件</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";

export default {
  data() {
    return {
      status: 1,
      all: { dType: 0, startDate: "", endDate: "", key: "" },
      info: {
        bType: 1,
        dType: "",
        startDate: "",
        endDate: "",
        listGoodsClassIDs: "",
        listGoodsIDs: ""
      },
      infoKey: "",
      vendorKey: "",
      vendor: {
        bType: 1,
        dType: "",
        listGoodsClassIDs: "",
        listGoodsIDs: "",
        startDate: "",
        endDate: ""
      },
      depts: []
    };
  },
  asyncData({ store }) {
    return store.dispatch("loadGoods");
  },
  watch: {
    infoKey(k) {
      var k_reg = new RegExp("[" + k + "]+");
      var goods_ids = this.goods
        .filter(i => k_reg.test(i.goods_name))
        .map(i => i.goods_id);
      var goods_class_ids = this.goods
        .filter(i => k_reg.test(i.goods_class_name))
        .map(i => i.goods_class_id);
      this.info.listGoodsClassIDs = goods_class_ids.join(",");
      this.info.listGoodsIDs = goods_ids.join(",");
    },
    vendorKey(k) {
      var k_reg = new RegExp("[" + k + "]+");
      var goods_ids = this.goods
        .filter(i => k_reg.test(i.goods_name))
        .map(i => i.goods_id);
      var goods_class_ids = this.goods
        .filter(i => k_reg.test(i.goods_class_name))
        .map(i => i.goods_class_id);
      this.vendor.listGoodsClassIDs = goods_class_ids.join(",");
      this.vendor.listGoodsIDs = goods_ids.join(",");
    }
  },
  methods: {
    changeStatus(i) {
      this.status = i;
    },
    downloadAll() {
      var url =
        api.CONFIG.export +
        "PurchasingOrderTotal?departmentID=" +
        this.all.dType +
        "&StartTime" +
        this.all.startDate +
        "&EndTime=" +
        this.all.endDate;
      this.download(url);
    },
    downloadInfo() {
      var url =
        api.CONFIG.export +
        "PurchasingOrderGoodsSubtotal?departmentID=" +
        this.info.dType +
        "&StartTime" +
        this.info.startDate +
        "&listBizTypeIDs=" +
        this.info.bType +
        "&listGoodsClassIDs=" +
        this.info.listGoodsClassIDs +
        "&listGoodsIDs=" +
        this.info.listGoodsIDs +
        "&EndTime=" +
        this.info.endDate;
      this.download(url);
    },
    downloadVendor() {
      var url =
        api.CONFIG.export +
        "PurchasingOrderVendorSubtotal?listDepartmentIDs=" +
        this.vendor.dType +
        "&listGoodsClassIDs=" +
        this.vendor.listGoodsClassIDs +
        "&listGoodsIDs=" +
        this.vendor.listGoodsIDs +
        "&StartTime=" +
        this.vendor.startDate +
        "&EndTime=" +
        this.info.endDate;
      this.download(url);
    },
    download(url) {
      try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      } catch (e) {}
    },
    selectStartDate(d, select) {
      this.$picker.show({
        type: "datePicker",
        date: d,
        endTime: "3000-09-08",
        startTime: "2000-06-09",
        onOk: date => {
          this.select.startDate = date;
        }
      });
    },
    selectEndDate(d, select) {
      this.$picker.show({
        type: "datePicker",
        date: d,
        endTime: "3000-09-08",
        startTime: this.select.startDate,
        onOk: date => {
          this.select.endDate = date;
        }
      });
    }
  },
  computed: {
    bizType() {
      return this.$store.state.Home.bizTypes;
    },
    goods() {
      return this.$store.state.Home.goods;
    }
  },
  mounted() {
    this.$GET("Departments", {}).then(r => {
      this.depts = r.data;
    });
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    var startDate = year + "-" + (mouth - 2) + "-1";
    var endDate = year + "-" + mouth + "-30";
    this.all.startDate = startDate;
    this.all.endDate = endDate;
    this.info.startDate = startDate;
    this.info.endDate = endDate;
    this.vendor.startDate = startDate;
    this.vendor.endDate = endDate;
  }
};
</script>

<style>
</style>
