<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        @click="showTab=1"
        class="weui-navbar__item"
        :class="[showTab==1?'weui-bar__item_on':'']"
      >分类列表</div>
      <div
        @click="showTab=2"
        class="weui-navbar__item"
        :class="[showTab==2?'weui-bar__item_on':'']"
      >添加分类</div>
    </div>
    <div v-if="showTab==1" class="weui-tab__panel">
      <div class="weui-cells">
        <div v-for="(item,index) in list" :key="index" class="weui-cell">
          <div @click="update(item)" class="weui-cell__bd">
            <p>{{item.name}}</p>
          </div>
          <div class="weui-cell__ft">
            <a
              class="weui-swiped-btn weui-swiped-btn_warn"
              @click="del(item.id)"
              style="color:#fff"
              href="javascript:"
            >删除</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="weui-tab__panel">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">选择主要分类</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="bid">
              <option
                v-for="b in bizTypes"
                :key="b.biz_type_id"
                :value="b.biz_type_id"
              >{{b.biz_type_name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">分类名称</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="addInput.name" type="text" placeholder="请输入分类名称">
          </div>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTab: 1,
      addInput: {
        id: 0,
        name: ""
      },
      list: [],
      bid: 1
    };
  },
  computed: {
    bizTypes() {
      return this.$store.state.Home.bizTypes;
    }
  },
  methods: {
    submit() {
      if (!this.addInput.name) {
        this.$warn(true, "分类名不能为空");
        return;
      }
      var params = {
        name: this.addInput.name,
        desc: "",
        code: "001",
        BizTypeID: this.bid,
        id: this.addInput.id
      };
      var api = "";
      if (this.addInput.id == 0) {
        api = "add";
      } else {
        api = "update";
      }
      this.$loading(true, "数据提交中");
      this.$UPDATE("GoodsClass/" + api, params).then(r => {
        this.load();
        this.addInput = {
          name: "",
          id: 0
        };
        this.showTab = 1;
        this.$loading(false);
      });
    },
    update(item) {
      this.addInput = item;
      this.showTab = 2;
    },
    del(id) {
      this.$dialog("是否删除分类", "删除的数据不可恢复", () => {
        this.$UPDATE("GoodsClass/Disable", { ID: id }).then(r => {
          var _list = [];
          for (var i of this.list) {
            if (i.id == id) continue;
            _list.push(i);
          }
          this.list = _list;
        });
      });
    },
    load() {
      this.$GET("GoodsClasses", {}).then(r => {
        this.list = r.data;
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style>
</style>
