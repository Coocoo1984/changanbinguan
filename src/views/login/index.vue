<template>
  <div>{{errmsg}}</div>
</template>

<script>
export default {
  data() {
    return {
      errmsg: "",
      deptID: "",
      code: ""
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
      return this.$route.query.deptName;
    },
    userType() {
      return this.$route.query.userType;
    }
  },
  methods: {
    goto() {
      this.$store.commit("setUser", {
        userid: this.userid,
        username: this.userName,
        deptname: this.deptName,
        deptid: this.deptID,
        userType: this.userType,
        code: this.code
      });
      var path = "";
      switch (this.userType) {
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
    if (this.userType == "vendor") {
      this.$UPDATE_GET("Vendor/Get?name=" + this.deptName).then(r => {
        this.deptid = r.data.id;
        this.code = r.data.code;
        this.goto();
      });
    } else if (this.userType == "department") {
      this.$UPDATE_GET("Department/GetByName?name=" + this.deptName, {}).then(r => {
        this.deptid = r.data.id;
        this.code = r.data.code;
        this.goto();
      });
    } else {
      this.goto();
    }
  }
};
</script>

<style>
</style>
