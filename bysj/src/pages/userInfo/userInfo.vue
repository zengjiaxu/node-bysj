<template>
 <div>
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
        <el-button @click="submitUserInfo">上传</el-button>
        <el-button @click="updateUserInfo">修改</el-button>
     </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'userInfo',
  data () {
    return {
        labelPosition: 'left',
        formLabelAlign: {
        name: '',
        age: '',
        identity: '',
        address:'',
        email:''
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
  methods: {
  submitUserInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/users/InsertUserInfo',{
            user:this.formLabelAlign.name,
            age:this.formLabelAlign.age,
            identity:this.formLabelAlign.identity,
            address:this.formLabelAlign.address,
            email:this.formLabelAlign.email
          }).then(this.getInfo,(err)=>console.log(err))
        }else{//表单验证不通过
          alert('请根据提示输入正确的数据')
        }
      })
  },
  getInfo (res) {
      this.$message(res.data.msg)
      console.log(res)
  }
}
}
</script>
<style scoped lang="stylus">
.formInfo
    width 400px
    height 600px
    border 1px solid #cccccc
    padding 15px
    border-radius 5px
    position absolute
    left 50%
    top 50%
    transform: translate(-50%,-50%);
    p
        text-align center
        font-size 20px
</style>
