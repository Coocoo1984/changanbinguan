<template>
    <a @click="click" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
            <p>{{title}}</p>
        </div>
        <div class="weui-cell__ft">
          <slot></slot>
        </div>
    </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
