<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title" style="font-size:14px">XXX 部门采购单
            <span class="count">17个项目</span>
          </h4>
          <p class="weui-media-box__desc">201828112312</p>
        </div>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="weui-btn-area">
              <a class="weui-btn weui-btn_primary" href="javascript:">{{status==1?'复审确认':'初审通过'}}</a>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="weui-btn-area">
              <a class="weui-btn weui-btn_warn" href="javascript:" @click="GoBack">退回</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <preview static title="采购单项目（17）：食品" @handler="SelectQuoter(1)" :btnGray="btnGray" :btnText="btnText" :datas="previewDatas"></preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnText: "",
      btnGray: true,
      previewDatas: [
        {
          title: "XX",
          content: "数量：11KG"
        },
        {
          title: "XX",
          content: "数量：11KG"
        },
        {
          title: "XX",
          content: "数量：11KG"
        },
        {
          title: "XX",
          content: "数量：11KG"
        },
        {
          title: "XX",
          content: "数量：11KG"
        }
      ],
      select: ""
    };
  },
  methods: {
    GoBack() {
      this.$router.push({
        path: "/adm/purchase/back",
        query: {
          id: 1
        }
      });
    },
    SelectQuoter(id) {
      console.log(this.select);
      this.$selectQuoter(
        "选择供货商",
        [
          {
            name: "XXX供货商1",
            value: "1",
            money: "￥123"
          },
          {
            name: "XXX供货商2",
            value: "2",
            money: "￥123"
          },
          {
            name: "XXX供货商3",
            value: "3",
            money: "￥123"
          },
          {
            name: "XXX供货商4",
            value: "4",
            money: "￥123"
          },
          {
            name: "XXX供货商5",
            value: "5",
            money: "￥123"
          }
        ],
        this.select,
        item => {
          this.select = item;
        },
        () => {
          this.btnGray = false;
        }
      );
    }
  },
  computed: {
    status() {
      return this.$route.query.status;
    }
  },
  mounted() {
    if (this.status == 1) this.btnText = "确认供货商";
  }
};
</script>

<style>
.weui-media-box__title span.count {
  float: right;
}
</style>
