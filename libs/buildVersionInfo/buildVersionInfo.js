"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
exports.__esModule = true;
exports.buildVersionInfo = void 0;
var exec = require("child_process").exec;
var dayjs = require("dayjs");
function command(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, { cwd: __dirname }, function (err, stdout, stderr) {
      if (err || stderr) {
        reject(err || stderr);
        return;
      }
      resolve(stdout.split("\n").join(""));
    });
  });
}
function buildVersionInfo(_a) {
  var name = _a.name,
    version = _a.version,
    args = __rest(_a, ["name", "version"]);
  return new Promise(function (resolve, reject) {
    Promise.all([
      command("git log -1 --pretty=%H\\;%h\\;%cd --date=iso HEAD"),
      command("git rev-parse --abbrev-ref HEAD"),
      command("git rev-list --count HEAD"),
    ]).then(function (_a) {
      var _b;
      var hashes = _a[0],
        branch = _a[1],
        build = _a[2];
      var _c = hashes.replace(/\\/gi, "").split(";"),
        hash = _c[0],
        datetime = _c[2];
      var date = dayjs(datetime).format("YYYY-MM-DD HH:mm:ss ZZ");
      resolve(
        ((_b = {}),
        (_b[name] = __assign(__assign({ version: version }, args), {
          git: {
            date: date,
            build: build,
            hash: hash,
            branch: branch,
          },
        })),
        _b)
      );
    }, reject);
  });
}
exports.buildVersionInfo = buildVersionInfo;
