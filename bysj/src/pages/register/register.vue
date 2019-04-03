<template>
 <div class="login">
   <p>注册</p>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
    <el-form-item label="账号" prop="name">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="formLabelAlign.pass" type="password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formLabelAlign.email" type="email"></el-input>
    </el-form-item>
  </el-form>
  <el-button @click="submitReg" type="primary">注册</el-button>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        pass: '',
        email: ''
    },
    rules: {
        name: [
        { required: true,type: 'string', message: '请输入账号', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
        { required: true,type: 'string', message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        email: [
        { required: true,type: 'email', message: '请输入正确的电子邮件格式', trigger: 'blur' }
        ]
    }
  }
},
methods: {
  submitReg () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/users/register',{
            user:this.formLabelAlign.name,
            pass:this.formLabelAlign.pass,
            email:this.formLabelAlign.email
          }).then(this.getInfo,(err)=>console.log(err))
        }else{//表单验证不通过
          this.$message('请根据提示输入正确的数据')
        }
      })
  },
  getInfo (res) {
    if(res.data.code === 1){
      this.$message(res.data.msg)
    }else{
      this.$message('注册失败')
      console.log(res)
    }
  }
}
}
</script>
<style lang="stylus" scoped>
.login
  background #ffffff
  width 500px
  height 320px
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
  p
    font-size 20px
</style>
