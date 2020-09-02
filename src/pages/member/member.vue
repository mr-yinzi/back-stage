<template>
  <div>
    <v-list  @edit="edit"></v-list>
    <v-add :info="info" ref="update"></v-add>
  </div>
</template>
<script>
import vList from "./componets/list";
import vAdd from "./componets/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  methods: {
        //编辑
        edit(id){
             this.info={
                isShow:true,
                title:"会员修改",
            }
            this.$refs.update.look(id)
        }
  },
  mounted() {},
};
</script>
<style scoped>
</style>