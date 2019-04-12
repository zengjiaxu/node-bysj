<template>
   <div>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>待受理的举报信息</span></div>
          <div class="main">
              <ul class="replyInfo replyInfo1">
                  <li>房源编号</li>
                  <li>举报人</li>
                  <li>举报理由</li>
                  <li>操作</li>
              </ul>
              <ul>
                  <li v-for="item of reportInfo" :key="item.id">
                      <ul class="replyInfo">
                          <li>{{item.house_id}}</li>
                          <li>{{item.who_report}}</li>
                          <li>{{item.textareaReport}}</li>
                          <li>
                            <el-button @click="successReport(item.id)" type="success">通过</el-button>
                            <el-button @click="failedReport(item.id)" type="info">不通过</el-button>
                            <el-button @click="failedReport(item.id)" type="primary">展开房源信息</el-button>
                          </li>
                      </ul>
                  </li>
              </ul>
            <!-- <div v-for="item of detailInfo" :key="item.id">
              <div class="detail">
                <div class="img">
                    <img src="../../assets/fw1.jpg" alt="">
                </div>
                <div class="info">
                    <p class="size">{{item.houseLarge}}
                      <el-button @click="failedReport(item.id)" type="info">不通过</el-button>
                      <el-button @click="successReport(item.id)" type="success">通过</el-button>
                    </p>
                    <p class="address">地理位置：{{item.address}}</p>
                    <p class="phone">联系电话：{{item.phone}}</p>
                    <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                </div>
              </div>
              </div> -->
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
    reportInfo:[],
    detailInfo:[]
    }
  },
  methods:{
      getReportInfo(res){
          const data = res.data.data
          let newArr = []
          data.forEach((item)=>{
              newArr.unshift(JSON.parse(item))
          })
          this.reportInfo = newArr
      }
  },
  mounted () {
        axios.post('http://localhost:3000/report/GetAllReportInfo',{
          msg:1
          }).then(this.getReportInfo,(err)=>console.log(err))
  }
}
</script>

<style scoped lang="stylus">
.top
    width 100%
    line-height 50px
    min-height 50px
    margin-top 20px
    background: linear-gradient(to right, #f3b64a 2%, #f2c545 97%) #f3b64a
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px
.top1
    width 100%
    line-height 50px
    margin-top 20px
    background: #c0ac85
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px

.main
    width 100%
    height 600px
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding 10px
    overflow scroll
    .replyInfo
        display flex
        li
            list-style none 
            flex 1
            border-bottom 1px solid #ccc
            line-height 45px
            text-align center
            .el-button
                padding 8px 18px
    .replyInfo1>li
            font-weight bolder
    .userInfoList
        border-bottom 1px solid #ddd
        display flex
        li
          flex 1
          list-style none
          line-height 45px
          text-align center
          .el-button
              line-height 5px
              text-align center
              padding 12px 8px
    .userInfoList1
        li
          font-weight bolder
    .detail
        width  32%
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
                  margin-left 0
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
