"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  //用户信息
  info: sessionStorage.getItem("info") ? JSON.parse(sessionStorage.getItem("info")) : {}
};
var mutations = {
  //修改用户信息
  changeInfo: function changeInfo(state, info) {
    state.info = info;

    if (info.username) {
      //数据同步到本地存储中
      sessionStorage.setItem("info", JSON.stringify(info));
    } else {
      sessionStorage.removeItem("info");
    }
  }
};
var actions = {
  //页面触发的修改用户信息
  changeInfoAction: function changeInfoAction(_ref, info) {
    var commit = _ref.commit;
    commit("changeInfo", info);
  }
};
var getters = {
  //导出
  info: function info(state) {
    return state.info;
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