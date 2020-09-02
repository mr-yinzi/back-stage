import {
  reqspecsList,
  reqspecscount
} from "@/util/request.js"
const state = {
  //管理员列表
  list: [],
  //一页的条数
  size: 2,
  //管理员总数
  total: 0,

  //当前访问的页码
  page: 1,
}

const mutations = {
  //修改list
  changeList(state, arr) {
    state.list = arr;
  },
  //修改total
  changeTotal(state, num) {
    state.total = num;
  },
  //修改页面
  changePage(state, page) {
    state.page = page
  }
}

const actions = {
  //请求
  reqListAction(context,bool) {
    //传递一个bool,如果是true,那么就请求全部的规格，如果是false,就请求分页
    let params=bool?{}:{
      page: context.state.page,
      size: context.state.size
    }

    reqspecsList(params).then(res => {
      let arr = res.data.list ? res.data.list : []
      arr.forEach(item=>{
        item.attrs=JSON.parse(item.attrs)
      })
      context.commit("changeList", arr)
    })
  },
  //获取总数的请求
  reqListNum(context) {
    reqspecscount().then(res => {
      context.commit("changeTotal", res.data.list[0].total)
    })
  },
  //修改了page
  changePageAction(context, page) {
    context.commit("changePage", page)
    //重新请求列表数据
    context.dispatch("reqListAction")
  }
}
const getters = {
  list(state) {
    return state.list
  },
  size(state) {
    return state.size
  },
  total(state) {
    return state.total
  },
  page(state) {
    return state.page
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
