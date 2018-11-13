<template>
  <div class="weui-cells">
    <item :html="item.slot" v-for="(item,index) in datas" :left-style="leftStyle" :key="index" :title="item.title" :desc="item.desc" @click="itemClick(item,index)">

    </item>
  </div>
</template>

<script>
import Item from "./item";
export default {
  components: {
    Item
  },
  props: {
    datas: {
      type: Array,
      required: true
    },
    leftStyle: {
      type: String,
      default: "weui-cell_access"
    }
  },
  methods: {
    itemClick(item, index) {
      this.$emit("item-click", item, index);
    }
  }
};
</script>
<style>
.weui-cells a.link {
  text-decoration: none;
  color: #999999;
}
</style>

