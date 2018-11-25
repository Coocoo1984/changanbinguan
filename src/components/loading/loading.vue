<template>
    <div v-if="show">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
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
    }
  }
};
</script>
<style>
</style>
