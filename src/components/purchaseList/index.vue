<template>
    <div class="weui-cells">
            <a @click="click(item)" v-for="(item,index) in datas" :key="index" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>{{item.title}}</p>
                </div>
                <div class="weui-cell__ft">
                    {{item.slot}}
                </div>
            </a>
        </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    click(item) {
      this.$emit("click", item);
    }
  }
};
</script>

<style>
</style>
