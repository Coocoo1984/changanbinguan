<template>
    <div>
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">
                蔬菜项目（3）
                <div v-if="status>1">XXX供应商</div>
            </div>
            <div class="weui-panel__bd">

                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number red" v-if="status>1">实收：30KG</span>
                    </p>
                </div>
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number green" v-if="status>1">实收：35KG</span>
                    </p>
                </div>
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number green" v-if="status>1">实收：35KG</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">
                蔬菜项目（3）
                <div v-if="status>1">XXX供应商</div>
            </div>
            <div class="weui-panel__bd">

                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number red" v-if="status>1">实收：30KG</span>
                    </p>
                </div>
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number green" v-if="status>1">实收：35KG</span>
                    </p>
                </div>
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">土豆</h4>
                    <p class="weui-media-box__desc">数量：35KG
                        <span class="number green" v-if="status>1">实收：35KG</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    status() {
      return this.$route.query.status;
    }
  }
};
</script>

<style>
.number {
  float: right;
}
</style>
