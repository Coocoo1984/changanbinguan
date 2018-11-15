<template>
  <div class="weui-form-preview">
    <div class="weui-form-preview__hd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">{{title}}
        </label>
        <span v-if="status" class="">{{status}}</span>
        <button v-if="btnText" @click="btnHandler" class="weui-btn weui-btn_mini" :class="[btnGray?'gray':'weui-btn_primary']" style="right:0px;">{{btnText}}</button>
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
  methods: {
    btnHandler() {
      this.$emit("handler");
    }
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
    btnText: {
      type: String,
      default: ""
    },
    btnGray: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: ""
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
.categroy {
  font-weight: bold;
}
.gray {
  background-color: gray;
  color: #000;
  border: none;
}
</style>


