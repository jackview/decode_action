//Thu Nov 21 2024 07:04:26 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("华住会"),
  axios = require("axios"),
  {
    wrapper
  } = require("axios-cookiejar-support"),
  tough = require("tough-cookie"),
  {
    sendNotify
  } = require("./sendNotify"),
  SyncRequest = require("sync-request");
let notifyStr = "";
var userToken = undefined;
(async () => {
  checkVersion("hzh.js", "066f3bcf5daeb59be9840a22a06dc88a");
  const _0x2a2c20 = process.env.hzh_url;
  if (!_0x2a2c20) {
    logAndNotify("请设置 hzh_url");
    return;
  }
  let _0x2e56c4 = _0x2a2c20.split("\n");
  for (let _0x27cb56 = 0; _0x27cb56 < _0x2e56c4.length; _0x27cb56++) {
    const _0xe1ec63 = _0x2e56c4[_0x27cb56],
      _0x702fc4 = _0xe1ec63.match(/miniUuid=(\d+)/);
    if (_0x702fc4) {
      const _0x222f00 = _0x702fc4[1];
      if (_0x222f00) {
        logAndNotify("🧐" + _0x222f00 + "🧐");
      }
    }
    let _0x301e91 = getInstance();
    userToken = undefined;
    userToken = getParameterByName(_0xe1ec63, "sk");
    const _0x213863 = await _0x301e91.get(_0xe1ec63);
    if (_0x213863.status !== 200) {
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 url失效");
      continue;
    }
    let _0xb96a6 = undefined;
    try {
      _0xb96a6 = await _0x301e91.get("https://appgw.huazhu.com/game/sign_header");
    } catch (_0x40958c) {
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 url失效☹ 【" + _0x40958c.message + "】");
      continue;
    }
    if (_0xb96a6.data.code !== 200) {
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 签到信息获取失败");
      continue;
    }
    if (_0xb96a6.data.content.signToday) {
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 今日已签到");
    } else {
      const _0x481e82 = await _0x301e91.get("https://appgw.huazhu.com/game/sign_in?date=" + Math.floor(Date.now() / 1000));
      if (_0x481e82.data.code !== 200) {
        logAndNotify("账号【" + (_0x27cb56 + 1) + "】 签到失败");
        continue;
      }
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 签到成功 获取积分【" + _0x481e82.data.content.point + "】");
    }
    const _0x49d360 = await _0x301e91.get("https://appgw.huazhu.com/game/sign_header");
    if (_0x49d360.data.code !== 200) {
      logAndNotify("账号【" + (_0x27cb56 + 1) + "】 获取积分失败");
      continue;
    }
    logAndNotify("账号【" + (_0x27cb56 + 1) + "】 查询到总积分【" + _0x49d360.data.content.memberPoint + "】");
  }
})().catch(_0xea99b0 => {
  logAndNotify(_0xea99b0);
}).finally(() => {
  sendNotify("华住会", notifyStr);
  $.done();
});
function logAndNotify(_0x35ae57) {
  $.log(_0x35ae57);
  notifyStr += _0x35ae57;
  notifyStr += "\n";
}
function getParameterByName(_0xfefd9d, _0xbd9d05) {
  const _0x36d418 = decodeURIComponent(_0xfefd9d),
    _0x134ba3 = new RegExp("[?&]" + _0xbd9d05 + "=([^&#]*)"),
    _0x188783 = _0x134ba3.exec(_0x36d418);
  return _0x188783 ? _0x188783[1] : null;
}
function getInstance() {
  const _0x121a41 = new tough.CookieJar();
  return wrapper(axios.create({
    jar: _0x121a41,
    withCredentials: true,
    maxRedirects: 5
  }));
}
function Env(_0x54ef68, _0x470971) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x2712c6 {
    constructor(_0x16ec09) {
      this.env = _0x16ec09;
    }
    send(_0x3a0371, _0x16a822 = "GET") {
      _0x3a0371 = "string" == typeof _0x3a0371 ? {
        url: _0x3a0371
      } : _0x3a0371;
      let _0x3eb019 = this.get;
      "POST" === _0x16a822 && (_0x3eb019 = this.post);
      return new Promise((_0x7910d5, _0x483d55) => {
        _0x3eb019.call(this, _0x3a0371, (_0x48673f, _0x4db159, _0x4b7261) => {
          _0x48673f ? _0x483d55(_0x48673f) : _0x7910d5(_0x4db159);
        });
      });
    }
    get(_0xd86ca) {
      return this.send.call(this.env, _0xd86ca);
    }
    post(_0x329d89) {
      return this.send.call(this.env, _0x329d89, "POST");
    }
  }
  return new class {
    constructor(_0x2e2685, _0x7677da) {
      this.name = _0x2e2685;
      this.http = new _0x2712c6(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x7677da);
      this.log("", "🔔" + this.name + ", 开始!");
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
    toObj(_0x326b92, _0x5e77ed = null) {
      try {
        return JSON.parse(_0x326b92);
      } catch {
        return _0x5e77ed;
      }
    }
    toStr(_0x1dc721, _0x213157 = null) {
      try {
        return JSON.stringify(_0x1dc721);
      } catch {
        return _0x213157;
      }
    }
    getjson(_0x201152, _0x4eafe3) {
      let _0x3c743a = _0x4eafe3;
      const _0x267b37 = this.getdata(_0x201152);
      if (_0x267b37) {
        try {
          _0x3c743a = JSON.parse(this.getdata(_0x201152));
        } catch {}
      }
      return _0x3c743a;
    }
    setjson(_0x1afd14, _0xe9586a) {
      try {
        return this.setdata(JSON.stringify(_0x1afd14), _0xe9586a);
      } catch {
        return !1;
      }
    }
    getScript(_0x212587) {
      return new Promise(_0x32d84f => {
        this.get({
          url: _0x212587
        }, (_0x365800, _0x292f00, _0x4181cf) => _0x32d84f(_0x4181cf));
      });
    }
    runScript(_0x2e257e, _0x1e7479) {
      return new Promise(_0x486ad9 => {
        let _0xfa3084 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0xfa3084 = _0xfa3084 ? _0xfa3084.replace(/\n/g, "").trim() : _0xfa3084;
        let _0x3a10ba = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x3a10ba = _0x3a10ba ? 1 * _0x3a10ba : 20;
        _0x3a10ba = _0x1e7479 && _0x1e7479.timeout ? _0x1e7479.timeout : _0x3a10ba;
        const [_0x3e7130, _0x5537ec] = _0xfa3084.split("@"),
          _0x2ef623 = {
            url: "http://" + _0x5537ec + "/v1/scripting/evaluate",
            body: {
              script_text: _0x2e257e,
              mock_type: "cron",
              timeout: _0x3a10ba
            },
            headers: {
              "X-Key": _0x3e7130,
              Accept: "*/*"
            }
          };
        this.post(_0x2ef623, (_0x1aa73e, _0x3cf3b0, _0x799002) => _0x486ad9(_0x799002));
      }).catch(_0x43a25b => this.logErr(_0x43a25b));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x5428bf = this.path.resolve(this.dataFile),
          _0x3e706c = this.path.resolve(process.cwd(), this.dataFile),
          _0x2fc18b = this.fs.existsSync(_0x5428bf),
          _0x56142f = !_0x2fc18b && this.fs.existsSync(_0x3e706c);
        if (!_0x2fc18b && !_0x56142f) {
          return {};
        }
        {
          const _0x4b468c = _0x2fc18b ? _0x5428bf : _0x3e706c;
          try {
            return JSON.parse(this.fs.readFileSync(_0x4b468c));
          } catch (_0x40851b) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0xe0f99 = this.path.resolve(this.dataFile),
          _0x2e9ad4 = this.path.resolve(process.cwd(), this.dataFile),
          _0x3cb726 = this.fs.existsSync(_0xe0f99),
          _0x16975b = !_0x3cb726 && this.fs.existsSync(_0x2e9ad4),
          _0x5a226a = JSON.stringify(this.data);
        _0x3cb726 ? this.fs.writeFileSync(_0xe0f99, _0x5a226a) : _0x16975b ? this.fs.writeFileSync(_0x2e9ad4, _0x5a226a) : this.fs.writeFileSync(_0xe0f99, _0x5a226a);
      }
    }
    lodash_get(_0x4afa30, _0x118b2e, _0x4d8266) {
      const _0x5b3092 = _0x118b2e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x33c9c8 = _0x4afa30;
      for (const _0x355d9c of _0x5b3092) if (_0x33c9c8 = Object(_0x33c9c8)[_0x355d9c], void 0 === _0x33c9c8) {
        return _0x4d8266;
      }
      return _0x33c9c8;
    }
    lodash_set(_0x1305d3, _0x50ae02, _0x3b8d23) {
      return Object(_0x1305d3) !== _0x1305d3 ? _0x1305d3 : (Array.isArray(_0x50ae02) || (_0x50ae02 = _0x50ae02.toString().match(/[^.[\]]+/g) || []), _0x50ae02.slice(0, -1).reduce((_0x59bca6, _0x115462, _0x22d754) => Object(_0x59bca6[_0x115462]) === _0x59bca6[_0x115462] ? _0x59bca6[_0x115462] : _0x59bca6[_0x115462] = Math.abs(_0x50ae02[_0x22d754 + 1]) >> 0 == +_0x50ae02[_0x22d754 + 1] ? [] : {}, _0x1305d3)[_0x50ae02[_0x50ae02.length - 1]] = _0x3b8d23, _0x1305d3);
    }
    getdata(_0x5ee8f0) {
      let _0x29475c = this.getval(_0x5ee8f0);
      if (/^@/.test(_0x5ee8f0)) {
        const [, _0x39b719, _0x13e765] = /^@(.*?)\.(.*?)$/.exec(_0x5ee8f0),
          _0x3056b9 = _0x39b719 ? this.getval(_0x39b719) : "";
        if (_0x3056b9) {
          try {
            const _0x4f9aa6 = JSON.parse(_0x3056b9);
            _0x29475c = _0x4f9aa6 ? this.lodash_get(_0x4f9aa6, _0x13e765, "") : _0x29475c;
          } catch (_0x1c76c0) {
            _0x29475c = "";
          }
        }
      }
      return _0x29475c;
    }
    setdata(_0x1cc136, _0x328966) {
      let _0x539fb3 = !1;
      if (/^@/.test(_0x328966)) {
        const [, _0x549c35, _0x12ace2] = /^@(.*?)\.(.*?)$/.exec(_0x328966),
          _0x4ba69b = this.getval(_0x549c35),
          _0x33070d = _0x549c35 ? "null" === _0x4ba69b ? null : _0x4ba69b || "{}" : "{}";
        try {
          const _0x339e32 = JSON.parse(_0x33070d);
          this.lodash_set(_0x339e32, _0x12ace2, _0x1cc136);
          _0x539fb3 = this.setval(JSON.stringify(_0x339e32), _0x549c35);
        } catch (_0x36e08c) {
          const _0x4ba56b = {};
          this.lodash_set(_0x4ba56b, _0x12ace2, _0x1cc136);
          _0x539fb3 = this.setval(JSON.stringify(_0x4ba56b), _0x549c35);
        }
      } else {
        _0x539fb3 = this.setval(_0x1cc136, _0x328966);
      }
      return _0x539fb3;
    }
    getval(_0x5276a6) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x5276a6) : this.isQuanX() ? $prefs.valueForKey(_0x5276a6) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x5276a6]) : this.data && this.data[_0x5276a6] || null;
    }
    setval(_0x3e82eb, _0x104eb0) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x3e82eb, _0x104eb0) : this.isQuanX() ? $prefs.setValueForKey(_0x3e82eb, _0x104eb0) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x104eb0] = _0x3e82eb, this.writedata(), !0) : this.data && this.data[_0x104eb0] || null;
    }
    initGotEnv(_0x34d7ec) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x34d7ec && (_0x34d7ec.headers = _0x34d7ec.headers ? _0x34d7ec.headers : {}, void 0 === _0x34d7ec.headers.Cookie && void 0 === _0x34d7ec.cookieJar && (_0x34d7ec.cookieJar = this.ckjar));
    }
    get(_0x440ca4, _0x20c78b = () => {}) {
      _0x440ca4.headers && (delete _0x440ca4.headers["Content-Type"], delete _0x440ca4.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x440ca4.headers = _0x440ca4.headers || {}, Object.assign(_0x440ca4.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x440ca4, (_0x1afa1c, _0x510b73, _0x5d62db) => {
        !_0x1afa1c && _0x510b73 && (_0x510b73.body = _0x5d62db, _0x510b73.statusCode = _0x510b73.status);
        _0x20c78b(_0x1afa1c, _0x510b73, _0x5d62db);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x440ca4.opts = _0x440ca4.opts || {}, Object.assign(_0x440ca4.opts, {
        hints: !1
      })), $task.fetch(_0x440ca4).then(_0x4e425e => {
        const {
          statusCode: _0x562c26,
          statusCode: _0x88aac4,
          headers: _0xc2ead4,
          body: _0x4539fc
        } = _0x4e425e;
        _0x20c78b(null, {
          status: _0x562c26,
          statusCode: _0x88aac4,
          headers: _0xc2ead4,
          body: _0x4539fc
        }, _0x4539fc);
      }, _0x41c6b9 => _0x20c78b(_0x41c6b9))) : this.isNode() && (this.initGotEnv(_0x440ca4), this.got(_0x440ca4).on("redirect", (_0x61c663, _0xab133e) => {
        try {
          if (_0x61c663.headers["set-cookie"]) {
            const _0x4b3321 = _0x61c663.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x4b3321 && this.ckjar.setCookieSync(_0x4b3321, null);
            _0xab133e.cookieJar = this.ckjar;
          }
        } catch (_0xd27548) {
          this.logErr(_0xd27548);
        }
      }).then(_0x53b43d => {
        const {
          statusCode: _0x2c7a9b,
          statusCode: _0x32b6f8,
          headers: _0x23e35e,
          body: _0x1483c0
        } = _0x53b43d;
        _0x20c78b(null, {
          status: _0x2c7a9b,
          statusCode: _0x32b6f8,
          headers: _0x23e35e,
          body: _0x1483c0
        }, _0x1483c0);
      }, _0x5d033d => {
        const {
          message: _0x426420,
          response: _0xe7117f
        } = _0x5d033d;
        _0x20c78b(_0x426420, _0xe7117f, _0xe7117f && _0xe7117f.body);
      }));
    }
    post(_0x3e16af, _0x2c74b3 = () => {}) {
      if (_0x3e16af.body && _0x3e16af.headers && !_0x3e16af.headers["Content-Type"] && (_0x3e16af.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x3e16af.headers && delete _0x3e16af.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x3e16af.headers = _0x3e16af.headers || {}, Object.assign(_0x3e16af.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x3e16af, (_0x170037, _0x3fe1ae, _0x3829fe) => {
          !_0x170037 && _0x3fe1ae && (_0x3fe1ae.body = _0x3829fe, _0x3fe1ae.statusCode = _0x3fe1ae.status);
          _0x2c74b3(_0x170037, _0x3fe1ae, _0x3829fe);
        });
      } else {
        if (this.isQuanX()) {
          _0x3e16af.method = "POST";
          this.isNeedRewrite && (_0x3e16af.opts = _0x3e16af.opts || {}, Object.assign(_0x3e16af.opts, {
            hints: !1
          }));
          $task.fetch(_0x3e16af).then(_0x39e77e => {
            const {
              statusCode: _0x1485b4,
              statusCode: _0x4cc2dd,
              headers: _0x406203,
              body: _0x2c6bce
            } = _0x39e77e;
            _0x2c74b3(null, {
              status: _0x1485b4,
              statusCode: _0x4cc2dd,
              headers: _0x406203,
              body: _0x2c6bce
            }, _0x2c6bce);
          }, _0x4160e4 => _0x2c74b3(_0x4160e4));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x3e16af);
            const {
              url: _0x216d31,
              ..._0xff0282
            } = _0x3e16af;
            this.got.post(_0x216d31, _0xff0282).then(_0x3d8402 => {
              const {
                statusCode: _0x28646e,
                statusCode: _0x125e92,
                headers: _0x4f3819,
                body: _0x186343
              } = _0x3d8402;
              _0x2c74b3(null, {
                status: _0x28646e,
                statusCode: _0x125e92,
                headers: _0x4f3819,
                body: _0x186343
              }, _0x186343);
            }, _0x578206 => {
              const {
                message: _0x36280f,
                response: _0x459104
              } = _0x578206;
              _0x2c74b3(_0x36280f, _0x459104, _0x459104 && _0x459104.body);
            });
          }
        }
      }
    }
    time(_0x4f9e9a, _0x4bcd79 = null) {
      const _0x59fd4b = _0x4bcd79 ? new Date(_0x4bcd79) : new Date();
      let _0xb56a1c = {
        "M+": _0x59fd4b.getMonth() + 1,
        "d+": _0x59fd4b.getDate(),
        "H+": _0x59fd4b.getHours(),
        "m+": _0x59fd4b.getMinutes(),
        "s+": _0x59fd4b.getSeconds(),
        "q+": Math.floor((_0x59fd4b.getMonth() + 3) / 3),
        S: _0x59fd4b.getMilliseconds()
      };
      /(y+)/.test(_0x4f9e9a) && (_0x4f9e9a = _0x4f9e9a.replace(RegExp.$1, (_0x59fd4b.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x48c7f4 in _0xb56a1c) new RegExp("(" + _0x48c7f4 + ")").test(_0x4f9e9a) && (_0x4f9e9a = _0x4f9e9a.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xb56a1c[_0x48c7f4] : ("00" + _0xb56a1c[_0x48c7f4]).substr(("" + _0xb56a1c[_0x48c7f4]).length)));
      return _0x4f9e9a;
    }
    msg(_0x379dcb = _0x54ef68, _0x53f8b0 = "", _0x2d1bac = "", _0x31791a) {
      const _0x990cd8 = _0x377412 => {
        if (!_0x377412) {
          return _0x377412;
        }
        if ("string" == typeof _0x377412) {
          return this.isLoon() ? _0x377412 : this.isQuanX() ? {
            "open-url": _0x377412
          } : this.isSurge() ? {
            url: _0x377412
          } : void 0;
        }
        if ("object" == typeof _0x377412) {
          if (this.isLoon()) {
            let _0xe5be46 = _0x377412.openUrl || _0x377412.url || _0x377412["open-url"],
              _0x58c01c = _0x377412.mediaUrl || _0x377412["media-url"];
            return {
              openUrl: _0xe5be46,
              mediaUrl: _0x58c01c
            };
          }
          if (this.isQuanX()) {
            let _0x1b106b = _0x377412["open-url"] || _0x377412.url || _0x377412.openUrl,
              _0x3e1142 = _0x377412["media-url"] || _0x377412.mediaUrl;
            return {
              "open-url": _0x1b106b,
              "media-url": _0x3e1142
            };
          }
          if (this.isSurge()) {
            let _0x4b676e = _0x377412.url || _0x377412.openUrl || _0x377412["open-url"];
            return {
              url: _0x4b676e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x379dcb, _0x53f8b0, _0x2d1bac, _0x990cd8(_0x31791a)) : this.isQuanX() && $notify(_0x379dcb, _0x53f8b0, _0x2d1bac, _0x990cd8(_0x31791a))), !this.isMuteLog) {
        let _0x385718 = ["", "==============📣系统通知📣=============="];
        _0x385718.push(_0x379dcb);
        _0x53f8b0 && _0x385718.push(_0x53f8b0);
        _0x2d1bac && _0x385718.push(_0x2d1bac);
        console.log(_0x385718.join("\n"));
        this.logs = this.logs.concat(_0x385718);
      }
    }
    log(..._0x1ae947) {
      _0x1ae947.length > 0 && (this.logs = [...this.logs, ..._0x1ae947]);
      console.log(_0x1ae947.join(this.logSeparator));
    }
    logErr(_0x303c0c, _0x53fa0f) {
      const _0x234b30 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x234b30 ? this.log("", "❗️" + this.name + ", 错误!", _0x303c0c.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x303c0c);
    }
    wait(_0x548d66) {
      return new Promise(_0x4d0523 => setTimeout(_0x4d0523, _0x548d66));
    }
    done(_0x425615 = {}) {
      const _0x58ecb9 = new Date().getTime(),
        _0x3b722a = (_0x58ecb9 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x3b722a + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x425615);
    }
  }(_0x54ef68, _0x470971);
}
function checkVersion(_0x390ac7, _0x3ea353) {
  try {
    logAndNotify("文件md5：" + _0x3ea353);
    const _0x319bc5 = SyncRequest("GET", "https://checktoke.filegear-sg.me/api/update/check?fileName=" + _0x390ac7 + "&fileMd5=" + _0x3ea353),
      _0x226323 = JSON.parse(_0x319bc5.getBody("utf8"));
    if (_0x226323.code === 301) {
      process.exit(0);
    } else {
      logAndNotify(_0x226323.data);
    }
  } catch (_0x1beb00) {
    logAndNotify("版本检查失败:", _0x1beb00);
  }
}