const path = require('path')
const express = require('express');
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { createBundleRenderer } = require('vue-server-renderer')
const app = express();

app.use(express.static('../dist/client'))
app.use(cookieParser())
const root = path.resolve(__dirname);
const dist = path.resolve(root, '../', 'dist');

const template = fs.readFileSync(path.resolve(root, "./index-template.html"), 'utf-8');
const clientManifest = require(path.resolve(dist, 'client', "vue-ssr-client-manifest.json"));
const serverBunlder = require(path.resolve(dist, 'server', "vue-ssr-server-bundle.json"));
var access_token = "";
function get_access_token(callback) {
    request.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww3589f3907e9ad0e5&corpsecret=lOV7xbGrbLKK7k1YgoHln50LSvlIi4Icy3zSH9nrjMQ", (e, r, b) => {
        access_token = JSON.parse(b).access_token;
        if (callback)
            callback();
    });
}
function getWeiXinBody(url, callback) {
    if (access_token == "") {
        get_access_token(() => {
            request.get(url + "&access_token=" + access_token, callback)
        })
    } else {
        request.get(url + "&access_token=" + access_token, (e, r, b) => {
            var result = JSON.parse(b);
            if (result.errcode == 40001 || result.errcode == 42001) {
                access_token = "";
                getWeiXinBody(url, callback)
            } else {
                callback(e, r, b);
            }
        })
    }
}
function postWeiXinBody(url, params, callback) {
    if (!access_token) {
        get_access_token(() => {
            request.post(url + "?access_token=" + access_token, {
                body: params
            }, callback)
        })
    } else {
        request.post(url + "?access_token=" + access_token, {
            body: params
        }, (e, r, b) => {
            var result = JSON.parse(b);
            if (result.errcode == 40001 || result.errcode == 42001) {
                access_token = "";
                getWeiXinBody(url, params, callback)
            } else {
                callback(b);
            }
        })
    }
}
app.get("/weixin/*", (req, res) => {
    getWeiXinBody("https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""), (e, r, b) => {
        res.send(b);
    })
});
app.post("/weixin/*", (req, res) => {
    postWeiXinBody("https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""), JSON.stringify(req.body), (error, response, body) => {
        res.send(body);
    })
});
app.get("*", (req, res) => {
    const renderer = createBundleRenderer(serverBunlder, {
        template,
        clientManifest: clientManifest,
        basedir: root,
        runInNewContext: false
    })
    const context = {
        url: req.url,
        title: "BeLab",
        cookies: req.cookies
    }
    renderer.renderToString(context).then(html => {
        res.send(html)
    }).catch(err => {
        res.send(err)
    })
});
app.listen(4000)