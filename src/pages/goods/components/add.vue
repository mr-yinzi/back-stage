<template>
  <div class="box">
    <el-dialog
      :title="info.title"
      :visible.sync="info.dialogVisible"
      width="60%"
      @closed="close('form')"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="一级分类" :label-width="width" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstId">
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="width" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="width" v-if="form.pid!=0">
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
        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecId">
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="width">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="width">
          <!-- 富文本编辑器的节点 -->
          <div id="editor" v-if="!info.changeFirstId"></div>
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
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
      },
      //二级分类的列表
      secondCateList: [],
      //规格属性的列表
      attrList: [],
      //图片临时地址
      imgUrl: "",
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
      //获取规格列表
      reqSpecList: "spec/reqListAction",
      //获取商品列表
      reqList: "goods/reqListAction",
      reqTotal: "goods/reqListNum",
    }),
    //重置form数据
    empty() {
      //二级分类的列表
      this.secondCateList = [];
      //规格属性的列表
      this.attrList = [];
      //图片临时地址
      this.imgUrl = "";
      //表单数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    //创建编辑器
    createEditor() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description);
    },
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //取出富文本编辑器的内容，赋值给form的description
          this.form.description = this.editor.txt.html();
          reqgoodsAdd(this.form).then((res) => {
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
      reqgoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(",");
        //计算二级分类的列表
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        //计算属性列表
        this.attrList = this.specList.find(
          (item) => item.id == this.form.specsid
        ).attrs;
      });
    },
    //点击了修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //取出富文本编辑器的内容，赋值给form的description
          this.form.description = this.editor.txt.html();
          reqgoodsUpdate(this.form).then((res) => {
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
    //修改了一级分类
    changeFirstId() {
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      //因为更换了一级分类，二级分类重置
      this.form.second_cateid = "";
    },
    //修改了商品规格
    changeSpecId() {
      //当商品规格变了，就计算一下商品属性要展示的数组列表
      this.attrList = this.specList.find(
        (item) => item.id == this.form.specsid
      ).attrs;
      //选中的商品属性重置
      this.form.specsattr = [];
    },
    changeImg(e) {
      var file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    close(form) {
      this.empty();
      this.$refs[form].resetFields();
    },
  },
  mounted() {
    //如果没有分类就请求
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    this.reqSpecList(true);
  },
};
</script>

<style lang="stylus" scoped>
.box >>> .el-upload {
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