<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">报价详情</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">土豆
            <span class="menmoy">
              <font class="red">￥2.5</font> - <font class="greed">￥3.5</font>
            </span>
          </h4>
          <p class="weui-media-box__desc" style="text-align:right">共 5 家供应商报价</p>
        </div>
      </div>
    </div>
    <cells left-style="" :datas="list"></cells>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "XXX供应商1",
          slot: "￥2.5"
        },

        {
          title: "XXX供应商2",
          slot: "￥3.0"
        },

        {
          title: "XXX供应商3",
          slot: "￥3.5"
        },

        {
          title: "XXX供应商4",
          slot: "￥2.2"
        },

        {
          title: "XXX供应商5",
          slot: "￥2.7"
        }
      ]
    };
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
