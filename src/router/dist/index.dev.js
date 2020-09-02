"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.indexRoutes = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var login = function login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/login/login"));
  });
};

var index = function index() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/index/index"));
  });
};

var home = function home() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/home/home"));
  });
};

var menu = function menu() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/menu/menu"));
  });
};

var role = function role() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/role/role"));
  });
};

var manage = function manage() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/manage/manage"));
  });
};

var classify = function classify() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/classify/classify"));
  });
};

var spec = function spec() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/spec/spec"));
  });
};

var goods = function goods() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/goods/goods"));
  });
};

var banner = function banner() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/banner/banner"));
  });
};

var member = function member() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/member/member"));
  });
};

var seckill = function seckill() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/seckill/seckill"));
  });
}; //路由独享守卫判断


function _beforeEnter(url, next) {
  _store["default"].state.user.info.menus_url.some(function (item) {
    return item == url;
  }) ? next() : next("/");
} //首页下面的二级路由规则


var indexRoutes = [{
  path: "menu",
  component: menu,
  name: "菜单管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/menu", next);
  }
}, {
  path: "role",
  component: role,
  name: "角色管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/role", next);
  }
}, {
  path: "manage",
  component: manage,
  name: "管理员管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/manage", next);
  }
}, {
  path: "classify",
  component: classify,
  name: "商品分类",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/classify", next);
  }
}, {
  path: "spec",
  component: spec,
  name: "商品规格",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/spec", next);
  }
}, {
  path: "goods",
  component: goods,
  name: "商品管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/goods", next);
  }
}, {
  path: "banner",
  component: banner,
  name: "轮播图管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/banner", next);
  }
}, {
  path: "member",
  component: member,
  name: "会员管理",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/member", next);
  }
}, {
  path: "seckill",
  component: seckill,
  name: "秒杀活动",
  beforeEnter: function beforeEnter(to, from, next) {
    _beforeEnter("/seckill", next);
  }
}];
exports.indexRoutes = indexRoutes;
var router = new _vueRouter["default"]({
  routes: [{
    path: "/login",
    component: login
  }, {
    path: "/",
    component: index,
    children: [{
      path: "",
      component: home
    }].concat(indexRoutes)
  }]
}); //登录拦截

router.beforeEach(function (to, from, next) {
  console.log(_store["default"].state.user.info); //如果去登录 next

  if (to.path === "/login") {
    next();
    return;
  } //去的不是登录,判断是否登录，如果登录过了，就next


  if (_store["default"].state.user.info.id) {
    next();
    return;
  } //去的不是登录，也没有登录过


  next("/login");
});
var _default = router;
exports["default"] = _default;