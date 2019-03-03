<template>
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple-light">
            <div class="lgr" v-show="!haveSession">
                <router-link to="/login">登录</router-link>/
                <router-link to="/register">注册</router-link>
            </div>
            <div class="lgr" v-show="haveSession">
              你好，{{name}}
            </div>
        </div>
    </el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: 'a',
      haveSession:false
    }
  },
  methods: {
     getInfo (res) {
       if(document.cookie.length>1){
         this.haveSession = true
         this.name = res.data.user
       }else{
         this.haveSession = false
       }
     }
  },
  mounted () {
    axios.defaults.withCredentials = true//允许跨域访问
            axios.post('http://localhost:3000/users/login',{
            msg:'req',
          }).then(this.getInfo,(err)=>console.log(err))
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
