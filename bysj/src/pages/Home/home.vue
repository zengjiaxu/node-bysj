<template>
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple-light">
            <div class="lgr">
                <router-link to="/login">登陆</router-link>/
                <router-link to="/register">注册</router-link>
            </div>
        </div>
    </el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang="stylus" scoped>
  .el-row 
    margin-bottom: 20px;
    &:last-child 
      margin-bottom: 0; 
  .bg-purple-dark 
    background: #99a9bf;
  .bg-purple 
    background: #232836;
  .bg-purple-light 
    background: #232836;
    .lgr
        display inline
        float right
        line-height 50px
        color #79829a
        font-size 14px
        font-weight normal
        a
            color #79829a
            text-decoration none
        a:hover
            text-decoration underline
  .grid-content 
    min-height: 50px;
</style>
