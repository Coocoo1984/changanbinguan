<template>
  <div v-if="deptName.length>1" class="weui-msg">
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">选择登陆身份</h2>
      <p class="weui-msg__desc">您有多个操作权限，请选择登陆那个角色</p>
    </div>
    <div class="weui-btn-area">
      <a
        v-if="center"
        href="javascript:;"
        @click="click('purchase_center','purchase_center')"
        class="weui-btn weui-btn_primary"
      >采购中心</a>
      <a
        href="javascript:;"
        @click="click(d,userType[index])"
        class="weui-btn weui-btn_primary"
        v-if="userType[index]!='purchase_center'"
        v-for="(d,index) in deptName"
        :key="d"
      >{{d}}</a>
    </div>
  </div>
</template>

<script>
import WeiXin from "@/common/weixin";

export default {
  data() {
    return {
      errmsg: "",
      deptID: "",
      code: "",
      user: {},
      c_user: {}
    };
  },
  computed: {
    userID() {
      return this.$route.query.userID;
    },
    userName() {
      return this.$route.query.userName;
    },
    deptName() {
      if (!this.$route.query.deptName) return [];
      return this.$route.query.deptName.split(",");
    },
    userType() {
      return this.$route.query.userType.split(",");
    },
    center() {
      return (
        this.$route.query.userType
          .split(",")
          .filter(u => u == "purchase_center").length > 0
      );
    }
  },
  methods: {
    getUser() {
      return WeiXin.GetUser(this.userID)
        .then(r => {
          this.user = r.data || {};
        })
        .then(() => {
          return this.$UPDATE_GET(
            "Usr/GetByWechat?wechatid=" + this.user.userid,
            {}
          );
        })
        .then(r => {
          console.log(r);
          this.c_user = r.data.data;
          if (this.c_user == null) {
            return this.$UPDATE("Usr/Add", {
              WechatID: this.user.userid,
              code: this.user.userid,
              Name: this.user.name,
              Tel: this.user.mobile,
              Mobile: this.user.mobile,
              Tel1: this.user.mobile,
              Mobile1: this.user.mobile,
              Desc: "",
              Addr: "",
              Addr1: ""
            });
          } else if (
            this.c_user.name != this.user.name ||
            this.c_user.tel != this.user.mobile ||
            this.c_user.mobile != this.user.mobile ||
            this.c_user.addr != this.user.addr
          ) {
            return this.$UPDATE("Usr/Update", {
              ID: this.c_user.id,
              WechatID: this.user.userid,
              code: this.user.userid,
              Name: this.user.name,
              Tel: this.user.mobile,
              Mobile: this.user.mobile,
              address: this.user.mobile
            });
          }
          return null;
        })
        .then(r => {
          return this.$UPDATE_GET(
            "Usr/GetByWechat?wechatid=" + this.user.userid,
            {}
          );
        })
        .then(r => {
          this.c_user = r.data.data;
        });
    },
    getDept(name) {
      return this.$UPDATE_GET("Department/GetByName?name=" + name)
        .then(r => {
          if (r.data.data && r.data.data.id) {
            return r.data;
          } else {
            return false;
          }
        })
        .then(l => {
          if (l) return l;
          return this.$UPDATE("Department/Add", {
            WechatID: this.userID,
            Code: this.userID,
            Name: name,
            Tel: this.user.mobile
          }).then(r => {
            return this.$UPDATE_GET("Department/GetByName?name=" + name);
          });
        })
        .then(r => {
          this.deptID = r.data.id;
          this.code = r.data.code;
        });
    },
    getVendor(name) {
      return this.$UPDATE_GET("Vendor/Get?name=" + name)
        .then(r => {
          if (r.data.data && r.data.data.id) {
            return r.data;
          } else {
            return false;
          }
        })
        .then(l => {
          if (l) return l;
          return this.$UPDATE("Vendor/Add", {
            GoodsClassIDs: [],
            Code: this.userID,
            Name: name,
            Tel: this.user.mobile
          }).then(r => {
            return this.$UPDATE_GET("Vendor/Get?name=" + name);
          });
        })
        .then(r => {
          this.deptID = r.data.id;
          this.code = r.data.code;
        });
    },
    click(name, type) {
      if (type == "vendor") {
        this.getVendor(name).then(r => {
          this.goto(name, type);
        });
      } else if (type == "department") {
        this.getDept(name).then(r => {
          this.goto(name, type);
        });
      } else if (type == "purchase_center") {
        this.goto(name, type);
      }
    },
    goto(name, type) {
      this.$store.commit("setUser", {
        userid: this.c_user.id,
        username: this.userName,
        deptname: name,
        deptid: this.deptID,
        userType: type,
        code: this.code,
        weichatID: this.userID
      });
      var path = "";
      switch (type) {
        case "purchase_center":
          path = "/";
          break;
        case "vendor":
          path = "/quote";
          break;
        case "department":
          path = "/purchase";
          break;
        default:
          path = "";
      }
      if (path) {
        this.$router.push(path);
      } else {
        this.errmsg = "错误的用户类型";
      }
    }
  },
  mounted() {
    window.userID = this.userID;
    this.getUser().then(r => {
      if (this.userType.length == 1 && this.deptName.length == 1) {
        this.click(this.deptName[0], this.userType[0]);
      }
    });
  }
};
</script>

<style>
.weui-msg {
  padding-top: 36px;
  text-align: center;
}
.weui-msg__text-area {
  margin-bottom: 25px;
  padding: 0 20px;
}
.weui-msg__title {
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 20px;
}
.weui-msg__desc {
  font-size: 14px;
  color: #808080;
}
</style>
