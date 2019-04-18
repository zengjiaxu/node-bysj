<template>
 <div>
    <headers/>
    <div class="pst">
     <div class="formInfo">
         <p>个人信息</p>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formLabelAlign.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identity">
            <el-input v-model="formLabelAlign.identity"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
            <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="formLabelAlign.email" type="email"></el-input>
        </el-form-item>


        </el-form>
        <div class="btnCtn">
          <el-button @click="submitUserInfo" type="success">上传</el-button>
          <el-button @click="updateUserInfo" type="primary">保存</el-button>
        </div>
        <br>
        <br>
        <el-steps :active="active" finish-status="success">
          <el-step title="发布" :status="status1"></el-step>
          <el-step title="待审核"></el-step>
          <el-step :title="titles" :status="status"></el-step>
        </el-steps>
     </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios'
import headers from '../Home/components/header.vue'
export default {
  name:'userInfo',
  data () {
    return {
        labelPosition: 'left',
        active:3,
        status:'',
        titles:'',
        status1:'',
        formLabelAlign: {
        name: '',
        age: '',
        identity: '',
        address:'',
        email:'',
        },
        rules: {
        name: [
        { required: true,type: 'string', message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
        { required: true,type: 'number', message: '请输入为数字的年龄', trigger: 'blur' }
        ],
        identity:[
        { required: true,type: 'string', message: '请输入身份证号', trigger: 'blur' },
        {
        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        message: '格式有误',trigger:'blur'
        }
        ],
        address:[
        { required: true,type: 'string', message: '请输入地址', trigger: 'blur' }
        ],
        email:[
        { required: true,type: 'string', message: '请输入正确的邮箱', trigger: 'blur' }
        ]
    }
    }
  },
  components:{
    headers
  },
  methods: {
  submitUserInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/users/InsertUserInfo',{
            user:this.formLabelAlign.name,
            age:this.formLabelAlign.age,
            identity:this.formLabelAlign.identity,
            address:this.formLabelAlign.address,
            email:this.formLabelAlign.email,
            username:this.getCookie('user')
          }).then(this.getInfo,(err)=>console.log(err))
        }else{//表单验证不通过
           this.$message('请根据提示输入正确的数据')
        }
      })
  },
  updateUserInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/users/UpdateUserInfo',{
            user:this.formLabelAlign.name,
            age:this.formLabelAlign.age,
            identity:this.formLabelAlign.identity,
            address:this.formLabelAlign.address,
            email:this.formLabelAlign.email,
            username:this.getCookie('user')
          }).then(this.updateInfo,(err)=>console.log(err))
        }else{//表单验证不通过
           this.$message('请根据提示输入正确的数据')
        }
      })
  },
  updateInfo (res) {
      this.$message({
              type:'success',
              message:res.data.msg
              })
      console.log(res)
  },
  getUserInfo (res) {
    if(res.data.code === 0){
      console.log(res)
      this.active = 1
      this.status = 'wait'
      this.titles = '未完成'
      this.status1 = 'error'
    }
    if(res.data.code === 1){
      const userData = JSON.parse(res.data.data)
      const {address,age,email,identity,user,username,reviewed_user} = userData
      this.formLabelAlign.name = user
      this.formLabelAlign.age = ~~age
      this.formLabelAlign.address = address
      this.formLabelAlign.email = email
      this.formLabelAlign.identity = identity
      this.formLabelAlign.username = username
      if(reviewed_user === '1'){
        this.active = 1
        this.status = 'wait'
        this.titles= '未完成'
        this.status1 = 'success'
      }
      else if(reviewed_user === '2'){
        this.active = 3
        this.status = 'success'
        this.titles= '通过'
        this.status1 = 'success'
      }
      else{
        this.active = 3
        this.status = 'error'
        this.titles = '未通过'
        this.status1 = 'success'
      }
    }
  },
  getInfo (res) {
      this.$message({
              type:'success',
              message:res.data.msg
              })
      console.log(res)
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
}
},
mounted(){
            axios.post('http://localhost:3000/users/GetUserInfo',{
            username:this.getCookie('user')
          }).then(this.getUserInfo,(err)=>console.log(err))      
}
}
</script>
<style scoped lang="stylus">
.pst
  position relative
  width 100%
  height calc(100vh - 1.5rem)
.formInfo
    width 400px
    height 520px
    border 1px solid #cccccc
    padding 15px
    border-radius 5px
    position absolute
    left 50%
    top 50%
    transform: translate(-50%,-50%);
    .el-steps--horizontal
        width: 300px
        margin-left: 50px
    .el-form
      margin-top 30px
    p
        text-align center
        font-size 20px
    .btnCtn
      display flex
      .el-button
        flex 1
        margin 5px
@media screen and (max-width: 532px) 
  .formInfo
    width 80%
</style>
