<template>
<div>
  <headers/>
  <div class="forget" :class="{newPass:haveYzm}">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
      <div v-show="!haveYzm">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="formLabelAlign.user"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
          <el-input v-model="formLabelAlign.yzm"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="新密码" prop="newPass" v-show="haveYzm">
        <el-input v-model="formLabelAlign.newPass" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="sendMsg" :disabled="isDisabledOne" type="primary" v-show="!haveYzm">获取验证码</el-button>
    <span v-show="isShow">请{{timers}}秒后获取</span>
    <el-button @click="sure" :disabled="isDisabledTwo" type="success" v-show="!haveYzm">确认</el-button>
    <el-button @click="submitNewpass"  type="success" v-show="haveYzm">提交</el-button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import headers from '../Home/components/header.vue'
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'left',
      haveYzm:false,
      formLabelAlign: {
        user:'',
        email: '',
        yzm:'',
        newPass:'',
    },
    rules: {
        user: [
        { required: true,type: 'string', message: '请输入账号', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        email: [
        { required: true,type: 'email', message: '请输入邮箱', trigger: 'blur' },
        { message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        yzm: [
        { required: true,type: 'string', message: '请输入验证码', trigger: 'blur' },
        { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ],
        newPass: [
        { required: true,type: 'string', message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ]
    },
    isDisabledOne:false,
    isDisabledTwo:true,
    timers:60,
    timer:null,
    isShow:false
  }
},
components:{
  headers
},
methods:{
 sendMsg () {
    this.timers = 60
   this.$refs.ruleForm.validateField('email',(err)=>{
     if(!err){
            axios.defaults.withCredentials = true//允许跨域访问
            axios.post('http://localhost:3000/users/verify',{
            email:this.formLabelAlign.email,
            user:this.formLabelAlign.user
          }).then(this.getInfo,(err)=>console.log(err))
      }else{
        this.$message('请根据提示输入正确的数据')
      }
   })
 },
 getInfo(res) {
   console.log(res)
   if(res.data.code === 1){
     this.isDisabledOne = true
     this.isShow = true
     this.isDisabledTwo = false
     this.timer =  setInterval(()=>{
     this.timers--
     if(this.timers === 0){
       clearInterval(this.timer)
       this.isDisabledOne = false
        this.isShow = false
     }
   },1000)
   }else{
     this.$message('发送失败,'+res.data.msg)
   }
 },
 sure(){
   this.$refs.ruleForm.validateField('yzm',(err)=>{
     if(!err){
       axios.defaults.withCredentials = true
       axios.post('http://localhost:3000/users/forget',{
         yzm:this.formLabelAlign.yzm
       }).then(this.getYzm,(err)=>console.log(err))
     }
   })
 },
 getYzm (res) {
   if(res.data.code === "1"){
     this.$message(res.data.msg + ",请填写密码")
     this.haveYzm = true;
     this.isShow = false;
     console.log(this.formLabelAlign.user)
   }else{
   this.$message(res.data.msg+",您输入的验证码有误")
 }
 },
 submitNewpass (res) {
    // this.$message(res.data.msg)
   this.$refs.ruleForm.validateField('yzm',(err)=>{
     if(!err){
       axios.defaults.withCredentials = true
       axios.post('http://localhost:3000/users/updatePass',{
         username:this.formLabelAlign.user,
         newPass:this.formLabelAlign.newPass
       }).then(this.updatePass,(err)=>console.log(err))
     }
   })
 },
 updatePass (res) {
   this.$message(res.data.msg+'，请登录')
   this.$router.push('/login')
 }
}
}
</script>
<style scoped lang="stylus">
.newPass.forget
  height 100px
.forget
  background #ffffff
  width 500px
  height 227px
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
  .el-form-item:nth-child(3)
    padding-right 132px
  .el-button
    width 130px
  .el-button:nth-child(2)
    position absolute
    right 14px
    top 139px
  span
    position absolute
    right 39px
    top 121px
    color #cccccc
    font-size 12px
  a
    position absolute
    right 15px
    bottom 15px
    color #606266
    font-size 14px
    text-decoration none
  a:hover
    text-decoration underline
</style>
