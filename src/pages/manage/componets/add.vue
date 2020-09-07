<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="所属角色" :label-width="width" prop="roleid">
          <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add('form')">添 加</el-button>
        <el-button type="primary" v-else @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUserAdd, reqUserUpdate, reqUserInfo } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
      width: "100px",
      form: {
        roleid: null,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/reqListAction",
      reqUserList: "message/reqListAction",
      reqTotal: "message/reqListNum",
    }),
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        roleid: null,
        username: "",
        password: "",
        status: 1,
      };
    },
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqUserAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.empty();
              this.info.isShow = false;
              this.reqUserList();
              this.reqTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //查看详情
    look(id) {
      reqUserInfo({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqUserUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("修改成功");
              //弹框消失
              this.cancel();
              //数据重置
              this.empty();
              //刷新角色列表的数据
              this.reqUserList();
              this.reqTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    close(form) {
      this.empty();
       this.$refs[form].resetFields();
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqRoleList();
    }
    console.log(this.list);
  },
};
</script>

<style>
</style>