<template>
    <div>
        <div class="weui-cells__title">退回理由</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea v-model="text" class="weui-textarea" placeholder="请输入文本" rows="3"></textarea>
                    <div class="weui-textarea-counter"><span>{{text.length}}</span>/200</div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    submit() {
      this.$router.push({
        path: "/adm/purchase"
      });
    }
  }
};
</script>
<style>
</style>
