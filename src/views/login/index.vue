<template>
  <div>{{errmsg}}</div>
</template>

<script>
export default {
  data() {
    return {
      errmsg: ""
    };
  },
  computed: {
    userID() {
      return this.$route.query.userID;
    },
    deptID() {
      return this.$route.query.deptID;
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
  mounted() {
    this.$store.commit("setUser", {
      userid: this.userid,
      username: this.userName,
      deptname: this.deptName,
      deptid: this.deptID,
      userType: this.userType
    });
    var path = "";
    switch (this.userType) {
      case "purchase_center":
        path = "/";
        break;
      case "vendor":
        path = "/quote";
        break;
      case "":
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
};
</script>

<style>
</style>
