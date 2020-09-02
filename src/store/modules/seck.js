import {reqseckList} from "../../util/request.js"
const state = {
  //菜单列表
  list: []
}

const mutations = {
  //修改list
  changeList(state, arr) {
    state.list = arr;
  }
}

const actions ={
  reqListAction(context){
    reqseckList({
      istree:true
    }).then(res=>{
      context.commit("changeList", res.data.list)
    })
  }
}
const getters = {
  list(state) {
    return state.list
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
