<template>
  <div>
    <div class="weui-cells__title">统计查询项</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">采购类型：</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="bType">
            <option v-for="(b,index) in bizType" :value="b.biz_type_id" :key="index">{{b.biz_type_name}}</option>
          </select>
        </div>
      </div>
      <div v-if="showUser" class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">采购部门：</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="dType">
            <option value="0">全部</option>
            <option v-for="(d,index) in depts" :key="index" :value="d.id">{{d.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">采购项：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="name" type="text" placeholder="请输入采购项">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">时间段：</label>
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
        <a v-if="btnStyle==1" class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
        <a v-else class="weui-btn weui-btn_primary" @click="download" href="javascript:">下载文件</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";
export default {
  data() {
    return {
      bType: "1",
      dType: "0",
      name: "",
      number: 0,
      startDate: "",
      endDate: "",
      depts: []
    };
  },
  computed: {
    btnStyle() {
      return this.$route.query.style;
    },
    showUser() {
      return this.$route.query.show;
    },
    bizType() {
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
    submit() {
      this.$router.push({
        path: "/purchase/statistics/result",
        query: {
          bType: this.bType,
          dType: this.showUser ? this.dType : this.$store.state.User.deptid,
          start: this.startDate,
          end: this.endDate,
          s: this.name
        }
      });
    },
    download() {
      var url =
        api.CONFIG.getURL +
        "DepartmentExport?StartTime=" +
        this.startDate +
        "&EndTime=" +
        this.endDate;
      var form = document.createElement("form");
      form.action = url;
      document.getElementsByTagName("body")[0].appendChild(form);
      form.submit();
    }
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    this.startDate = year + "-" + (mouth - 2) + "-1";
    this.endDate = year + "-" + mouth + "-30";
    this.$GET("Departments", {}).then(r => {
      this.depts = r.data;
    });
  }
};
</script>

