<template>
  <div>
    <div v-for="(v,k) in datas" :key="k" class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">{{k}}（{{v.length}}）</div>
      <div class="weui-panel__bd">
        <div v-for="(item,index) in v" :key="index" class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">
            {{item.goods_name}}
            <span class="menmoy">
              <font class="red">￥</font>
            </span>
          </h4>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">
            番茄
            <span class="menmoy">
              <font>￥2.5</font>
            </span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      datas: {}
    };
  },
  computed: {
    venderID() {
      return this.$route.query.id;
    }
  },
  methods: {
    load() {
      this.$GET("QuoteDetailList4Vendor2Quote?vendorID=" + this.venderID).then(
        r => {
          for (var i of r.data) {
            if (!this.datas[i.goods_class_name])
              Vue.set(this.datas, i.goods_class_name, []);
            this.datas[i.goods_class_name].push(i);
          }
          console.log(this.datas);
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
</style>
