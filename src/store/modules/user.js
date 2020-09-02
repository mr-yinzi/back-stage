const state = {
    //用户信息
    info: sessionStorage.getItem("info") ? JSON.parse(sessionStorage.getItem("info")) : {}
  }
  const mutations = {
    //修改用户信息
    changeInfo(state, info) {
      state.info = info;
  
      if (info.username) {
        //数据同步到本地存储中
        sessionStorage.setItem("info", JSON.stringify(info))
      } else {
        sessionStorage.removeItem("info")
      }
  
    }
  }
  
  
  const actions = {
    //页面触发的修改用户信息
    changeInfoAction({
      commit
    }, info) {
      commit("changeInfo", info)
    }
  }
  const getters = {
    //导出
    info(state) {
      return state.info
    }
  }
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
  }
  