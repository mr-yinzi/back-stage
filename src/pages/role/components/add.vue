<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children:'children',label:'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      width: "100px",
      form: {
        rolename: "",
        status: 1,
        menus: [],
      },
    };
  },
  methods: {
    //点击了取消
    cancel() {
      this.$emit("hide");
    },
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      //重置树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    ...mapActions({
      reqMenuList: "menu/reqListAction",
      reqRoleList: "role/reqListAction",
    }),
    add() {
      // this.$refs.tree.getCheckedKeys() 获取树形控件上的选中的key
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id){
            reqRoleDetail({id:id}).then(res=>{
                this.form=res.data.list;
                this.form.id=id;
                this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
            })
        },
        update(){
             reqRoleUpdate(this.form).then((res) => {
                  this.cancel();
                   this.reqRoleList();
             })
        },
        close(){
            if(!this.info.isAdd){
                this.empty();
            }
        }
  },
  mounted() {
    //如果menuList数组是个空的，要发起请求得到
    if (this.menuList.length == 0) {
      this.reqMenuList();
    }
  },
};
</script>

<style>
</style>