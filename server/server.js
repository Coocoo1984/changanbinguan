const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
var request = require("request");
const bodyParser = require("body-parser");
const depts = require("./depts.json");
const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");
const app = express();

app.use(express.static("../dist/client"));
app.use(cookieParser());
app.use(bodyParser.json());
const root = path.resolve(__dirname);
const dist = path.resolve(root, "../", "dist");

const template = fs.readFileSync(
  path.resolve(root, "./index-template.html"),
  "utf-8"
);
const clientManifest = require(path.resolve(
  dist,
  "client",
  "vue-ssr-client-manifest.json"
));
const serverBunlder = require(path.resolve(
  dist,
  "server",
  "vue-ssr-server-bundle.json"
));
var access_token = "";
function get_access_token(callback) {
  request.get(
    "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww3589f3907e9ad0e5&corpsecret=lOV7xbGrbLKK7k1YgoHln50LSvlIi4Icy3zSH9nrjMQ",
    (e, r, b) => {
      access_token = JSON.parse(b).access_token;
      if (callback) callback();
    }
  );
}
function getWeiXinBody(url, callback) {
  try {
    if (access_token == "") {
      get_access_token(() => {
        request.get(url + "&access_token=" + access_token, callback);
      });
    } else {
      request.get(url + "&access_token=" + access_token, (e, r, b) => {
        var result = JSON.parse(b);
        if (result.errcode == 40001 || result.errcode == 42001) {
          access_token = "";
          getWeiXinBody(url, callback);
        } else {
          callback(e, r, b);
        }
      });
    }
  } catch (e) {
    console.log(e);
    var err = { errcode: 159, errmsg: e };
    callback(e, null, JSON.stringify(err));
  }
}
function postWeiXinBody(url, params, callback) {
  try {
    if (!access_token) {
      get_access_token(() => {
        request.post(
          url + "?access_token=" + access_token,
          {
            body: params
          },
          callback
        );
      });
    } else {
      request.post(
        url + "?access_token=" + access_token,
        {
          body: params
        },
        (e, r, b) => {
          var result = JSON.parse(b);
          if (result.errcode == 40001 || result.errcode == 42001) {
            access_token = "";
            getWeiXinBody(url, params, callback);
          } else {
            callback(e, r, b);
          }
        }
      );
    }
  } catch (e) {
    var err = { errcode: 159, errmsg: e };
    callback(e, null, JSON.stringify(err));
  }
}
app.get("/weixin/*", (req, res) => {
  getWeiXinBody(
    "https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""),
    (e, r, b) => {
      res.send(b);
    }
  );
});
app.post("/weixin/*", (req, res) => {
  postWeiXinBody(
    "https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""),
    JSON.stringify(req.body),
    (error, response, body) => {
      res.send(body);
    }
  );
});
app.get("/wx_login", (req, res) => {
  var url = encodeURIComponent("http://changan.91ytt.com/wx_auth");
  res.redirect(
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww3589f3907e9ad0e5&redirect_uri=" +
    url +
    "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
  );
});
app.get("/wx_auth", (req, res) => {
  if (req.query.code) {
    getWeiXinBody(
      "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?code=" +
      req.query.code,
      (e, r, b) => {
        var result = JSON.parse(b);
        if (result.errcode != 0) {
          res.send(result.errmsg);
          return;
        }
        getWeiXinBody(
          "https://qyapi.weixin.qq.com/cgi-bin/user/get?userid=" +
          result.UserId,
          (err, _res, body) => {
            var dept_result = JSON.parse(body);
            if (dept_result.errcode != 0) {
              res.send(dept_result.errmsg);
              return;
            }
            var dept_id = [];
            var dept_name = [];
            var user_type = [];
            var user_name = "";
            for (var i in depts) {
              var _temp = depts[i];
              var _temp_id = dept_result.department.filter(
                d => d == _temp.id
              )[0];
              if (_temp_id) {
                dept_name.push(_temp.name);
                dept_id.push(_temp_id);
                user_name = _temp.name;
                switch (_temp.parentid) {
                  case 2:
                    user_type.push("purchase_center");
                    break;
                  case 5:
                    user_type.push("vendor");
                    break;
                  case 8:
                    user_type.push("department");
                    break;
                }
              }
            }
            res.redirect(
              "/login?userID=" +
              result.UserId +
              "&deptID=" +
              dept_id.join(",") +
              "&userName=" +
              user_name +
              "&deptName=" +
              dept_name.join(",") +
              "&userType=" +
              user_type.join(",")
            );
          }
        );
      }
    );
  } else {
    res.send("登陆失败，认证未通过");
  }
});
app.options("*",(req,res)=>{
  res.sendStatus(204);
})
app.get("*.txt", (req, res) => {
  res.send("AO9QrssgBt1gs08q");
});
app.get("*", (req, res) => {
  const renderer = createBundleRenderer(serverBunlder, {
    template,
    clientManifest: clientManifest,
    basedir: root,
    runInNewContext: false
  });
  const context = {
    url: req.url,
    title: "BeLab",
    cookies: req.cookies
  };
  renderer
    .renderToString(context)
    .then(html => {
      res.send(html);
    })
    .catch(err => {
      res.send(err);
    });
});
app.listen(4000);
app.listen(80);
