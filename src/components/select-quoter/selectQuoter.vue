<template>
  <div v-if="show">
    <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>
    <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
      <div class="weui-actionsheet__title">
        <p class="weui-actionsheet__title-text">{{title}}</p>
      </div>
      <div class="weui-actionsheet__menu">
        <label :for="'select'+index" v-for="(item,index) in munes" :key="index">
          <div class="weui-actionsheet__cell quoter-list" style="" @click="event(item)">
            <input type="radio" v-model="value" :value="item.value" name="select" :id="'select'+index" />
            <span>{{item.name}}</span>
            <span class="money">总价：{{item.money}}</span>
          </div>
        </label>
      </div>
      <div class="weui-actionsheet__action">
        <div class="weui-btn-area">
          <a href="javascript:;" @click="click" class="weui-btn weui-btn_primary">确认</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      value: ""
    };
  },
  watch: {
    value(n) {
      this.$emit("input", n);
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    munes: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    event(item) {
      this.$emit("mune-click", item);
    },
    click() {
      this.$emit("ok");
      this.show = false;
    }
  },
  mounted() {
    this.value = this.defaultValue;
  }
};
</script>
<style scoped>
.quoter-list {
  text-align: left;
  padding-left: 20px;
}
.money {
  float: right;
  padding-right: 20px;
}
</style>

<style>
</style>
