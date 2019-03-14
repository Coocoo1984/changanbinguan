<template>
  <div v-if="show">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-icon_toast" :class="[cls]"></i>
      <p class="weui-toast__content">{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "数据加载中"
    },
    cls: {
      type: String,
      default: "weui-loading" //weui-icon-success-no-circle
    }
  }
};
</script>
<style>
.weui-icon-warn {
  color: #ffffff;
  font-size: 46px;
}
</style>
