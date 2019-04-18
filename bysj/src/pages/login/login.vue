<template>
<div>
  <headers/>
  <div class="login">
    <p>登录</p>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
      <el-form-item label="账号" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="formLabelAlign.pass" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="loginFrom" type="success">登录</el-button>
    <router-link to="/forget">忘记密码</router-link>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapState } from 'vuex'
import headers from '../Home/components/header.vue'
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'left',
      user:'',
      formLabelAlign: {
        name: '',
        pass: ''
    },
    rules: {
        name: [
        { required: true,type: 'string', message: '请输入账号', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
        { required: true,type: 'string', message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ]
    }
  }
},
components:{
  headers
},
methods:{
  loginFrom () {
    this.$refs.ruleForm.validate((val)=>{
      if(val){
            axios.defaults.withCredentials = true//允许跨域访问
            axios.post('http://localhost:3000/users/login',{
            user:this.formLabelAlign.name,
            pass:this.formLabelAlign.pass,
          }).then(this.getInfo,(err)=>console.log(err))
      }else{
        this.$message('请根据提示输入正确的数据')
      }
    })
  },
  getInfo (res) {
    if(res.data.code === 1){
      this.user = res.data.sess
      this.setCookie('user',this.user,3)
       this.$store.commit('changeUser',this.user)
      this.$message({
              type:'success',
              message:res.data.msg
              })
      this.$router.push('/')
    }else{
      this.$message({
              type:'success',
              message:res.data.msg
              })
    }
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
}
}
</script>
<style lang="stylus" scoped>

.login
  background #ffffff
  width 500px
  height 260px
  border 1px solid #cccccc
  border-radius 5px
  padding 15px
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  margin  auto
  text-align center
  .el-button
    width 130px
  .el-form
    margin-top 30px
  a
    position absolute
    right 15px
    bottom 15px
    color #606266
    font-size 14px
    text-decoration none
  a:hover
    text-decoration underline
  p
    font-size 20px
@media screen and (max-width: 532px) 
  .login
    width 80%
</style>
