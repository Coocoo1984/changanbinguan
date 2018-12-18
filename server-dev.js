const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
var request = require("request");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
// 热加载
const webpack = require("webpack");
const devMiddle = require("webpack-dev-middleware");
const hotMiddle = require("webpack-hot-middleware");
const client = require("./webpack.client");
const depts = require("./depts.json");
client.entry.webpack = "webpack-hot-middleware/client?noInfo=true&reload=true";
client.plugins.push(new webpack.HotModuleReplacementPlugin());
const complier = {
  client: webpack(client),
  server: webpack(require("./webpack.server"))
};
const middles = {
  dev: {
    client: devMiddle(complier.client, {
      publicPath: client.output.publicPath
    }),
    server: devMiddle(complier.server, {
      publicPath: client.output.publicPath
    })
  },
  hot: {
    client: hotMiddle(complier.client, {
      publicPath: client.output.publicPath
    }),
    server: hotMiddle(complier.server)
  }
};
app.use(middles.dev.client, middles.hot.client);
app.use(middles.dev.server);
app.use(bodyParser.json());
// 热加载END
app.use(cookieParser());
const { createBundleRenderer } = require("vue-server-renderer");
const template = fs.readFileSync(
  path.resolve(__dirname, "./src/index-template.html"),
  "utf-8"
);
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
    callback(e, null, "{'errcode':159,'errmsg':'" + e + "'}");
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
    callback(e, null, "{'errcode':159,'errmsg':'" + e + "'}");
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
            var dept_id = 0;
            var dept_name = "";
            var user_type = "";
            var user_name = "";
            for (var i in depts) {
              var _temp = depts[i];
              var _temp_id = dept_result.department.filter(
                d => d == _temp.id
              )[0];
              if (_temp_id) {
                dept_name = _temp.name;
                dept_id = _temp_id;
                user_name = _temp.name;
                switch (_temp.parentid) {
                  case 2:
                    user_type = "purchase_center";
                    break;
                  case 5:
                    user_type = "vendor";
                    break;
                  case 8:
                    user_type = "department";
                    break;
                }
              }
            }
            res.redirect(
              "/login?userID=" +
                result.UserId +
                "&deptID=" +
                dept_id +
                "&userName=" +
                user_name +
                "&deptName=" +
                dept_name +
                "&userType=" +
                user_type
            );
          }
        );
      }
    );
  } else {
    res.send("登陆失败，认证未通过");
  }
});
app.get("WW_verify_AO9QrssgBt1gs08q.txt", (req, res) => {
  res.send("AO9QrssgBt1gs08q");
});
app.get("*", (req, res) => {
  const clientManifest = complier.client.outputFileSystem.readFileSync(
    path.resolve(__dirname, "dist", "client", "vue-ssr-client-manifest.json")
  );
  const serverBunlder = complier.server.outputFileSystem.readFileSync(
    path.resolve(__dirname, "dist", "server", "vue-ssr-server-bundle.json")
  );
  const renderer = createBundleRenderer(JSON.parse(serverBunlder), {
    template,
    clientManifest: JSON.parse(clientManifest),
    basedir: path.resolve(__dirname, "dist"),
    // recommended for performance
    runInNewContext: false
  });
  const context = {
    url: req.url,
    title: "Vue",
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

app.listen(8080);
app.listen(8888);
