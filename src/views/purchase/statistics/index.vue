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
            <option
              v-for="(b,index) in bizType"
              :value="b.biz_type_id"
              :key="index"
            >{{b.biz_type_name}}</option>
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
        <a
          v-if="btnStyle==1"
          class="weui-btn weui-btn_primary"
          @click="submit"
          href="javascript:"
        >确定</a>
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
        "PurchasingOrderGoodsCountStatics?listBizTypeIDs=" +
        this.bType +
        "&listDepartmentIDs=" +
        (this.showUser ? this.dType : this.$store.state.User.deptid) +
        "&StartTime=" +
        this.startDate +
        "&EndTime=" +
        this.endDate;
      var title = "分类,采购项,需求数量,收货数量,单位";
      this.$Local(
        "/wx_jdk?url=" + encodeURIComponent(window.location.href),
        {}
      ).then(r => {
        var m = wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "ww3589f3907e9ad0e5", // 必填，企业微信的corpID
          timestamp: r.data.time_span, // 必填，生成签名的时间戳
          nonceStr: r.data.noncestr, // 必填，生成签名的随机串
          signature: r.data.sign.toLocaleLowerCase(), // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ["previewFile"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });

        wx.ready(() => {
          this.$Local(
            "/file?url=" +
              encodeURI(api.CONFIG.getURL + url) +
              "&title=" +
              title
          ).then(r => {
            wx.previewFile({
              url:
                "http://" +
                window.location.host +
                "/file?url=" +
                encodeURI(api.CONFIG.getURL + url) +
                "&title=" +
                title, // 需要预览文件的地址(必填，可以使用相对路径)
              name: "export.xls", // 需要预览文件的文件名(不填的话取url的最后部分)
              size: r.headers["content-length"] // 需要预览文件的字节大小(必填)
            });
          });
        });
      });
    },
    base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    }
  },
  mounted() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      if (month == 1) {
          this.startDate = (year - 1) + "-" + 11 + "-1";//当前月份1 从去年11月、去年12、今年1月
      }
      else if (month == 2) {
          this.startDate = (year - 1) + "-" + 12 + "-1";//当前月份2 从去年12月、今年1月、今年2月
      }
      else {
          this.startDate = year + "-" + (mouth - 2) + "-1";//当前月份3 从今年3、4、5月;当前月份12 今年10、11、12
      }

      var day = 30;
      if (month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          //大月 31日结束
          day = 31;
      }
      else if (month == 2) {
          day = 28;//闰年1天差别忽略不计
      }
      this.endDate = year + "-" + mouth + "-" + day;
  }
};
</script>

