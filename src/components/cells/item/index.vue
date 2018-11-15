<template>
  <a @click="click" class="weui-cell link" :class="[leftStyle]" href="javascript:;">
    <div class="weui-cell__bd">
      <p>{{title}}</p>
    </div>
    <div class="weui-cell__ft" v-html="html">

    </div>
  </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ""
    },
    leftStyle: {
      type: String
    },
    html: {
      type: String,
      default: ""
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
