<template>
    <div>
        <div class="weui-cells__title">XXX采购计划</div>
        <div class="weui-cell weui-cell_swiped">
            <div class="weui-cell__bd">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <p>商品1</p>
                    </div>
                    <div class="weui-cell__ft">
                        <input style="text-align:right;" class="weui-input" value="100" type="number">
                    </div>
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
  methods: {
    submit() {}
  }
};
</script>

<style></style>
