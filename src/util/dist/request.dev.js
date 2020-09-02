"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqgoodsDel = exports.reqgoodsUpdate = exports.reqgoodsDetail = exports.reqgoodsList = exports.reqgoodsNum = exports.reqgoodsAdd = exports.reqseckDel = exports.reqseckUpdate = exports.reqseckDetail = exports.reqseckList = exports.reqseckAdd = exports.reqbannerDel = exports.reqbannerUpdate = exports.reqbannerDetail = exports.reqbannerList = exports.reqbannerAdd = exports.reqspecsDel = exports.reqspecsUpdate = exports.reqspecsDetail = exports.reqspecsList = exports.reqspecscount = exports.reqspecsAdd = exports.reqCateDel = exports.reqCateUpdate = exports.reqCateDetail = exports.reqCateList = exports.reqCateAdd = exports.reqMemberUpdate = exports.reqMemberInfo = exports.reqMemberList = exports.reqUserLogin = exports.reqUserDel = exports.reqUserUpdate = exports.reqUserInfo = exports.reqUserList = exports.reqUserCont = exports.reqUserAdd = exports.reqRoleDel = exports.reqRoleUpdate = exports.reqRoleDetail = exports.reqRoleList = exports.reqRoleAdd = exports.reqMenuDel = exports.reqMenuUpdate = exports.reqMenuDetail = exports.reqMenuList = exports.reqAddMenu = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _store = _interopRequireDefault(require("../store"));

var _router = _interopRequireDefault(require("../router"));

var _alert = require("./alert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api"; //请求拦截

_axios["default"].interceptors.request.use(function (config) {
  //登录
  if (config.url == baseUrl + "/api/userlogin") {
    return config;
  }

  config.headers.authorization = _store["default"].state.user.info.token;
  return config;
}); //响应拦截


_axios["default"].interceptors.response.use(function (res) {
  console.log(_store["default"]);
  console.group("====本次请求的地址是：" + res.config.url + "======");
  console.log(res);
  console.groupEnd(); // if(res.config.url=="/api/api/specslist"){
  //   res.data.msg="登录已过期或访问权限受限"
  // }

  if (res.data.msg === "登录已过期或访问权限受限") {
    (0, _alert.warningAlert)("登录已过期或访问权限受限"); //清空info

    _store["default"].dispatch("user/changeInfoAction", {}); //跳转到登录 


    _router["default"].push("/login");
  }

  return res;
}); //菜单添加


var reqAddMenu = function reqAddMenu(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //菜单列表


exports.reqAddMenu = reqAddMenu;

var reqMenuList = function reqMenuList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: params
  });
}; //菜单详情


exports.reqMenuList = reqMenuList;

var reqMenuDetail = function reqMenuDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: params
  });
}; //菜单修改


exports.reqMenuDetail = reqMenuDetail;

var reqMenuUpdate = function reqMenuUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //菜单删除 params={id:1}


exports.reqMenuUpdate = reqMenuUpdate;

var reqMenuDel = function reqMenuDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
}; //角色添加


exports.reqMenuDel = reqMenuDel;

var reqRoleAdd = function reqRoleAdd(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //角色列表


exports.reqRoleAdd = reqRoleAdd;

var reqRoleList = function reqRoleList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/rolelist",
    method: "get",
    params: params
  });
}; //角色详情


exports.reqRoleList = reqRoleList;

var reqRoleDetail = function reqRoleDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: params
  });
}; //角色修改


exports.reqRoleDetail = reqRoleDetail;

var reqRoleUpdate = function reqRoleUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //角色删除 params={id:1}


exports.reqRoleUpdate = reqRoleUpdate;

var reqRoleDel = function reqRoleDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
}; //管理员添加


exports.reqRoleDel = reqRoleDel;

var reqUserAdd = function reqUserAdd(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; // 管理员总数


exports.reqUserAdd = reqUserAdd;

var reqUserCont = function reqUserCont(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/usercount",
    method: "get",
    params: params
  });
}; // 管理员列表


exports.reqUserCont = reqUserCont;

var reqUserList = function reqUserList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: params
  });
}; // 管理员获取


exports.reqUserList = reqUserList;

var reqUserInfo = function reqUserInfo(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: params
  });
}; // 管理员修改


exports.reqUserInfo = reqUserInfo;

var reqUserUpdate = function reqUserUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //管理员删除 params={id:1}


exports.reqUserUpdate = reqUserUpdate;

var reqUserDel = function reqUserDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
}; // 管理员登录


exports.reqUserDel = reqUserDel;

var reqUserLogin = function reqUserLogin(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; // 会员列表


exports.reqUserLogin = reqUserLogin;

var reqMemberList = function reqMemberList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/memberlist",
    method: "get",
    params: params
  });
}; // 会员获取


exports.reqMemberList = reqMemberList;

var reqMemberInfo = function reqMemberInfo(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: params
  });
}; // 会员修改


exports.reqMemberInfo = reqMemberInfo;

var reqMemberUpdate = function reqMemberUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; // --------------------------商品分类-----------------------------
//分类添加


exports.reqMemberUpdate = reqMemberUpdate;

var reqCateAdd = function reqCateAdd(form) {
  //{z:1,a:2,v:4,d:file}
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  });
}; //分类列表


exports.reqCateAdd = reqCateAdd;

var reqCateList = function reqCateList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: params
  });
}; //分类详情


exports.reqCateList = reqCateList;

var reqCateDetail = function reqCateDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: params
  });
}; //分类修改


exports.reqCateDetail = reqCateDetail;

var reqCateUpdate = function reqCateUpdate(form) {
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  });
}; //分类删除 params={id:1}


exports.reqCateUpdate = reqCateUpdate;

var reqCateDel = function reqCateDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
};
/*----------------------分类结束----------------------------------*/
// --------------------------商品规格-----------------------------
//规格添加


exports.reqCateDel = reqCateDel;

var reqspecsAdd = function reqspecsAdd(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //规格总数


exports.reqspecsAdd = reqspecsAdd;

var reqspecscount = function reqspecscount(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specscount",
    method: "get",
    params: params
  });
}; //规格列表


exports.reqspecscount = reqspecscount;

var reqspecsList = function reqspecsList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: params
  });
}; //规格详情


exports.reqspecsList = reqspecsList;

var reqspecsDetail = function reqspecsDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: params
  });
}; //规格修改


exports.reqspecsDetail = reqspecsDetail;

var reqspecsUpdate = function reqspecsUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //规格删除 params={id:1}


exports.reqspecsUpdate = reqspecsUpdate;

var reqspecsDel = function reqspecsDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
};
/*----------------------商品规格结束----------------------------------*/
// --------------------------轮播图分类-----------------------------
//轮播图添加


exports.reqspecsDel = reqspecsDel;

var reqbannerAdd = function reqbannerAdd(form) {
  //{z:1,a:2,v:4,d:file}
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  });
}; //轮播图列表


exports.reqbannerAdd = reqbannerAdd;

var reqbannerList = function reqbannerList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/bannerlist",
    method: "get",
    params: params
  });
}; //轮播图详情


exports.reqbannerList = reqbannerList;

var reqbannerDetail = function reqbannerDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: params
  });
}; //轮播图修改


exports.reqbannerDetail = reqbannerDetail;

var reqbannerUpdate = function reqbannerUpdate(form) {
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  });
}; //轮播图删除 params={id:1}


exports.reqbannerUpdate = reqbannerUpdate;

var reqbannerDel = function reqbannerDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
};
/*----------------------轮播图结束----------------------------------*/
// --------------------------活动分类-----------------------------
//活动添加


exports.reqbannerDel = reqbannerDel;

var reqseckAdd = function reqseckAdd(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //活动列表


exports.reqseckAdd = reqseckAdd;

var reqseckList = function reqseckList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/secklist",
    method: "get",
    params: params
  });
}; //活动详情


exports.reqseckList = reqseckList;

var reqseckDetail = function reqseckDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: params
  });
}; //活动修改


exports.reqseckDetail = reqseckDetail;

var reqseckUpdate = function reqseckUpdate(form) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: _qs["default"].stringify(form)
  });
}; //活动删除 params={id:1}


exports.reqseckUpdate = reqseckUpdate;

var reqseckDel = function reqseckDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
};
/*----------------------轮播图结束----------------------------------*/
// --------------------------商品管理-----------------------------
//分类添加


exports.reqseckDel = reqseckDel;

var reqgoodsAdd = function reqgoodsAdd(form) {
  //{z:1,a:2,v:4,d:file}
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  });
}; // 商品总数


exports.reqgoodsAdd = reqgoodsAdd;

var reqgoodsNum = function reqgoodsNum(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/goodscount",
    method: "get",
    params: params
  });
}; //分类列表


exports.reqgoodsNum = reqgoodsNum;

var reqgoodsList = function reqgoodsList(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: params
  });
}; //分类详情


exports.reqgoodsList = reqgoodsList;

var reqgoodsDetail = function reqgoodsDetail(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: params
  });
}; //分类修改


exports.reqgoodsDetail = reqgoodsDetail;

var reqgoodsUpdate = function reqgoodsUpdate(form) {
  var data = new FormData();

  for (var i in form) {
    data.append(i, form[i]);
  }

  return (0, _axios["default"])({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  });
}; //分类删除 params={id:1}


exports.reqgoodsUpdate = reqgoodsUpdate;

var reqgoodsDel = function reqgoodsDel(params) {
  return (0, _axios["default"])({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: _qs["default"].stringify(params)
  });
};
/*----------------------分类结束----------------------------------*/


exports.reqgoodsDel = reqgoodsDel;