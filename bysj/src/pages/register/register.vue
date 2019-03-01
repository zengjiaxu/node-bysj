<template>
 <div class="login">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules">
    <el-form-item label="账号" prop="name">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="formLabelAlign.pass"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formLabelAlign.email" type="email"></el-input>
    </el-form-item>
  </el-form>
  <el-button>注册</el-button>
 </div>
</template>

<script>
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
}
}
</script>
<style lang="stylus" scoped>
.login
  background #ffffff
  width 500px
  height 220px
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
</style>
