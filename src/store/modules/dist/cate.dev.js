"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = require("../../util/request.js");

var state = {
  //菜单列表
  list: []
};
var mutations = {
  //修改list
  changeList: function changeList(state, arr) {
    state.list = arr;
  }
};
var actions = {
  reqListAction: function reqListAction(context) {
    (0, _request.reqCateList)({
      istree: true
    }).then(function (res) {
      context.commit("changeList", res.data.list);
    });
  }
};
var getters = {
  list: function list(state) {
    return state.list;
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