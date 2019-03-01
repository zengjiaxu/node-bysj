<template>
 <div class="login">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules">
    <el-form-item label="账号" prop="name">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="formLabelAlign.pass"></el-input>
    </el-form-item>
  </el-form>
  <el-button>登录</el-button>
  <router-link to="/">忘记密码</router-link>
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
}
}
</script>
<style lang="stylus" scoped>
.login
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
