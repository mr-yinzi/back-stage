<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.dialogVisible" width="60%" @closed="close('form')">
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="标题" :label-width="width" prop="name">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqbannerAdd,
  reqbannerDetail,
  reqbannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
      },
      imgUrl: "",
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
    };
    list: [];
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqListAction",
    }),
    //重置form数据
    empty() {
      this.form = {
        pid: 0,
        bannername: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    add(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
             reqbannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
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
    //查看一条数据
    look(id) {
      reqbannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
      });
    },
    //点击了修改
    update(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
            reqbannerUpdate(this.form).then((res) => {
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
    changeImg(e) {
      var file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    close(form) {
      if (!this.info.isAdd) {
        this.empty();
      }
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