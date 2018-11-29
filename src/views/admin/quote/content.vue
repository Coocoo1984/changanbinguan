<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">报价详情</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">
            {{goodName}}
            <span class="menmoy">
              <font class="red">￥{{min}}</font> -
              <font class="greed">￥{{max}}</font>
            </span>
          </h4>
          <p class="weui-media-box__desc" style="text-align:right">共 {{count}} 家供应商报价</p>
        </div>
      </div>
    </div>
    <cells left-style :datas="list"></cells>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    goodsId() {
      return this.$route.query.id;
    },
    min() {
      return this.$route.query.min;
    },
    max() {
      return this.$route.query.max;
    },
    goodName() {
      return this.$route.query.name;
    },
    count() {
      return this.$route.query.count;
    }
  },
  methods: {
    load() {
      this.$GET("GoodsQuoteDetailVendorList?goodsid=" + this.goodsId).then(
        r => {
          this.list = r.data.map(i => {
            return {
              title: i.vendor_name,
              slot: "￥" + i.pre_unit_price
            };
          });
        }
      );
    }
  },
  activated() {
    this.load();
  }
};
</script>

<style>
.menmoy {
  float: right;
}
.menmoy font {
  font-size: 14px;
  color: #000;
  font-family: "黑体";
}
</style>
