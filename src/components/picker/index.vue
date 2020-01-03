<template>
  <div v-transfer-dom>
    <popup v-model="showPopup">
      <datetime-range
        :start-date="startTime"
        :end-date="endTime"
        v-model="v"
        @on-change="onChange"
      ></datetime-range>
    </popup>
  </div>
</template>

<script>
import { DatetimeRange, Popup, TransferDom } from "vux";
export default {
  data() {
    return {
      v: "",
      showPopup: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    startTime: {
      type: String,
      default: ""
    },
    endTime: {
      type: String,
      default: ""
    }
  },
  watch: {
    v() {
      this.$emit("input", this.v);
    },
    value() {
      this.v = this.value;
    },
    show() {
      this.showPopup = this.show;
    },
    showPopup() {
      this.$emit("close");
    }
  },
  mounted: {
    onChange() {
      this.$emit("input", this.v);
    }
  },
  mounted() {}
};
</script>

<style>
</style>