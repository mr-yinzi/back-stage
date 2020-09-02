import axios from "axios"
import qs from "qs"
import store from "../store"
import router from "../router"
import {warningAlert} from "./alert"
let baseUrl = "/api";

//请求拦截
axios.interceptors.request.use(config=>{
  //登录
  if(config.url==baseUrl+"/api/userlogin"){
    return config;
  }

  config.headers.authorization=store.state.user.info.token;
  return config;
})

//响应拦截
axios.interceptors.response.use(res => {
  console.log(store);
  console.group("====本次请求的地址是：" + res.config.url + "======");
  console.log(res);
  console.groupEnd()

  // if(res.config.url=="/api/api/specslist"){
  //   res.data.msg="登录已过期或访问权限受限"
  // }

  if(res.data.msg==="登录已过期或访问权限受限"){
    warningAlert("登录已过期或访问权限受限")
    //清空info
    store.dispatch("user/changeInfoAction",{})
    //跳转到登录 
    router.push("/login")
  }
  return res;
})

//菜单添加
export const reqAddMenu = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}

//菜单列表
export const reqMenuList = (params) => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: params
  })
}

//菜单详情
export const reqMenuDetail = (params) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: params
  })
}

//菜单修改
export const reqMenuUpdate = (form) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//菜单删除 params={id:1}
export const reqMenuDel = (params) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data:qs.stringify(params)
  })
}

//角色添加
export const reqRoleAdd=(form)=>{
  return axios({
    url:baseUrl +"/api/roleadd",
    method:"post",
    data:qs.stringify(form)
  })
}

//角色列表
export const reqRoleList = (params) => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get",
    params: params
  })
}

//角色详情
export const reqRoleDetail = (params) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: params
  })
}

//角色修改
export const reqRoleUpdate = (form) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//角色删除 params={id:1}
export const reqRoleDel = (params) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data:qs.stringify(params)
  })
}

//管理员添加
export const reqUserAdd=(form)=>{
  return axios({
    url:baseUrl +"/api/useradd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 管理员总数
export const reqUserCont=(params)=>{
  return axios({
    url:baseUrl +"/api/usercount",
    method:"get",
    params:params
  })
}
// 管理员列表
export const reqUserList = (params) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: params
  })
}
// 管理员获取
export const reqUserInfo =(params)=>{
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: params
  })
}
// 管理员修改
export const reqUserUpdate =(form)=>{
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(form)
  })
}
//管理员删除 params={id:1}
export const reqUserDel = (params) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data:qs.stringify(params)
  })
}
// 管理员登录
export const reqUserLogin =(form)=>{
  return axios({
    url:baseUrl + "/api/userlogin",
    method:"post",
    data:qs.stringify(form)
  })
}


// 会员列表
export const reqMemberList = (params) => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get",
    params: params
  })
}

// 会员获取
export const reqMemberInfo =(params)=>{
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: params
  })
}
// 会员修改
export const reqMemberUpdate =(form)=>{
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(form)
  })
}

// --------------------------商品分类-----------------------------
//分类添加
export const reqCateAdd = (form) => {
  //{z:1,a:2,v:4,d:file}
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}

//分类列表
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params
  })
}

//分类详情
export const reqCateDetail = (params) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: params
  })
}

//分类修改
export const reqCateUpdate = (form) => {
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}

//分类删除 params={id:1}
export const reqCateDel = (params) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data:qs.stringify(params)
  })
}
/*----------------------分类结束----------------------------------*/
// --------------------------商品规格-----------------------------
//规格添加
export const reqspecsAdd = (form) => {
 
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(form)
  })
}
//规格总数
export const reqspecscount = (params) => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get",
    params
  })
}

//规格列表
export const reqspecsList = (params) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params:params
  })
}

//规格详情
export const reqspecsDetail = (params) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: params
  })
}

//规格修改
export const reqspecsUpdate = (form) => {
  
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//规格删除 params={id:1}
export const reqspecsDel = (params) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data:qs.stringify(params)
  })
}
/*----------------------商品规格结束----------------------------------*/
// --------------------------轮播图分类-----------------------------
//轮播图添加
export const reqbannerAdd = (form) => {
  //{z:1,a:2,v:4,d:file}
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  })
}

//轮播图列表
export const reqbannerList = (params) => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get",
    params
  })
}

//轮播图详情
export const reqbannerDetail = (params) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: params
  })
}

//轮播图修改
export const reqbannerUpdate = (form) => {
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  })
}

//轮播图删除 params={id:1}
export const reqbannerDel = (params) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data:qs.stringify(params)
  })
}
/*----------------------轮播图结束----------------------------------*/
// --------------------------活动分类-----------------------------
//活动添加
export const reqseckAdd = (form) => {
  return axios({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: qs.stringify(form)
  })
}

//活动列表
export const reqseckList = (params) => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get",
    params
  })
}

//活动详情
export const reqseckDetail = (params) => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: params
  })
}

//活动修改
export const reqseckUpdate = (form) => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//活动删除 params={id:1}
export const reqseckDel = (params) => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data:qs.stringify(params)
  })
}
/*----------------------轮播图结束----------------------------------*/
// --------------------------商品管理-----------------------------
//分类添加
export const reqgoodsAdd = (form) => {
  //{z:1,a:2,v:4,d:file}
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 商品总数
export const reqgoodsNum = (params) => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get",
    params
  })
}
//分类列表
export const reqgoodsList = (params) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params
  })
}

//分类详情
export const reqgoodsDetail = (params) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: params
  })
}

//分类修改
export const reqgoodsUpdate = (form) => {
  var data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}

//分类删除 params={id:1}
export const reqgoodsDel = (params) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data:qs.stringify(params)
  })
}
/*----------------------分类结束----------------------------------*/