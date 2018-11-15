<template>
    <div>
        <div class="weui-cells__title">库存列表</div>
        <div class="weui-cell weui-cell_swiped">
            <div class="weui-cell__bd">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <p>商品1</p>
                    </div>
                    <div class="weui-cell__ft" style="margin-right:10px">
                        <input disabled style="text-align:right;" class="weui-input" value="100" type="number">
                    </div>
                    <div class="weui-cell__ft">
                        件
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="add">入库出库</a>
            <a class="weui-btn weui-btn_primary" href="javascript:">导出数据</a>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$router.push("/stock/add");
    }
  }
};
</script>

<style></style>
