<template>
 <div>
   <headers/>
     <div class="formInfo">
         <p>发布房源信息</p>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
          <el-upload
          class="upload-demo"
          action="http://localhost:3000/upload"
          :file-list="fileList"
          :limit="howMuch"
          :on-exceed="fileMore"
          :on-success="successUpload"
          :on-error="failedUpload"
          list-type="picture">
          <el-button size="small" type="primary">点击上传房屋图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
        </el-upload>
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
import headers from '../Home/components/header.vue'
export default {
  name:'userInfo',
  data () {
    return {
        labelPosition: 'left',
        disabled:false,
        id:'',
        imgUrl: '',
        howMuch:1,
        fileList:[],
        formLabelAlign: {
        houseLarge: '',
        phone: '',
        address:'',
        price:''
        },
        rules: {
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
  components:{
      headers
  },
  methods: {
  submitHouseInfo () {
      this.$refs.ruleForm.validate((val)=>{
        if(val){//表单验证通过
        if(this.imgUrl){
            axios.post('http://localhost:3000/house/InsertHouseInfo',{
            imgUrl: this.imgUrl,
            houseLarge: this.formLabelAlign.houseLarge,
            phone: this.formLabelAlign.phone,
            address:this.formLabelAlign.address,
            price:this.formLabelAlign.price,
            username:this.getCookie('user')
          }).then(this.InsertSuccessInfo,(err)=>console.log(err))
        }else{
          this.$message({
            type:'error',
            message:'请上传图片'
          })
        }
        }else{//表单验证不通过
           this.$message('请根据提示输入正确的数据')
        }
      })
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
            imgUrl: this.imgUrl,
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
            message:'您的个人信息已通过审核，请发布房源或修改信息'
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
},
successUpload(res){
  const url = res.data.url
  this.imgUrl = url
  console.log(this.imgUrl)
  this.$message({
    type:'success',
    message:'上传成功'
  })
},
failedUpload(){
  this.$message({
    type:'error',
    message:'上传失败'
  })
},
fileMore(){
    this.$message({
    type:'error',
    message:'图片超出个数，最多一个'
  })
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
    min-height 500px
    border 1px solid #cccccc
    padding 15px
    border-radius 5px
    position absolute
    left 50%
    top 50%
    transform: translate(-50%,-50%);
    .el-form
      margin-top 30px
      .upload-demo
        margin-bottom 20px
    p
        text-align center
        font-size 20px
    .btnCtn
      display flex
      .el-button
        flex 1
        margin 5px
</style>
