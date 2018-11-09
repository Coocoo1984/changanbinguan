<template>
    <div>
        <w-form ref="form" @change="change" form-title="添加采购信息" :form-items="formItems"></w-form>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="addItems">新增项目</a>
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确定</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formItems: [
        {
          type: "1",
          name: "apple",
          default: 100,
          placeholder: "输入数量",
          unit: "公斤"
        }
      ]
    };
  },
  methods: {
    change(datas) {},
    submit() {
      console.log(this.$refs["form"].formDatas);
    },
    addItems() {
      this.formItems.push({
        type: "0",
        name: "apple",
        default: 50,
        placeholder: "输入数量",
        unit: "公斤"
      });
    }
  }
};
</script>