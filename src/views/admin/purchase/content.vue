<template>
  <div>
    <div v-for="(v,k) in datas" :key="k" class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">
        蔬菜项目（{{v.length}}）
        <div>{{department_name}}</div>
      </div>
      <div class="weui-panel__bd">
        <div v-for="(i,index) in v" :key="index" class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">{{i.goods_name}}</h4>
          <p class="weui-media-box__desc">
            数量：{{i.count}}{{i.goods_unit_name}}
            <span
              class="number red"
            >实收：{{i.actual_count}}{{i.goods_unit_name}}</span>
          </p>
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
    status() {
      return this.$route.query.status;
    },
    id() {
      return this.$route.query.id;
    },
    department_name() {
      return this.$route.query.department_name;
    }
  },
  methods: {
    load() {
      this.$GET("PurchasingOrderDetailList?purchasingOrderID=" + this.id).then(
        r => {
          for (var i of r.data) {
            if (!this.datas[i.goods_class_name]) {
              Vue.set(this.datas, i.goods_class_name, []);
            }
            this.datas[i.goods_class_name].push(i);
          }
        }
      );
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style>
.number {
  float: right;
}
</style>
