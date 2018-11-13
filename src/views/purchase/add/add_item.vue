<template>
    <div>
        <div class="weui-cells__title">添加采购项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="type">
                        <option value="1">食材</option>
                        <option value="2">办公用品</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购项：</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="name" type="text" pattern="[0-9]*" placeholder="请输入采购项">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">数量：</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="number" type="number" pattern="[0-9]*" placeholder="数量">
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: "1",
      name: "",
      number: 0
    };
  },
  methods: {
    submit() {
      this.$store.commit("pushAddData", {
        type: this.type,
        name: this.name,
        value: this.number,
        unit: "KG"
      });
      this.$router.go(-1);
    }
  }
};
</script>

