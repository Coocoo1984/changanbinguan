<template>
  <div>
    <div class="weui-cells__title">{{formTitle}}</div>
    <div class="weui-cells weui-cells_form">
      <div v-for="(item,index) in formItems" :key="index" class="weui-cell weui-cell_select weui-cell_select-before weui-cell_vcode">
        <div class="weui-cell__hd">
          <select v-if="!item.disabled" class="weui-select" v-model="formDatas[index].type" name="select2">
            <option value="0">选择</option>
            <option value="1">苹果</option>
            <option value="2">荔枝</option>
          </select>
          <select v-else disabled  class="weui-select" v-model="formDatas[index].type" name="select2">
            <option value="0">选择</option>
            <option value="1">商品1</option>
            <option value="2">荔枝</option>
          </select>
        </div>
        <div class="weui-cell__bd">
          <input style="text-align:right;" class="weui-input" v-model="formDatas[index].value" type="number" :placeholder="item.placeholder">
        </div>
        <div class="weui-cell__ft">
          <div class="weui-vcode-btn">{{item.unit}}</div>
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
      formDatas: []
    };
  },
  watch: {
    formDatas: {
      deep: true,
      handler() {
        this.$emit("change", this.formDatas);
      }
    },
    formItems: {
      deep: true,
      handler() {
        this.init();
      }
    }
  },
  props: {
    formTitle: {
      type: String,
      default: "提交数据"
    },
    formItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    init() {
      this.formDatas = [];
      for (var i in this.formItems) {
        var item = this.formItems[i];
        this.formDatas.push({
          value: item.default,
          type: item.type
        });
      }
    }
  },
  created() {
    this.init();
  }
};
</script>