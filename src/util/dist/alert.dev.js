"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warningAlert = exports.successAlert = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var vm = new _vue["default"](); //成功弹框

var successAlert = function successAlert(msg) {
  vm.$message({
    message: msg,
    type: 'success'
  });
}; //警告弹框


exports.successAlert = successAlert;

var warningAlert = function warningAlert(msg) {
  vm.$message({
    message: msg,
    type: 'warning'
  });
};

exports.warningAlert = warningAlert;