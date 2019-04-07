<template>
 <div>
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple-light">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#232836"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
            <el-submenu index="2">
                <template slot="title">我要找房</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">我要出租</template>
                <el-menu-item index="3-1">个人信息管理</el-menu-item>
                <el-menu-item index="3-2">发布房源信息</el-menu-item>
                <el-menu-item index="3-3">管理已发布的房源</el-menu-item>
                <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项1</el-menu-item>
                <el-menu-item index="3-4-2">选项2</el-menu-item>
                <el-menu-item index="3-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">举报中心</template>
                <el-menu-item index="4-1">如何举报</el-menu-item>
                <el-menu-item index="4-2">查看举报进度</el-menu-item>
            </el-submenu>
            </el-menu>
            <div class="lgr" v-show="!haveSession">
                <router-link to="/login">登录</router-link>/
                <router-link to="/register">注册</router-link>
            </div>
            <div class="lgr" v-show="haveSession">
              Hello，{{name}}
              <span class="exit" @click="handleExit">[退出]</span>
            </div>
        </div>
    </el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</div>   
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: 'a',
      haveSession:false,
      activeIndex:'1'
    }
  },
  methods: {
     getInfo (res) {
       if(this.getCookie('session_id')){
         this.haveSession = true
         this.name = this.getCookie('user')
         this.$emit('getN',this.name)
         this.$emit('hasSess',this.haveSession)
       }else{
         this.haveSession = false
       }
     },
     handleSelect (key,path) {
       console.log(key,path)
       if(key === '3-1'){
         this.$router.push('/userInfo')
       }
       if(key === '3-2'){
         this.$router.push('/submitHouse')
       }
        if(key === '3-3'){
         this.$router.push('/manageHouse')
       }
     },
     handleExit () {
       axios.defaults.withCredentials = true//允许跨域访问
        axios.post('http://localhost:3000/users/Exit',{
            msg:'exit',
          }).then(this.Exitinfo,(err)=>console.log(err))
     },
     Exitinfo (res) {
       this.$message(res.data.msg)
       this.setCookie('session_id','',-1)
       this.setCookie('user','',-1)
       if(this.getCookie('session_id')){
         this.haveSession = true
         this.name = res.data.sess
         this.$emit('hasSess',this.haveSession)
       }else{
         this.haveSession = false
         this.$emit('hasSess',this.haveSession)
       }
     },
     getCookie (c_name) {    
      if (document.cookie.length>0)
      {
      let c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
      { 
       c_start=c_start + c_name.length+1 
      let c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      }
      }
      return "";
    },
   setCookie (name, value, day) {
   if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
     var expires = day * 24 * 60 * 60 * 1000;
     var date = new Date(+new Date()+expires);
     document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
   }else{
     document.cookie = name + "=" + escape(value);
    }
  }
  },
  mounted () {
    this.getInfo()
  }
}

</script>
<style lang="stylus" scoped>
  a
    text-decoration none
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
    position relative
    height 60px
    .lgr
        display inline
        position absolute
        top 0
        right 0
        line-height 60px
        color #79829a
        font-size 14px
        font-weight normal
        a
            color #79829a
            text-decoration none
        a:hover
            text-decoration underline
            color #ffffff
        .exit
            color #79829a
            font-size 14px
            font-weight normal
            cursor pointer
        .exit:hover
            text-decoration underline
            color #ffffff
  .grid-content 
    min-height: 60px;
</style>
