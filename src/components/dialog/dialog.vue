 <template>
  <div v-if="show">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd">{{content}}</div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="Cancel">否</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="OK">是</a>
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
    content: {
      type: String,
      required: true
    }
  },
  methods: {
    OK() {
      this.show = false;
      this.$emit("click", "OK");
    },
    Cancel() {
      this.show = false;
      this.$emit("click", "Cancel");
    }
  }
};
</script>
 
 <style>
</style>
 