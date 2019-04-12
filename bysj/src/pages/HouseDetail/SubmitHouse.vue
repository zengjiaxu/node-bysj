<template>
 <div>
     <div class="formInfo">
         <p>发布房源信息</p>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
        <el-form-item label="图片地址" prop="imgUrl">
            <el-input v-model="formLabelAlign.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="房屋大小" prop="houseLarge">
            <el-input v-model.number="formLabelAlign.houseLarge"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="房屋住址" prop="address">
            <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="价格/月" prop="price">
            <el-input v-model="formLabelAlign.price"></el-input>
        </el-form-item>


        </el-form>
        <div class="btnCtn">
          <el-button @click="submitHouseInfo" type="success" :disabled="disabled">上传</el-button>
          <el-button @click="updateHouseInfo" type="primary" :disabled="disabled">保存</el-button>
        </div>
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
        disabled:false,
        id:'',
        formLabelAlign: {
        imgUrl: '',
        houseLarge: '',
        phone: '',
        address:'',
        price:''
        },
        rules: {
        imgUrl: [
        { required: true,type: 'string', message: '请输入图片链接', trigger: 'blur' }
        ],
        houseLarge: [
        { required: true,type: 'string', message: '请输入房屋大小，例如：三室一厅', trigger: 'blur' }
        ],
        phone:[
        { required: true,type: 'string', message: '请输入手机号', trigger: 'blur' },
        {
        pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
        message: '手机格式有误',trigger:'blur'
        }
        ],
        address:[
        { required: true,type: 'string', message: '请输入地址', trigger: 'blur' }
        ],
        price:[
        { required: true,type: 'string', message: '请输入房屋售价', trigger: 'blur' }
        ]
    }
    }
  },
  methods: {
  submitHouseInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/house/InsertHouseInfo',{
            imgUrl: this.formLabelAlign.imgUrl,
            houseLarge: this.formLabelAlign.houseLarge,
            phone: this.formLabelAlign.phone,
            address:this.formLabelAlign.address,
            price:this.formLabelAlign.price,
            username:this.getCookie('user')
          }).then(this.InsertSuccessInfo,(err)=>console.log(err))
        }else{//表单验证不通过
           this.$message('请根据提示输入正确的数据')
        }
      })
  },
  getSuccessInfo (res) {
      this.$message({
              type:'success',
              message:res.data.msg
              })
      console.log(res)
  },
  InsertSuccessInfo (res) {
    this.$message({
              type:'success',
              message:res.data.msg
              })
  },
  updateHouseInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
            axios.post('http://localhost:3000/house/updateHouseInfo',{
            imgUrl: this.formLabelAlign.imgUrl,
            houseLarge: this.formLabelAlign.houseLarge,
            phone: this.formLabelAlign.phone,
            address:this.formLabelAlign.address,
            price:this.formLabelAlign.price,
            username:this.getCookie('user')
          }).then(this.updateSuccessInfo,(err)=>console.log(err))
        }else{//表单验证不通过
           this.$message('请根据提示输入正确的数据')
        }
      })
  },
  updateSuccessInfo(res){
      this.$message({
              type:'success',
              message:res.data.msg
              })
  },
  getSuccessInfo(res){
    const data = JSON.parse(res.data.data)
    console.log(data)
    this.formLabelAlign.imgUrl =  data.imgUrl,
    this.formLabelAlign.houseLarge =  data.houseLarge,
    this.formLabelAlign.phone =  data.phone,
    this.formLabelAlign.address = data.address,
    this.formLabelAlign.price = data.price

  },
  getUserInfo (res){
    console.log(res)
    const data =JSON.parse(res.data.data)
    if(data.reviewed_user === '1'){
            this.$message(
        {
            message:'您的个人信息正在审核中，请稍后再试'
        }
        )
      this.disabled = true
    }
    if(data.reviewed_user === '2'){
      this.$message(
        {
            type:'success',
            message:'您的个人信息已通过审核，请发布房源信息'
        }
        )
      this.disabled = false
    }
    if(data.reviewed_user === '3'){
      this.$message(
        {
            type:'error',
            message:'您的个人信息未通过审核，请重新提交'
        }
        )
      this.disabled = true
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
}
},
mounted(){
 this.id =  this.$route.query.id  
 if(this.id){
    axios.post('http://localhost:3000/house/GetIdHouse',{
            id:this.id
          }).then(this.getSuccessInfo,(err)=>console.log(err))
 }
 if(this.getCookie('user')){
      axios.post('http://localhost:3000/users/GetUserInfo',{
      username:this.getCookie('user')
    }).then(this.getUserInfo,(err)=>console.log(err))   
 }else{
   this.disabled = true
   this.$message({
     message:'请登录'
   })
 }
}
}
</script>
<style scoped lang="stylus">
.formInfo
    width 400px
    height 500px
    border 1px solid #cccccc
    padding 15px
    border-radius 5px
    position absolute
    left 50%
    top 50%
    transform: translate(-50%,-50%);
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
</style>
