<template>
  <div v-if="show">
    <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>
    <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
      <div class="weui-actionsheet__title">
        <p class="weui-actionsheet__title-text">{{title}}</p>
      </div>
      <div class="weui-actionsheet__menu">
        <div class="weui-actionsheet__cell" @click="event(item)" v-for="(item,index) in munes" :key="index">{{item.name}}</div>
      </div>
      <div class="weui-actionsheet__action">
        <div class="weui-actionsheet__cell" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    munes: {
      type: Array,
      required: true
    }
  },
  methods: {
    event(item) {
      this.$emit("mune-click", item);
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
    }
  }
};
</script>

<style>
</style>
