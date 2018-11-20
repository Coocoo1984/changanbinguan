<template>
  <transition name="fade">
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
  </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(0px);
}
</style>
