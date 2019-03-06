<template>
 <div class="home">
   <my-header/>
    <el-row type="flex" justify="center">
      <el-col :span="16" class="center">
        <my-layout/>
        <my-house/>
        <my-foot/>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import myHeader from './components/Header.vue'
import myFoot from './components/foot.vue'
import myLayout from './components/layout.vue'
import myHouse from './components/houseSource.vue'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components:{
    myHeader,
    myFoot,
    myLayout,
    myHouse
  }
}

</script>
<style lang="stylus" scoped>
</style>
