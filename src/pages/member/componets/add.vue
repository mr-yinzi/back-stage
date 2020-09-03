<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="手机号" :label-width="width" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberInfo, reqMemberUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "手机号必须为数字值" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      width: "100px",
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "member/reqListAction",
    }),
    cancel() {
      this.info.isShow = false;
    },
    look(id) {
      reqMemberInfo({ uid: id }).then((res) => {
        this.form = res.data.list;
      });
    },
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqMemberUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("修改成功");
              //弹框消失
              this.cancel();
              //刷新角色列表的数据
              this.reqList();
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
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style>
</style>