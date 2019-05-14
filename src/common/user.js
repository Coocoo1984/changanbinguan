import Api from "./api";
import WeiXin from "./weixin";
export default function(weichat_id) {
  return new Promise((res, err) => {
    var user;
    var c_user;
    WeiXin.GetUser(weichat_id)
      .then(r => {
        user = r.data || {};
      })
      .then(() => {
        return Api.UPDATE_GET("Usr/GetByWechat?wechatid=" + weichat_id, {});
      })
      .then(r => {
        c_user = r.data.data;
        console.log(c_user);
        if (c_user == null) {
          return Api.UPDATE("Usr/Add", {
            WechatID: user.userid,
            code: user.userid,
            Name: user.name,
            Tel: user.mobile,
            Mobile: user.mobile,
            Tel1: user.mobile,
            Mobile1: user.mobile,
            Desc: "",
            Addr: "",
            Addr1: ""
          });
        } else if (
          c_user.name != user.name ||
          c_user.tel != user.mobile ||
          c_user.mobile != user.mobile ||
          c_user.addr != user.addr
        ) {
          return Api.UPDATE("Usr/Update", {
            ID: c_user.id,
            WechatID: user.userid,
            code: user.userid,
            Name: user.name,
            Tel: user.mobile,
            Mobile: user.mobile,
            addr1: user.address
          });
        } else {
          res(c_user);
        }
      })
      .then(r => {
        return Api.UPDATE_GET("Usr/GetByWechat?wechatid=" + user.userid, {});
      })
      .then(r => {
        c_user = r.data.data;
        res(c_user);
      });
  });
}
