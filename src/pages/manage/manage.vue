<template>
    <div>
        <el-button type="primary"  @click="willShow">添加</el-button>
        <v-list @edit="edit"></v-list>
        <v-add :info="info" ref="add"></v-add>
    
    </div>
</template>
<script>
import vList from "./componets/list"
import vAdd from "./componets/add"
export default {
    components: {
        vList,
        vAdd,
    },
    data() {
        return {
            info:{
                isShow:false,
                title:"",
                isAdd:true
            }
        }
    },
    methods: {
        willShow(){
            this.info={
                isShow:true,
                title:"添加用户",
                isAdd:true
            }
        },
         //编辑
        edit(id){
             this.info={
                isShow:true,
                title:"修改用户",
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