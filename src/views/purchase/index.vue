<template>
  <div style="padding:5px">
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text box">
            <h4 class="weui-media-box__title title">{{unComplate}}</h4>
            <p class="weui-media-box__desc desc">未确认计划</p>
          </div>
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text box">
            <h4 class="weui-media-box__title title">{{complate}}</h4>
            <p class="weui-media-box__desc desc">采购成功</p>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">管理</div>
      <div class="weui-panel__bd">
        <div class="weui-grids">
          <grid-item name="新建采购" @click="toAdd"></grid-item>
          <grid-item name="采购单" @click="toList"></grid-item>
          <grid-item name="收货单" @click="toReceipt"></grid-item>
          <grid-item name="采购统计" @click="toStatistics"></grid-item>
          <grid-item name="报表下载" @click="toStatisticsDownload"></grid-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unComplate: 0,
      complate: 0
    };
  },
  methods: {
    toAdd() {
      this.$router.push("/purchase/add");
    },
    toList() {
      this.$router.push("/purchase/list");
    },
    toReceipt() {
      this.$router.push("/purchase/receipt");
    },
    toStatistics() {
      this.$router.push({
        path: "/purchase/statistics",
        query: {
          style: 1
        }
      });
    },
    toStatisticsDownload() {
      this.$router.push({
        path: "/purchase/statistics",
        query: {
          style: 2
        }
      });
    }
  },
  mounted() {
    this.$GET("PurchasingPlanCount4Dept", {}).then(r => {
      this.unComplate = r.data[0].count;
      this.complate = r.data[1].count;
    });
  }
};
</script>
<style scoped>
.box {
  padding: 20px 30px;
}
.title {
  font-size: 22px;
  font-weight: bold;
  font-family: "Microsoft YaHei";
}
.desc {
  font-size: 17px;
  color: black;
}
</style>



