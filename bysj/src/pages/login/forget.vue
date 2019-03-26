<template>
 <div class="forget">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formLabelAlign.email"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="yzm">
      <el-input v-model="formLabelAlign.yzm"></el-input>
    </el-form-item>
  </el-form>
  <el-button @click="sendMsg" :disabled="isDisabledOne" type="primary">获取密码</el-button>
  <span v-show="isShow">请{{timers}}秒后获取</span>
  <el-button @click="sure" :disabled="isDisabledTwo" type="success">确认</el-button>
 </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        email: '',
        yzm:'',
    },
    rules: {
        email: [
        { required: true,type: 'email', message: '请输入邮箱', trigger: 'blur' },
        { message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        yzm: [
        { required: true,type: 'string', message: '请输入验证码', trigger: 'blur' },
        { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ]
    },
    isDisabledOne:false,
    isDisabledTwo:true,
    timers:60,
    timer:null,
    isShow:false
  }
},
methods:{
 sendMsg () {
    this.timers = 60
   this.$refs.ruleForm.validateField('email',(err)=>{
     if(!err){
            axios.defaults.withCredentials = true//允许跨域访问
            axios.post('http://localhost:3000/users/verify',{
            email:this.formLabelAlign.email,
          }).then(this.getInfo,(err)=>console.log(err))
      }else{
        alert('请根据提示输入正确的数据')
      }
   })
 },
 getInfo(res) {
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
     alert('发送失败')
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
     alert(res.data.msg + ",请登录")
     this.$router.push('/login')
   }else{
   alert(res.data.msg+",您输入的验证码有误")
 }
 }
}
}
</script>
<style scoped lang="stylus">
.forget
  background #ffffff
  width 500px
  height 160px
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
  .el-form-item:nth-child(2)
    padding-right 132px
  .el-button
    width 130px
  .el-button:nth-child(2)
    position absolute
    right 14px
    top 77px
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
