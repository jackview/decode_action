//Sat Dec 21 2024 12:25:30 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("丰田bz"),
  fs = require("fs");
let httpResult, httpReq, httpResp;
const ckFile1 = "gqft.txt",
  ckName = "ftbz";
let userCookie = [];
try {
  userCookie = userCookie.concat(fs.readFileSync("./" + ckFile1, "utf-8").split("\n") || []);
  console.log("ck文件[ " + ckFile1 + " ]加载成功");
  this.mxr = true;
} catch (_0x53b362) {
  console.log("未发现本地文件 调用青龙环境变量");
  this.mxr = false;
}
if (this.mxr == false) try {
  userCookie = userCookie.concat((($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "")?.["split"]("\n") || []);
  console.log("环境变量[ " + ckName + " ]加载成功");
} catch (_0x3c8d3a) {}
let userList = [],
  userIdx = 0,
  userCount = 0;
class UserInfo {
  constructor(_0x251eb9) {
    this.index = ++userIdx;
    this.valid = false;
    try {
      this.ck = _0x251eb9;
      this.user = phoneNum("" + this.id);
      this.ckValid = true;
    } catch (_0x283807) {}
  }
  async ["current"]() {
    try {
      let _0x25d03b = "https://xcx.nevapp.gtmc.com.cn/wxapp/nev-prod/bff-nev-wxapp/user/current",
        _0x12210a = "",
        _0x513858 = {
          "Host": "xcx.nevapp.gtmc.com.cn",
          "authorization": "" + this.ck,
          "Content-Type": "application/json"
        },
        _0x39d0c1 = popu(_0x25d03b, _0x513858, _0x12210a);
      await httpRequest("get", _0x39d0c1);
      let _0x2d3de9 = httpResult;
      _0x2d3de9.header.code == 10000000 ? (this.id = _0x2d3de9.body.gtmcUid, await this.queryTaskCenterList()) : $.logAndNotify("账号[" + this.index + "]  未知原因 ");
    } catch (_0xff3288) {
      console.log(_0xff3288);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["queryTaskCenterList"]() {
    try {
      let _0x502a0a = "https://xcx.nevapp.gtmc.com.cn/wxapp/nev-prod/bff-nev-wxapp/point/queryTaskCenterList",
        _0x3be8a6 = "",
        _0x1b18d3 = {
          "Host": "xcx.nevapp.gtmc.com.cn",
          "authorization": "" + this.ck,
          "Content-Type": "application/json"
        },
        _0x4683d0 = popu(_0x502a0a, _0x1b18d3, _0x3be8a6);
      await httpRequest("get", _0x4683d0);
      let _0x28da2e = httpResult;
      if (_0x28da2e.header.code == 10000000) {
        if (_0x28da2e.body[0].taskCenterBoList[0].completionStatus == false) $.logAndNotify("账号[" + this.index + "]   " + _0x28da2e.body[0].taskCenterBoList[0].title), await this.sign();else _0x28da2e.body[0].taskCenterBoList[0].completionStatus == true && $.logAndNotify("账号[" + this.index + "]  " + _0x28da2e.body[0].taskCenterBoList[0].title + "： 已完成");
        let _0x20f0d9 = [1, 2, 3];
        for (let _0x3216dc of _0x20f0d9) {
          if (_0x28da2e.body[0].taskCenterBoList[_0x3216dc].completionStatus == false) {
            let _0x464118 = _0x28da2e.body[0].taskCenterBoList[_0x3216dc].configNumber,
              _0x3e96ab = _0x28da2e.body[0].taskCenterBoList[_0x3216dc].times;
            var _0x901f2c = _0x464118 - _0x3e96ab;
            this.a = _0x28da2e.body[0].taskCenterBoList[_0x3216dc].ruleCode;
            $.logAndNotify("账号[" + this.index + "]  " + _0x28da2e.body[0].taskCenterBoList[_0x3216dc].title + "： " + _0x28da2e.body[0].taskCenterBoList[_0x3216dc].times + "/" + _0x28da2e.body[0].taskCenterBoList[_0x3216dc].configNumber);
            for (var _0x51051b = 0; _0x51051b < _0x901f2c; _0x51051b++) {
              await this.sin();
            }
          } else _0x28da2e.body[0].taskCenterBoList[_0x3216dc].completionStatus == true && $.logAndNotify("账号[" + this.index + "]  " + _0x28da2e.body[0].taskCenterBoList[_0x3216dc].title + "： 已完成");
        }
      }
    } catch (_0x38ab5f) {
      console.log(_0x38ab5f);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["sign"]() {
    try {
      let _0x35dd86 = "https://xcx.nevapp.gtmc.com.cn/wxapp/nev-prod/bff-nev-wxapp/point/grantPoints",
        _0x26da53 = "{\"ruleCode\":\"SIGN_IN\",\"bsId\":\"SIGN_IN:" + this.id + "\"}",
        _0x19bc3d = {
          "Host": "xcx.nevapp.gtmc.com.cn",
          "authorization": "" + this.ck,
          "Content-Type": "application/json"
        },
        _0x22a664 = popu(_0x35dd86, _0x19bc3d, _0x26da53);
      await httpRequest("post", _0x22a664);
      let _0x5906ad = httpResult;
      if (_0x5906ad.body.grantPointsResult == true) $.logAndNotify("账号[" + this.index + "]  获得积分 " + _0x5906ad.body.grantPoints + "：");else _0x5906ad.body.grantPointsResult == false && $.logAndNotify("账号[" + this.index + "]  今日签到 已完成");
    } catch (_0x3c578f) {
      console.log(_0x3c578f);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["sin"]() {
    let _0x3131da = Math.floor(Math.random() * 100000) + 1;
    try {
      let _0x549798 = "https://xcx.nevapp.gtmc.com.cn/wxapp/nev-prod/bff-nev-wxapp/point/grantPoints",
        _0x53a8e1 = "{\"ruleCode\":\"" + this.a + "\",\"bsId\":\"" + this.a + ":" + this.id + ":" + _0x3131da + "\"}",
        _0x1da5e0 = {
          "Host": "xcx.nevapp.gtmc.com.cn",
          "authorization": "" + this.ck,
          "Content-Type": "application/json"
        },
        _0x21fb6d = popu(_0x549798, _0x1da5e0, _0x53a8e1);
      await httpRequest("post", _0x21fb6d);
      let _0x3c7204 = httpResult;
      _0x3c7204.body.grantPointsResult == true && $.logAndNotify("账号[" + this.index + "]  获得积分 " + _0x3c7204.body.grantPoints + "：");
    } catch (_0x508190) {
      console.log(_0x508190);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["info"]() {
    try {
      let _0x1859fe = "https://xcx.nevapp.gtmc.com.cn/wxapp/nev-prod/bff-nev-wxapp/point/queryAccountinfo",
        _0x1d1ffe = "",
        _0x3a3598 = {
          "Host": "xcx.nevapp.gtmc.com.cn",
          "authorization": "" + this.ck,
          "Content-Type": "application/json"
        },
        _0x1bbd55 = popu(_0x1859fe, _0x3a3598, _0x1d1ffe);
      await httpRequest("get", _0x1bbd55);
      let _0x2e52bf = httpResult;
      _0x2e52bf.header.code == 10000000 ? $.logAndNotify("账号[" + this.index + "] 总积分: " + _0x2e52bf.body + " ") : $.logAndNotify("账号[" + this.index + "]  未知原因 ");
    } catch (_0x4d015c) {
      console.log(_0x4d015c);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["wyy"]() {
    try {
      let _0x53d0c1 = "https://v1.jinrishici.com/all",
        _0x1fb241 = "",
        _0x462f00 = {},
        _0x106f0f = popu(_0x53d0c1, _0x462f00, _0x1fb241);
      await httpRequest("get", _0x106f0f);
      let _0x5024cc = httpResult;
      if (_0x5024cc.code == 200) {} else {
        this.content = _0x5024cc.content;
      }
    } catch (_0x18e23c) {
      console.log(_0x18e23c);
    } finally {
      return Promise.resolve(1);
    }
  }
}
!(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    if (!(await checkEnv())) return;
    if (userList.length > 0) {
      console.log("\n-------丰田bz -------\n");
      taskall = [];
      for (let _0x1bd05d of userList) {
        taskall.push(_0x1bd05d.current());
      }
      await Promise.all(taskall);
      taskall = [];
      for (let _0x117e6d of userList) {
        taskall.push(_0x117e6d.info());
      }
      await Promise.all(taskall);
    }
    await $.showmsg();
  }
})().catch(_0x459a64 => console.log(_0x459a64)).finally(() => $.done());
async function GetRewrite() {}
function checkEnv() {
  if (userCookie) {
    for (let _0x9439c7 of userCookie) {
      if (_0x9439c7) userList.push(new UserInfo(_0x9439c7));
    }
    userCount = userList.length;
  } else return console.log("未找到CK"), false;
  return console.log("\n共找到" + userCount + "个账号"), true;
}
function popu(_0x5ae8f8, _0x3c6e92, _0xe09519 = "") {
  let _0x27316e = {
    "url": _0x5ae8f8,
    "headers": _0x3c6e92,
    "timeout": 5000
  };
  return _0xe09519 && (_0x27316e.body = _0xe09519), _0x27316e;
}
async function httpRequest(_0xdfd883, _0x5cbb8e) {
  return httpResult = null, httpReq = null, httpResp = null, new Promise(_0x1ea903 => {
    $.send(_0xdfd883, _0x5cbb8e, async (_0xbb36d6, _0x45241, _0x34dce2) => {
      try {
        httpReq = _0x45241;
        httpResp = _0x34dce2;
        if (_0xbb36d6) {} else {
          if (_0x34dce2.body) {
            if (typeof _0x34dce2.body == "object") httpResult = _0x34dce2.body;else try {
              httpResult = JSON.parse(_0x34dce2.body);
            } catch (_0x5c989d) {
              httpResult = _0x34dce2.body;
            }
          }
        }
      } catch (_0x3443a4) {
        console.log(_0x3443a4);
      } finally {
        _0x1ea903();
      }
    });
  });
}
function Env(a, b) {
  return "undefined" != typeof process && JSON.stringify(process.env).indexOf("xxxxxx") > -1 && process.exit(0), new class {
    constructor(a, b) {
      this.name = a;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, b);
      console.log(`${this.name} 开始运行：
`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    getdata(b) {
      let a = this.getval(b);
      if (/^@/.test(b)) {
        let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b),
          d = c ? this.getval(c) : "";
        if (d) try {
          let e = JSON.parse(d);
          a = e ? this.lodash_get(e, f, "") : a;
        } catch (g) {
          a = "";
        }
      }
      return a;
    }
    setdata(c, d) {
      let a = false;
      if (/^@/.test(d)) {
        let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d),
          f = this.getval(b),
          i = b ? "null" === f ? null : f || "{}" : "{}";
        try {
          let g = JSON.parse(i);
          this.lodash_set(g, e, c);
          a = this.setval(JSON.stringify(g), b);
        } catch (j) {
          let h = {};
          this.lodash_set(h, e, c);
          a = this.setval(JSON.stringify(h), b);
        }
      } else a = this.setval(c, d);
      return a;
    }
    getval(a) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null;
    }
    setval(b, a) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null;
    }
    send(b, a, f = () => {}) {
      if ("get" != b && "post" != b && "put" != b && "delete" != b) {
        console.log(`无效的http方法：${b}`);
        return;
      }
      if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        let c = {
          method: b,
          url: a.url,
          headers: a.headers,
          timeout: a.timeout,
          data: a.body
        };
        "get" == b && delete c.data;
        $axios(c).then(a => {
          let {
            status: b,
            request: c,
            headers: d,
            data: e
          } = a;
          f(null, c, {
            statusCode: b,
            headers: d,
            body: e
          });
        }).catch(a => console.log(a));
      } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, {
        hints: !1
      })), $task.fetch(a).then(a => {
        let {
          statusCode: b,
          request: c,
          headers: d,
          body: e
        } = a;
        f(null, c, {
          statusCode: b,
          headers: d,
          body: e
        });
      }, a => f(a));else if (this.isNode()) {
        this.got = this.got ? this.got : require("got");
        let {
          url: d,
          ...e
        } = a;
        this.instance = this.got.extend({
          followRedirect: !1
        });
        this.instance[b](d, e).then(a => {
          let {
            statusCode: b,
            request: c,
            headers: d,
            body: e
          } = a;
          f(null, c, {
            statusCode: b,
            headers: d,
            body: e
          });
        }, b => {
          let {
            message: c,
            response: a
          } = b;
          f(c, a, a && a.body);
        });
      }
    }
    time(a) {
      let b = {
        "M+": new Date().getMonth() + 1,
        "d+": new Date().getDate(),
        "h+": new Date().getHours(),
        "m+": new Date().getMinutes(),
        "s+": new Date().getSeconds(),
        "q+": Math.floor((new Date().getMonth() + 3) / 3),
        S: new Date().getMilliseconds()
      };
      for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
      return a;
    }
    async showmsg() {
      if (!this.notifyStr) return;
      let a = this.name + " 运行通知\n\n" + this.notifyStr;
      if ($.isNode()) {
        var b = require("./sendNotify");
        console.log("\n============== 推送 ==============");
        await b.sendNotify(this.name, a);
      } else this.msg(a);
    }
    logAndNotify(a) {
      console.log(a);
      this.notifyStr += a;
      this.notifyStr += "\n";
    }
    msg(d = t, a = "", b = "", e) {
      let f = a => {
        if (!a) return a;
        if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? {
          "open-url": a
        } : this.isSurge() ? {
          url: a
        } : void 0;
        if ("object" == typeof a) {
          if (this.isLoon()) {
            let b = a.openUrl || a.url || a["open-url"],
              c = a.mediaUrl || a["media-url"];
            return {
              openUrl: b,
              mediaUrl: c
            };
          }
          if (this.isQuanX()) {
            let d = a["open-url"] || a.url || a.openUrl,
              e = a["media-url"] || a.mediaUrl;
            return {
              "open-url": d,
              "media-url": e
            };
          }
          if (this.isSurge()) return {
            url: a.url || a.openUrl || a["open-url"]
          };
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e)));
      let c = ["", "============== 系统通知 =============="];
      c.push(d);
      a && c.push(a);
      b && c.push(b);
      console.log(c.join("\n"));
    }
    getMin(a, b) {
      return a < b ? a : b;
    }
    getMax(a, b) {
      return a < b ? b : a;
    }
    padStr(e, b, f = "0") {
      let a = String(e),
        g = b > a.length ? b - a.length : 0,
        c = "";
      for (let d = 0; d < g; d++) c += f;
      return c + a;
    }
    json2str(b, e, f = !1) {
      let c = [];
      for (let d of Object.keys(b).sort()) {
        let a = b[d];
        a && f && (a = encodeURIComponent(a));
        c.push(d + "=" + a);
      }
      return c.join(e);
    }
    str2json(e, f = !1) {
      let d = {};
      for (let a of e.split("#")) {
        if (!a) continue;
        let b = a.indexOf("=");
        if (-1 == b) continue;
        let g = a.substr(0, b),
          c = a.substr(b + 1);
        f && (c = decodeURIComponent(c));
        d[g] = c;
      }
      return d;
    }
    randomString(d, a = "abcdef0123456789") {
      let b = "";
      for (let c = 0; c < d; c++) b += a.charAt(Math.floor(Math.random() * a.length));
      return b;
    }
    randomList(a) {
      let b = Math.floor(Math.random() * a.length);
      return a[b];
    }
    wait(a) {
      return new Promise(b => setTimeout(b, a));
    }
    done(a = {}) {
      let b = new Date().getTime(),
        c = (b - this.startTime) / 1000;
      console.log(`
${this.name} 运行结束，共运行了 ${c} 秒！`);
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a);
    }
  }(a, b);
}