<template>
   <div>
     <headers/>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>我的房源信息</span></div>
          <div class="main">
            <div v-for="item of detailInfo" :key="item.id">
              <div class="detail">
                <div class="img">
                    <img :src="item.imgUrl" alt="">
                </div>
                <div class="info">
                    <p class="size">{{item.houseLarge}}
                      <el-button @click="deleteHouse(item.id)" type="danger">删除</el-button>
                      <el-button @click="updateHouse(item.id)" type="primary">修改</el-button>
                    </p>
                    <p class="address">地理位置：{{item.address}}<span class="review1" v-if="item.reviewed === '1'">审核中...</span><span class="review2" v-if="item.reviewed === '2'">审核通过</span><span class="review3" v-if="item.reviewed === '3'">未通过审核</span></p>
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
import headers from '../Home/components/header.vue'
export default {
  data(){
    return {
      detailInfo:[],
      review:''
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
          console.log(res)
          if(res.data.code === 1){
          let data = res.data.data
          let newRes = []
          data.forEach((item)=>{
            newRes.push(JSON.parse(item))
          })
          this.detailInfo = newRes
          console.log(this.detailInfo)
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
        }
  },
  mounted () {
        axios.post('http://localhost:3000/house/GetUserHouse',{
            username:this.getCookie('user')
          }).then(this.getSuccessInfo,(err)=>console.log(err))
  }
}
</script>

<style scoped lang="stylus">
.main >>> .el-button
    padding .3rem .5rem
    font-size .35rem
    border-radius .1rem
.top
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background: linear-gradient(to right, rgb(255, 113, 74) 2%, rgb(252, 66, 66) 97%); 
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem

.main
    width 100%
    height 20rem
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding .25rem
    overflow scroll
    font-size .35rem
    .detail
        width 32%
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
            .address
                  .review1,.review2,.review3
                      float right
                      font-size .45rem
                  .review1
                      color #cccccc
                  .review2
                      color #85ce61
                  .review3
                      color red
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
