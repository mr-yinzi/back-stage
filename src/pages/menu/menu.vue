<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <v-list @edit="edit"></v-list>
      <v-add :info="info"  @hide="hide" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"
export default {
    components: {
        vAdd,
        vList,
    },
    data () {
        return {
            info:{
                dialogVisible:false,
                isAdd:true,
            }
        }
    },
     methods: {
        //点击了添加按钮
        willAdd(){
            this.info={
                dialogVisible:true,
                isAdd:true,
                title:"添加菜单"
            }
        },
        hide(){
            this.info={
                dialogVisible:false,
            }
        },
        //编辑
        edit(id){
            console.log(111);
             this.info={
                dialogVisible:true,
                title:"修改菜单",
                isAdd:false
            }
            this.$refs.add.look(id)
        }
     }
}
</script>

<style>

</style>