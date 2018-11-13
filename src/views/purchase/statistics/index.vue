<template>
    <div>
        <div class="weui-cells__title">统计查询项</div>
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
            <div v-if="showUser" class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购部门：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="type">
                        <option value="1">XXXX</option>
                        <option value="2">XXXX1</option>
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
                <div class="weui-cell__hd"><label class="weui-label">时间段：</label></div>
                <div class="weui-cell__bd">
                    <div class="weui-flex">
                        <div class="weui-flex__item">
                            <div class="placeholder"><input class="weui-input" style="width:88%" type="date" value="" placeholder="">到</div>
                        </div>
                        <div class="weui-flex__item">
                            <div class="placeholder"> <input class="weui-input" style="width:88%" type="date" value="" placeholder=""></div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="weui-btn-area">
                <a v-if="btnStyle==1" class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
                <a v-else class="weui-btn weui-btn_primary" @click="download" href="javascript:">下载文件</a>
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
  computed: {
    btnStyle() {
      return this.$route.query.style;
    },
    showUser() {
      return this.$route.query.show;
    }
  },
  methods: {
    submit() {
      this.$router.push("/purchase/statistics/result");
    },
    download() {}
  }
};
</script>

