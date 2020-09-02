"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = require("@/util/request.js");

var state = {
  //管理员列表
  list: [],
  //一页的条数
  size: 2,
  //管理员总数
  total: 0,
  //当前访问的页码
  page: 1
};
var mutations = {
  //修改list
  changeList: function changeList(state, arr) {
    state.list = arr;
  },
  //修改total
  changeTotal: function changeTotal(state, num) {
    state.total = num;
  },
  //修改页面
  changePage: function changePage(state, page) {
    state.page = page;
  }
};
var actions = {
  //请求
  reqListAction: function reqListAction(context, bool) {
    //传递一个bool,如果是true,那么就请求全部的规格，如果是false,就请求分页
    var params = bool ? {} : {
      page: context.state.page,
      size: context.state.size
    };
    (0, _request.reqspecsList)(params).then(function (res) {
      var arr = res.data.list ? res.data.list : [];
      arr.forEach(function (item) {
        item.attrs = JSON.parse(item.attrs);
      });
      context.commit("changeList", arr);
    });
  },
  //获取总数的请求
  reqListNum: function reqListNum(context) {
    (0, _request.reqspecscount)().then(function (res) {
      context.commit("changeTotal", res.data.list[0].total);
    });
  },
  //修改了page
  changePageAction: function changePageAction(context, page) {
    context.commit("changePage", page); //重新请求列表数据

    context.dispatch("reqListAction");
  }
};
var getters = {
  list: function list(state) {
    return state.list;
  },
  size: function size(state) {
    return state.size;
  },
  total: function total(state) {
    return state.total;
  },
  page: function page(state) {
    return state.page;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  namespaced: true
};
exports["default"] = _default;