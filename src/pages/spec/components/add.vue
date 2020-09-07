<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.dialogVisible"
      width="60%"
      @closed="close('form')"
    >
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="规格名称" :label-width="width" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item,index) in attrArr"
          :key="index"
          prop="attrs"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type="danger" v-else @click="del(index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="info.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  data() {
    var validateAttrs = (rule, value, callback) => {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      console.log(this.form.attrs);
      if (this.form.attrs === '[""]') {
        callback(new Error("请输入商品规格"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        attrs: [
          {
            required: true,
            validator: validateAttrs,
            trigger: "blur",
          },
        ],
      },
      attrArr: [
        {
          value: "",
        },
      ],
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotal: "spec/reqListNum",
    }),
    //重置form数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    del() {},
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //添加成功
              successAlert(res.data.msg);
              //弹框消失
              this.$emit("hide");
              //数据重置
              this.empty();
              //重新获取list
              this.reqList();
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
    //查看一条数据
    look(id) {
      reqspecsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //点击了修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("更新成功");
              this.$emit("hide");
              this.empty();
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
      this.empty();
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style lang="stylus" scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>