<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.dialogVisible" width="60%" @closed="close">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width" >
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstId">
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecondId">
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in secondCateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in threeList" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
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
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      value: "",
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
    changeSecondId(){
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      // this.threeList = this.goodsList.find(
      //   (item) => item.second_cateid == this.form.second_cateid
      // ).goodsname;
      // console.log(this.threeList);
      for(let i=0;i<this.goodsList.length;i++){
        if(this.goodsList[i].second_cateid == this.form.second_cateid){
          // this.threeList.push({title:this.goodsList[i].goodsname})
          this.threeList.push(this.goodsList[i])
        }
      }
    },
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
    add() {
      console.log(this.form.first_cateid);
      // this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      // reqspecsAdd(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     //添加成功
      //     successAlert(res.data.msg);
      //     //弹框消失
      //     this.$emit("hide");
      //     //数据重置
      //     this.empty();
      //     //重新获取list
      //     this.reqList();
      //   } else {
      //     warningAlert(res.data.msg);
      //   }
      // });
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
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
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
    },
    close() {
      this.empty();
    },
  },
  mounted() {
    //一进来 走请求
    this.reqList();
    this.reqGoodsList(true);
    console.log(this.list);
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