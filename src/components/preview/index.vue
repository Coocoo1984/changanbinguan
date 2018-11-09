<template>
  <div class="weui-form-preview">
    <div class="weui-form-preview__hd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">{{title}}</label>
        <em class="weui-form-preview__value">{{status}}</em>
      </div>
    </div>
    <transition name="fade">
      <div class="weui-form-preview__bd">
        <div v-if="static||showContent" class="weui-form-preview__item" v-for="(item,index) in datas">
          <label class="weui-form-preview__label">{{item.title}}</label>
          <span class="weui-form-preview__value">{{item.content}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    };
  },
  mounted() {
    this.showContent = this.show;
  },
  props: {
    static: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "进行中"
    },
    datas: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}
</style>


