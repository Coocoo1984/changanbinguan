<template>
    <div>
        <preview static v-bind="previewData"></preview>
        <div class="weui-cells__title">选择供货商</div>
        <div class="weui-cells weui-cells_radio">
            <label class="weui-cell weui-check__label" for="x11">
                <div class="weui-cell__bd">
                    <p>XXXXX</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" value="previewData" v-model="quoteStr" class="weui-check" name="radio1" id="x11">
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="x12">
                <div class="weui-cell__bd">
                    <p>LLLLLL</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" name="radio1" value="previewData2" v-model="quoteStr" class="weui-check" id="x12" checked="checked">
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      quote: {
        previewData: {
          title: "2018-11-1 XXX采购计划",
          datas: []
        },
        previewData2: {
          title: "2018-11-1 XXX采购计划",
          datas: []
        }
      },
      quoteStr: "previewData"
    };
  },
  computed: {
    previewData() {
      console.log(this.quote[this.quoteStr]);
      return this.quote[this.quoteStr];
    }
  },
  mounted() {
    for (var i = 0; i < 5; i++) {
      this.quote.previewData.datas.push({
        title: "商品1",
        content: "1KG  报价：$100 已验收"
      });
      this.quote.previewData2.datas.push({
        title: "商品1",
        content: "1KG  报价：$200 已验收"
      });
    }
  }
};
</script>
