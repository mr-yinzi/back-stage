"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

require("./assets/css/reset.css");

var _components = _interopRequireDefault(require("./components"));

var _filters = _interopRequireDefault(require("./filters"));

var _store = _interopRequireDefault(require("./store"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//1.reset.css
//2.处理公共组件
for (var i in _components["default"]) {
  _vue["default"].component(i, _components["default"][i]);
} // 3.处理过滤器


for (var _i in _filters["default"]) {
  _vue["default"].filter(_i, _filters["default"][_i]);
} //4.处理仓库


_vue["default"].use(_elementUi["default"]);

_vue["default"].prototype.$preImg = "http://localhost:3000";
/* eslint-disable no-new */

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _store["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});