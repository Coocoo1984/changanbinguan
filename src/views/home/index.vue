<template>
  <div style="padding:5px">
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text box">
            <h4 class="weui-media-box__title title">
              <span>初审</span>
              {{trial}}
              <span>复审</span>
              {{review}}
            </h4>
            <p class="weui-media-box__desc desc">待审计划</p>
          </div>
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text box">
            <h4 class="weui-media-box__title title">{{complete}}</h4>
            <p class="weui-media-box__desc desc">已完成计划</p>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">采购管理</div>
    <div class="weui-grids">
      <grid-item name="初审采购" @click="toPurchase(1)" icon="ios-pricetags"></grid-item>
      <grid-item name="报价管理" @click="toQuote" icon="ios-locate "></grid-item>
      <grid-item name="复审采购" @click="toPurchase(2)" icon="ios-paper "></grid-item>
      <grid-item name="采购进度" @click="toPurchaseList()" icon="ios-play "></grid-item>
      <grid-item name="统计查询" @click="toStatistics(1)" icon="ios-podium "></grid-item>
      <grid-item name="报表下载" @click="toStatistics(2)" icon="ios-cloud-download "></grid-item>
    </div>
    <div class="weui-cells__title">基础设置</div>
    <div class="weui-grids">
      <grid-item name="采购类目" @click="toManager('commodity/category')" icon="ios-list-box"></grid-item>
      <grid-item name="采购项目" @click="toManager('commodity')" icon="ios-folder"></grid-item>
      <grid-item name="供应商" @click="toManager('quote')" icon="ios-people"></grid-item>
      <grid-item name="采购部" @click="toManager('purchase')" icon="ios-business "></grid-item>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    trial() {
      return this.$store.state.Home.trial;
    },
    review() {
      return this.$store.state.Home.review;
    },
    complete() {
      return this.$store.state.Home.complete;
    }
  },
  asyncData({ store }) {
    return store.dispatch("loadHomeCount");
  },
  methods: {
    toPurchase(status, type) {
      this.$router.push({
        path: "/adm/purchase",
        query: {
          status: status,
          type: type
        }
      });
    },
    toPurchaseList() {
      this.$router.push({
        path: "/adm/purchase/list"
      });
    },
    toQuote() {
      this.$router.push("/adm/quote");
    },
    toStatistics(style) {
      this.$router.push({
        path: "/manager/statistics",
        query: {}
      });
    },
    toManager(item) {
      this.$router.push({
        path: "/manager/" + item
      });
    }
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
.title span {
  font-size: 12px;
  font-weight: normal;
}
.desc {
  font-size: 17px;
  color: black;
}
</style>



