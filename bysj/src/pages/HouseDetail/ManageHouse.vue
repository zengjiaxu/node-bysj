<template>
   <div>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>我的房源信息</span></div>
          <div class="main">
            <div v-for="item of detailInfo" :key="item.id">
              <div class="detail">
                <div class="img">
                    <img src="../../assets/fw1.jpg" alt="">
                </div>
                <div class="info">
                    <p class="size">{{item.houseLarge}}
                      <el-button @click="deleteHouse(item.id)" type="success">删除</el-button>
                      <el-button @click="updateHouse(item.id)" type="primary">修改</el-button>
                    </p>
                    <p class="address">地理位置：{{item.address}}</p>
                    <p class="phone">联系电话：{{item.phone}}</p>
                    <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                </div>
              </div>
              </div>
          </div>

      </el-col>
    </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data(){
    return {
      detailInfo:[]
    }
  },
  methods:{
    deleteHouse (x) {
        axios.post('http://localhost:3000/house/deleteUserHouse',{
            id:x
          }).then(this.deleteSuccessInfo,(err)=>console.log(err))
    },
    updateHouse (x) {
      this.$router.push({name:'submitHouse',query:{id:x}})
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
          let data = res.data.data
          let newRes = []
          data.forEach((item)=>{
            newRes.push(JSON.parse(item))
          })
          this.detailInfo = newRes
        },
        deleteSuccessInfo(res){
          if(res.data.code === 1){
            this.$message(res.data.data)
            axios.post('http://localhost:3000/house/GetUserHouse',{
            username:this.getCookie('user')
          }).then(this.getSuccessInfo,(err)=>console.log(err))
          }else{
            this.$message('删除失败')
          }
        }
  },
  mounted () {
        axios.post('http://localhost:3000/house/GetUserHouse',{
            username:this.getCookie('user')
          }).then(this.getSuccessInfo,(err)=>console.log(err))
  }
}
</script>

<style lang="stylus">
.top
    width 100%
    line-height 50px
    margin-top 20px
    background: linear-gradient(to right, rgb(255, 113, 74) 2%, rgb(252, 66, 66) 97%); 
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px

.main
    width 100%
    height 500px
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding 10px
    overflow scroll
    .detail
        width  48%
        height 100%
        float left
        margin 8px
        .img 
            width 100%
            height 60%
            img 
                width 100%
                height 100%
        .info
            width 100%
            height 120px
            margin-top 10px
            position relative
            p
                font-size 14px
                color #999
                line-height 40px
            .bPrice
                text-align right 
                display inline-block
                position absolute
                bottom  0
                right 0
                font-size 14px
                color #999
            .price
                color orange
                font-size 30px
            .size .el-button
                  line-height  5px
                  float right
                  margin-right 5px
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
