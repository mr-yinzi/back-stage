<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="changeCurrentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "message/list",
      size: "message/size",
      total: "message/total",
      page: "message/page",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "message/reqListAction",
      reqTotal: "message/reqListNum",
      changePageAction: "message/changePageAction",
    }),
    //点击了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      //点击了确定，发起删除请求
      reqUserDel({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          //删除完成，重新取总数，page设置为1
          this.reqTotal();
          this.changePageAction(1);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改了当前的页码
    changeCurrentPage(p) {
      //修改一下vuex里面的page
      this.changePageAction(p);
    },
  },
  mounted() {
    //一进来就请求了角色列表数据
    this.reqList();
    this.reqTotal();
  },
};
</script>
<style>
</style>