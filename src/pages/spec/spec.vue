<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 数据列表  -->
    <v-list @emit="emit($event)"></v-list>

    <!-- 添加弹框 -->
    <v-add :info="info" @hide="hide" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //传递给子组件的信息
      info: {
        //添加弹框出现状态
        dialogVisible: false,
        title: "添加分类",
        isAdd: true,
      },
    };
  },
  methods: {
    //点击了添加按钮
    willAdd() {
      this.info = {
        dialogVisible: true,
        title: "添加规格",
        isAdd: true,
      };
    },
    // 弹框消失
    hide() {
      this.info.dialogVisible = false;
    },
    //触发了编辑
    emit(id) {
      this.info = {
        dialogVisible: true,
        title: "修改规格",
        isAdd: false,
      };
      //父组件调用子组件的方法
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>