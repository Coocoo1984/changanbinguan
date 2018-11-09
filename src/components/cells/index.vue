<template>
  <div class="weui-cells">
    <item v-for="(item,index) in datas" :key="index" :title="item.title" @click="itemClick(item)">
      {{item.slot}}
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
    }
  },
  methods: {
    itemClick(item) {
      this.$emit("item-click", item);
    }
  }
};
</script>
