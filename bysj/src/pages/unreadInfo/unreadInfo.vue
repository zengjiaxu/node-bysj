<template>
   <div>
     <my-header></my-header>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>您待处理的预约</span></div>
          <div class="main">
            <ul class="appointmentInfoTop">
              <li>预约人</li>
              <li>预约人手机号</li>
              <li>预约时间</li>
              <li>预约的住房信息</li>
              <li>是否接受</li>
            </ul>
            <ul>
              <li v-for="item of appointmentInfo" :key="item.id">
                <ul class="appointmentInfo">
                  <li><i class="el-icon-sort"></i>{{item.appointment_user}}</li>
                  <li><i class="el-icon-mobile-phone"></i>{{item.appoint_msg_phone}}</li>
                  <li><i class="el-icon-date"></i>{{item.appoint_msg_date}}</li>
                  <li><i class="el-icon-location"></i>{{item.which_house}}</li>
                  <li class="btn">
                    <el-button type="success" @click="yes(item.id)">接受</el-button>
                    <el-button type="info" @click="no(item.id)">拒绝</el-button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="top1"><span>我收到的预约回复</span></div>
          <div class="main">
            <ul>
              <li v-for="item of appointmentReply" :key="item.id">
                <ul class="appointmentInfo newreplyInfo">
                  <li><span class="infoReply"><span>{{item.receive_user}}</span> 已<span class="is" v-if="item.return_msg === '1' ? true :false"> 接受 </span><span class="no" v-if="item.return_msg === '1' ? false :true"> 拒绝 </span>您的关于住房 <span>{{item.which_house}}</span> 的预约<span v-if="item.return_msg === '1' ? true :false">，请于 <span class="isDate">{{item.appoint_msg_date}}</span> 准时赴约</span></span><i v-bind:class="[item.return_msg === '1' ? eliconsuccess :eliconerror,item.return_msg === '1' ? blueIcon :redIcon,]"></i></li>
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
import { async } from 'q';
import myHeader from '../Home/components/header.vue'
export default {
  data(){
    return {
      appointmentInfo:[],
      appointmentReply:[],
      eliconsuccess:'el-icon-success',
      eliconerror:'el-icon-error',
      blueIcon:'blueIcon',
      redIcon:'redIcon'
    }
  },
  components:{
    myHeader
  },
  methods:{
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
        getAppointmentInfo (res) {
          const data = res.data
          if (data.code === 0) {
            this.$message(data.data)
         }else{
           let newRepArr = []
           data.data.forEach((item)=>{
           let realData = JSON.parse(item)
           realData.appoint_msg_date = this.toBeijingTime(realData.appoint_msg_date)
           newRepArr.unshift(realData)
          })
        this.appointmentInfo = newRepArr
         }
        },
        yes (x) {
          let id = x
          this.$confirm('接受预约后，如未能赴约请提前联系其本人, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          axios.post('http://localhost:3000/appointment/UpdateAppointmentInfo',{
           id,
           return_msg:1,
           username:this.getCookie('user')
         }).then(this.updateAppointmentInfo,(err)=>console.log(err))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });     
          }); 
          },
          updateAppointmentInfo (res) {
              console.log(res)
                 this.$message({
              type: 'success',
              message: res.data.msg
            });
          axios.post('http://localhost:3000/appointment/GetAppointmentInfo',{
           username:this.getCookie('user'),
         }).then(this.getAppointmentInfo,(err)=>console.log(err))
          },
          no (x) {
            let id = x
            this.$confirm('确认拒绝吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
          axios.post('http://localhost:3000/appointment/UpdateAppointmentInfo',{
           id,
           return_msg:2,
           username:this.getCookie('user')
         }).then(this.updateAppointmentInfo,(err)=>console.log(err))
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            }); 
          },
          getAppointmentReply (res) {
            const data = res.data
            console.log(data)
            let newRepArr = []
           data.data.forEach((item)=>{
             let realData = JSON.parse(item)
             realData.appoint_msg_date = this.toBeijingTime(realData.appoint_msg_date)
           newRepArr.unshift(realData)
          })
          this.appointmentReply = newRepArr
          console.log(this.appointmentReply)
          },
         toBeijingTime(utc_datetime) {
          // 转为正常的时间格式 年-月-日 时:分:秒
          var T_pos = utc_datetime.indexOf('T');
          var Z_pos = utc_datetime.indexOf('Z');
          var year_month_day = utc_datetime.substr(0,T_pos);
          var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
          var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

          // 处理成为时间戳
          timestamp = new Date(Date.parse(new_datetime));
          timestamp = timestamp.getTime();
          timestamp = timestamp/1000;

          // 增加8个小时，北京时间比utc时间多八个时区
          var timestamp = timestamp+8*60*60;

          // 时间戳转为时间
          var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
          return beijing_datetime; // 2017-03-31 16:02:06
} 
    },
  mounted () {
       axios.post('http://localhost:3000/appointment/GetAppointmentInfo',{
           username:this.getCookie('user'),
         }).then(this.getAppointmentInfo,(err)=>console.log(err))
        axios.post('http://localhost:3000/appointment/GetAppointmentReply',{
           username:this.getCookie('user'),
         }).then(this.getAppointmentReply,(err)=>console.log(err))
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
    background: linear-gradient(to right, rgb(0, 191, 255) 22%, rgb(135 ,206, 250) 97%); 
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem
.top1
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background: linear-gradient(to right, #12d2c6 2%, #0ebed4 97%) #12d2c6 
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem
.main
    width 100%
    height 12.5rem
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding .25rem
    overflow scroll
    font-size .35rem
    .appointmentInfoTop
      display flex
      li
        flex 1
        list-style none
        text-align center
        font-weight bolder
    ul li
      line-height 1.25rem
      border-bottom 1px solid #ddd
      .appointmentInfo
          display flex
          li
            flex 1
            list-style none
            line-height 1.25rem
            text-align center
            .blueIcon
              color #409EFF
            .redIcon
              color red
          .btn
              text-align center
              .el-button
                line-height .25rem
            .infoReply
                margin-right .25rem
                width 84%
                display inline-block
                text-align left 
                span 
                  color orange
                .is
                  color #67C23A
                .no
                  color red
                .isDate
                  color #909399
.main::-webkit-scrollbar 
        width: 0px;
        height: 0px; 
</style>
