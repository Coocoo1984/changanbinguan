<template>
  <div class="weui-cells">
    <a
      @click="click(item)"
      v-for="(item,index) in datas"
      :key="index"
      class="weui-cell weui-cell_access"
      href="javascript:;"
    >
      <div class="weui-cell__bd">
        <p>部门：{{item.title}}</p>
        <p class="code">{{item.code}}</p>
      </div>
      <div class="weui-cell__ft">
        <div v-html="item.slot"></div>
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
.code {
  font-size: 12px;
  color: #555555;
}
</style>
