<template>
 <div class="home">
   <my-header v-on:getN="getName" v-on:hasSess="getSess" v-on:handleData="getData"/>
    <el-row type="flex" justify="center">
      <el-col :span="16" class="center">
        <my-layout :sendN="name" :sendSess="hasSess"/>
        <my-house :sendData="dataList"/>
        <my-foot/>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import myHeader from './components/header.vue'
import myFoot from './components/foot.vue'
import myLayout from './components/layout.vue'
import myHouse from './components/houseSource.vue'
export default {
  name: 'Home',
  data () {
    return {
      name:'',
      hasSess:'',
      dataList:[]
    }
  },
  components:{
    myHeader,
    myFoot,
    myLayout,
    myHouse
  },
  methods: {
    getName:function (res) {
      this.name = res
    },
    getSess(res) {
      this.hasSess = res   
    },
    getData(res){
      this.dataList = res
    }
  }
}

</script>
<style lang="stylus" scoped>
</style>
