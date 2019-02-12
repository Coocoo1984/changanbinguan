<template>
  <a @click="click()" href="javascript:;" class="weui-grid">
    <span
      v-if="message"
      class="weui-badge"
      :class="[message===true?'weui-badge_dot':'']"
      style="position: absolute;top: .4em;right: .4em;"
    >{{message===true?"":message}}</span>
    <div class="weui-grid__icon">
      <i class="icon iconfont" :class="[iconName]"></i>
    </div>
    <p class="weui-grid__label">{{name}}</p>
  </a>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ""
    },
    message: {
      type: [Number, Boolean, String],
      default: false
    }
  },
  computed: {
    iconName() {
      return "icon-" + this.icon;
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
<style>
.icon {
  color: #2f7dcd;
  font-size: 24px;
}
</style>



