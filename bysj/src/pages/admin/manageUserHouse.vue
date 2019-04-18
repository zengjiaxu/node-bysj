<template>
   <div>
     <headers/>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>待审核的房源信息</span></div>
          <div class="main">
            <div v-for="item of detailInfo" :key="item.id">
              <div class="detail">
                <div class="img">
                    <img :src="item.imgUrl" alt="">
                </div>
                <div class="info">
                    <p class="size">{{item.houseLarge}}
                      <el-button @click="deleteHouse(item.id)" type="danger">删除</el-button>
                      <el-button @click="failedHouse(item.id)" type="info">不通过</el-button>
                      <el-button @click="successHouse(item.id)" type="success">通过</el-button>
                    </p>
                    <p class="address">地理位置：{{item.address}}</p>
                    <p class="phone">联系电话：{{item.phone}}</p>
                    <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                </div>
              </div>
              </div>
          </div>
            <div class="top1"><span>待审核的用户信息</span></div>
            <div class="main">
              <ul class="userInfoList userInfoList1">
                <li>姓名</li>
                <li>年龄</li>
                <li>身份证号</li>
                <li>住址</li>
                <li>邮箱</li>
                <li>账号</li>
                <li>操作</li>
              </ul>
              <ul>
                <li v-for="item of userInfo" :key="item.id">
                  <ul  class="userInfoList">
                    <li>{{item.user}}</li>
                    <li>{{item.age}}</li>
                    <li>{{item.identity}}</li>
                    <li>{{item.address}}</li>
                    <li>{{item.email}}</li>
                    <li>{{item.username}}</li>
                    <li>
                      <el-button @click="successUser(item.id)" type="success">通过</el-button>
                      <el-button @click="failedUser(item.id)" type="info">不通过</el-button>
                      <el-button @click="deleteUser(item.id)" type="danger">删除</el-button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
      </el-col>
    </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import headers from '../Home/components/header.vue'
export default {
  data(){
    return {
      detailInfo:[],
      userInfo:[]
    }
  },
  components:{
    headers
  },
  methods:{
    deleteHouse (x) {
        axios.post('http://localhost:3000/house/deleteUserHouse',{
            id:x
          }).then(this.deleteSuccessInfo,(err)=>console.log(err))
    },
    successHouse (x) {
        axios.post('http://localhost:3000/house/UpdateReviewedHouse',{
            id:x,
            reviewed:'2'
          }).then(this.updateReviewedHouse,(err)=>console.log(err))
      
    },
    updateReviewedHouse(res){
        this.$message({
            type:'success',
            message:'已通过审核'
          })
        axios.post('http://localhost:3000/house/GetAllReviewedHouse',{
          msg:1
        }).then(this.getSuccessInfo,(err)=>console.log(err))
    },
    updateFailedReviewedHouse () {
        this.$message({
            type:'success',
            message:'已处理，不通过'
          })
        axios.post('http://localhost:3000/house/GetAllReviewedHouse',{
          msg:1
        }).then(this.getSuccessInfo,(err)=>console.log(err))
    },
    failedHouse (x) {
        axios.post('http://localhost:3000/house/UpdateReviewedHouse',{
            id:x,
            reviewed:'3'
          }).then(this.updateFailedReviewedHouse,(err)=>console.log(err))
    },
    successUser (x) {
        axios.post('http://localhost:3000/users/UpdateUnreviewedUser',{
          id:x,
          reviewed_user:'2'
          }).then(this.updateUnreviewedUser,(err)=>console.log(err))
    },
    updateUnreviewedUser (res) {
      this.$message({
        type:'success',
        message:res.data.msg
      })
        axios.post('http://localhost:3000/users/getUnreviewedUser',{
          msg:1
          }).then(this.getSuccessUserInfo,(err)=>console.log(err))
    },
    failedUser(x){
        axios.post('http://localhost:3000/users/UpdateUnreviewedUser',{
          id:x,
          reviewed_user:'3'
          }).then(this.updateFailedUnreviewedUser,(err)=>console.log(err))
    },
    updateFailedUnreviewedUser () {
      this.$message({
        type:'success',
        message:'已处理，不通过'
      })
        axios.post('http://localhost:3000/users/getUnreviewedUser',{
          msg:1
          }).then(this.getSuccessUserInfo,(err)=>console.log(err))
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
        getSuccessInfo (res) {
          if(res.data.code === 1){
          let data = res.data.data
          let newRes = []
          data.forEach((item)=>{
            newRes.push(JSON.parse(item))
          })
          this.detailInfo = newRes
          }else{
            alert(res.data.data)
          }

        },
        deleteSuccessInfo(res){
          if(res.data.code === 1){
            this.$message({
              type:'success',
              message:res.data.data
              })
            axios.post('http://localhost:3000/house/GetUserHouse',{
            username:this.getCookie('user')
          }).then(this.getSuccessInfo,(err)=>console.log(err))
          }else{
            this.$message('删除失败')
          }
        },
        getSuccessUserInfo(res){
          console.log(res)
          if(res.data.code === 1){
            let data = res.data.data
            let newRes = []
            data.forEach((item)=>{
              newRes.push(JSON.parse(item))
            })
            this.userInfo = newRes
          }
        }
  },
  mounted () {
        axios.post('http://localhost:3000/house/GetAllReviewedHouse',{
          msg:1
          }).then(this.getSuccessInfo,(err)=>console.log(err))

        axios.post('http://localhost:3000/users/getUnreviewedUser',{
          msg:1
          }).then(this.getSuccessUserInfo,(err)=>console.log(err))
  }
}
</script>

<style scoped lang="stylus">
.main >>> .el-button
  padding .3rem .5rem
.top
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background: linear-gradient(to right, #12d2c6 2%, #0ebed4 97%) #12d2c6;
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem
.top1
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background: #c0ac85
    font-size .35rem
    border-radius .175rem .175rem 0 0
    color:#ffff
    span
        margin-left .25rem

.main
    width 100%
    height 15rem
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding .25rem
    overflow scroll
    font-size .35rem
    .userInfoList
        border-bottom 1px solid #ddd
        display flex
        li
          flex 1
          list-style none
          line-height 1.125rem
          text-align center
          .el-button
              line-height 0.125rem
              text-align center
              padding .3rem .2rem
              font-size .35rem
    .userInfoList1
        li
          font-weight bolder
    .detail
        width  32%
        height 100%
        float left
        margin .2rem
        .img 
            width 100%
            height 6.25rem
            img 
                width 100%
                height 100%
        .info
            width 100%
            height 3rem
            margin-top .25rem
            position relative
            p
                font-size .35rem
                color #999
                line-height 1rem
            .bPrice
                text-align right 
                display inline-block
                position absolute
                bottom  0
                right 0
                font-size .35rem
                color #999
            .price
                color orange
                font-size .75rem
            .size .el-button
                  line-height  .125rem
                  float right
                  margin-right .125rem
                  margin-left 0
                  font-size .35rem
    #allmap
        width 55%
        height 100%
        background #000
        float right
.subscribe
    position relative
.main::-webkit-scrollbar 
        width: 0px;
        height: 0px; 
</style>
