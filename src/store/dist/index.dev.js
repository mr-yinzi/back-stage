"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _actions = _interopRequireDefault(require("./actions"));

var _mutations = require("./mutations");

var _menu = _interopRequireDefault(require("./modules/menu"));

var _role = _interopRequireDefault(require("./modules/role"));

var _message = _interopRequireDefault(require("./modules/message"));

var _member = _interopRequireDefault(require("./modules/member"));

var _cate = _interopRequireDefault(require("./modules/cate"));

var _spec = _interopRequireDefault(require("./modules/spec"));

var _banner = _interopRequireDefault(require("./modules/banner"));

var _seck = _interopRequireDefault(require("./modules/seck"));

var _goods = _interopRequireDefault(require("./modules/goods"));

var _user = _interopRequireDefault(require("./modules/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: _mutations.state,
  mutations: _mutations.mutations,
  getters: _mutations.getters,
  actions: _actions["default"],
  modules: {
    menu: _menu["default"],
    role: _role["default"],
    message: _message["default"],
    member: _member["default"],
    cate: _cate["default"],
    spec: _spec["default"],
    banner: _banner["default"],
    seck: _seck["default"],
    goods: _goods["default"],
    user: _user["default"]
  }
});

exports["default"] = _default;