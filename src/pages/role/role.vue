<template>
    <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="willAdd">添加</el-button>
       <!-- 数据列表  -->
        <v-list @edit="edit"></v-list>
        <!-- 添加弹框 -->
        <v-add :info="info" @hide="hide" ref="add"></v-add>
    </div>
</template>
<script>
import vAdd from "./components/add"
import vList from "./components/list"
export default {
    components: {
        vAdd,
        vList
    },
    data() {
        return {
            //传递给子组件的信息
            info:{
                //添加弹框出现状态
                isShow:false,
                title:"添加菜单",
                isAdd:true
            }
        }
    },
     methods: {
        //点击了添加按钮
        willAdd(){
            this.info={
                isShow:true,
                title:"添加菜单",
                isAdd:true
            }
        },
        // 弹框消失
        hide(){
            this.info.isShow=false;
        },
        //编辑
        edit(id){
            console.log(111);
             this.info={
                isShow:true,
                title:"修改角色",
                isAdd:false
            }
            this.$refs.add.look(id)
        }
    },
    mounted() {}
}
</script>
<style scoped>

</style>