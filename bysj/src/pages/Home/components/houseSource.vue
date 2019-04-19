<template>
    <div class="hourseSource" id="maodian1">
        <div class="house" v-for="(item,idx) of msg" :key="idx">
            <div class="top"><span>最新房源信息</span></div>
            <div class="center">
                <ul>
                    <li v-for="item of houseSource" :key="item.id" @click="toDetail(item.id)">
                        <img :src="item.imgUrl" alt="">
                        <p class="size">{{item.houseLarge}}</p>
                        <p class="address">地理位置：
                          {{item.address}}
                        </p>
                        <p class="phone">联系电话：{{item.phone}}
                          <span class="report" @click.stop="report(item.id)">举报</span>
                        </p>
                        <p>联系人：{{item.username}}
                        </p>
                        <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                    </li>
                </ul>
            </div>
        </div>
             <el-dialog title="请输入举报理由" :visible.sync="reportInfo">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="举报理由"
                v-model="textareaReport"
                resize="none">
            </el-input>
            <el-button type="primary" class="reportBtn" @click="submitReport">提交</el-button>
          </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        msg:[1],
        houseSource:[],
        reportInfo:false,
        textareaReport:'',
        report_hourse_id:''
    }
  },
  props:['sendData'],
  methods:{
      toDetail (x) {
          this.$router.push({name:'houseDetail',query:{id:x}})
      },
      getAllHouseInfo (res) {
        let data = res.data.data
        let newRes = []
        data.forEach((item)=>{
            newRes.unshift(JSON.parse(item))
          })
        this.houseSource = newRes
      },
      report(x){
        this.reportInfo = true
        this.report_hourse_id = x
      },
      submitReport (){
        if(!this.textareaReport){
          this.$message({
            message:'请输入举报理由'
          })
        }else{
            axios.post('http://localhost:3000/report/InsertReportInfo',{
            house_id:this.report_hourse_id,
            who_report:this.getCookie('user'),
            textareaReport:this.textareaReport
          }).then(this.getAllReportInfo,(err)=>console.log(err))
        }
      },
      getAllReportInfo(res){
        console.log(res)
        this.$message({
          type:'success',
          message:res.data.msg
        })
        this.reportInfo = false
        this.textareaReport = ''
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
        setDetailSearch (res) {
          this.houseSource = res
          this.$message({
            type:'success',
            message:'数据更新成功，请在房源信息处查看'
          })
        }
  },
  mounted () {
            axios.post('http://localhost:3000/house/GetAllHouse',{
            msg:1
          }).then(this.getAllHouseInfo,(err)=>console.log(err))
}
}
</script>
<style lang="stylus" scoped>
.hourseSource >>> .el-dialog
    border-radius .25rem
    width 40%
.hourseSource >>> .el-dialog__body
    height 4rem
.hourseSource >>> .reportBtn 
    float right
    margin-top .5rem
.house
    width 100%
    margin-top 1rem
    font-size .35rem
    .top
        width 100%
        line-height 1.25rem
        background #c0ac85
        border-radius .175rem .175rem 0 0
        color:#ffff
        span
          margin-left .25rem
    .center
        width 100%
        height 17.5rem
        background #ffffff
        border 1px solid #e5e5e5
        box-sizing border-box
        overflow scroll
        ul li
          list-style none
          width 20.8vw
          height 18vw
          padding 0
          float left
          margin .25rem 0 0 .275rem
          margin-bottom .5rem
          position relative
          cursor pointer
          img 
            width 100%
            height 69%
          p
            font-size .35rem
            color #999
            line-height .5rem
            .report
              color red
              float right 
              margin-right .5rem
              z-index 99
              color #409EFF
          .bPrice
            text-align right 
            display inline-block
            position absolute
            bottom  -0.175rem
            right 0
            font-size .35rem
            color #999
          .price
            color orange
            font-size .75rem
    .center::-webkit-scrollbar 
        width: 0px;
        height: 0px;
</style>
