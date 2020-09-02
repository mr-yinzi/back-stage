<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.dialogVisible" width="60%" @closed="close">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width">
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
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecondId">
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in threeList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="info.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqseckAdd,
  reqseckDetail,
  reqspecsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      timeValue: [],
      //二级分类的列表
      secondCateList: [],
      //商品分类的列表
      threeList: [],
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: null,
        second_cateid: null,
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
      reqGoodsList: "goods/reqListAction",
      reqseckList: "seck/reqListAction",
    }),
    //修改了一级分类
    changeFirstId() {
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      //因为更换了一级分类，二级分类重置
      this.form.second_cateid = "";
    },
    changeSecondId() {
      this.threeList = [];
      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].second_cateid == this.form.second_cateid) {
          this.threeList.push(this.goodsList[i]);
        }
        //因为更换了二级分类，商品重置
        this.form.goodsid = "";
      }
    },
    //重置form数据
    empty() {
      this.timeValue = [];
      //二级分类的列表
      this.secondCateList = [];
      //商品分类的列表
      this.threeList = [];
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: null,
        second_cateid: null,
        goodsid: "",
        status: 1,
      };
    },

    del() {},
    add() {
      this.form.begintime = this.timeValue[0];
      this.form.endtime = this.timeValue[1];
      reqseckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqseckList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(id) {
      reqseckDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.timeValue = [];
        this.timeValue[0] = this.form.begintime;
        this.timeValue[1] = this.form.endtime;
        //计算二级分类的列表
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        //计算商品列表
        for (let i = 0; i < this.goodsList.length; i++) {
          if (this.goodsList[i].second_cateid == this.form.second_cateid) {
            this.threeList.push(this.goodsList[i]);
          }
        }
      });
    },
    //点击了修改
    update() {
      this.form.begintime = this.timeValue[0];
      this.form.endtime = this.timeValue[1];
      reqspecsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.$emit("hide");
          this.empty();
          this.reqseckList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    close() {
      this.empty();
    },
  },
  mounted() {
    //一进来 走请求
    this.reqList();
    this.reqGoodsList(true);
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