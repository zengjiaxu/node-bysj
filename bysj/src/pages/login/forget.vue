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
  <el-button @click="sendMsg">发送验证码</el-button>
  <el-button @click="sure">确认</el-button>
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
        yzm:''
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
    }
  }
},
methods:{
 sendMsg () {
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
   console.log(res);  
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
   conosle.log(res)
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
  .el-button
    width 130px
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
