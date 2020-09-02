import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import actions from "./actions"
import {state,mutations,getters} from "./mutations"
import menu from "./modules/menu"
import role from "./modules/role"
import message from "./modules/message"
import member from "./modules/member"
import cate from "./modules/cate"
import spec from "./modules/spec"
import banner from "./modules/banner"
import seck from "./modules/seck"
import goods from "./modules/goods"
import user from "./modules/user"

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        message,
        member,
        cate,
        spec,
        banner,
        seck,
        goods,
        user
    }
})