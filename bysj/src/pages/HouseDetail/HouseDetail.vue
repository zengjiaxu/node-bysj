<template>
 <div class="HouseDetail">
     <my-header></my-header>
    <el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>房源详细信息</span></div>
          <div class="main">
              <div class="detail">
                <div class="img">
                    <img :src="imgUrl" alt="">
                </div>
                <div class="info">
                    <p class="size">{{houseLarge}}</p>
                    <p class="address">地理位置：{{address}}</p>
                    <p class="phone">联系电话：{{phone}}</p>
                    <p class="bPrice"><span class="price">￥{{price}}</span>/月</p>
                    <el-button type="warning" round @click="appointment">预约</el-button>
                </div>
              </div>
              <div id="allmap"></div>
          </div>
          <div class="subscribe">
              <div class="top1"><span>留言板</span></div>
            <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea"
            resize="none">
            </el-input>
            <el-button type="primary" @click="submitScribe">留言</el-button>
          </div>
          <div class="commenContainer">
              <ul>
                  <li v-for="item of commen" :key="item.id">
                      {{item.message}}
                      <div class="replyDetailInfo" v-for="p_list of replyArr" :key="p_list.id" v-if="ifEqul(item.id,p_list.self_id)">
                            {{p_list.message}}
                            
                            <span class="whoSub" >
                                <span class="whoRep">回复人：</span>
                                {{p_list.username}}
                            </span>
                            <span class="fz" v-if="p_list.username === sourceUser">({{fz}})</span>
                      </div>
                      <el-button type="info" @click="handleReplyInfo(item.id)">回复</el-button>
                      <span class="userDetail">发布人：{{item.username}}</span>
                      <span class="timeDetail">{{item.time}}</span>
                  </li>
              </ul>
          </div>
          <el-dialog title="请输入回复内容" :visible.sync="replyInfo">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="内容"
                v-model="textareaReply"
                resize="none">
            </el-input>
            <el-button type="primary" class="replyBtn" @click="submitReply">提交</el-button>
          </el-dialog>

           <el-dialog title="请输入以下信息" :visible.sync="dateInfo">
            <el-date-picker
                v-model="datevalue"
                type="datetime"
                placeholder="选择预约时间">
            </el-date-picker>
            <el-form :label-position="labelPosition" label-width="0px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
                <el-form-item label="" prop="yourPhone">
                    <el-input v-model="formLabelAlign.yourPhone" placeholder="输入联系电话"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="replyBtn" @click="submitAppoint">马上预约</el-button>
          </el-dialog>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import myHeader from '../Home/components/header.vue'
import axios from 'axios'
export default {
  data () {
    return {
        id:'',
        address:'',
        houseLarge:'',
        phone:'',
        price:'',
        jd:'',
        wd:'',
        imgUrl:'',
        textarea:'',
        commen:[],
        replyInfo:false,
        dateInfo:false,
        datevalue:'',
        textareaReply:'',
        sourceUser:'',
        self_id:'',
        replyArr:[],
        fz:'房主',
        labelPosition:'left',
        formLabelAlign:{
            yourPhone:''
        },
        rules:{
        yourPhone:[
            { required: true,type: 'string', message: '请输入手机号', trigger: 'blur' },
            {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '手机格式有误',trigger:'blur'
            }
        ]
        }
    }
  },
  components:{
      myHeader
  },
  methods:{
    getSuccessInfo(res){
        let data =JSON.parse(res.data.data)
        this.address = data.address
        this.houseLarge = data.houseLarge
        this.phone = data.phone
        this.price = data.price
        this.sourceUser = data.username
        this.imgUrl = data.imgUrl
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        var localSearch = new BMap.LocalSearch(map); //查找位置
        var _this = this
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.NavigationControl());	  
        map.setCurrentCity("北京");          // 设置地图显示的城市 
        map.enableScrollWheelZoom(true)

        //获取地址的经纬度
        var localSearch = new BMap.LocalSearch(map);
        var keyword = this.address
        localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        _this.jd =  poi.point.lng 
        _this.wd =  poi.point.lat
        
        //根据经纬度确定地址
            map.clearOverlays(); 
            var new_point = new BMap.Point(_this.jd,_this.wd);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point); 
        });
        localSearch.search(keyword); 
      },
      submitScribe () {
          if(this.textarea){
            axios.post('http://localhost:3000/commen/InsertCommenInfo',{
            username:this.getCookie('user'),
            message:this.textarea,
            id:this.id,
            time:this.getTime()
            }).then(this.insertSuccessInfo,(err)=>console.log(err))
          }else{
              this.$message('请输入内容')
          }

      },
      handleReplyInfo (selfId) {
          if(this.getCookie('user')){
            this.replyInfo = true
            this.self_id = selfId
            this.textareaReply = ''
          }else{
              this.$message('请先登录')
          }

      },
      submitReply () {
          if(this.textareaReply){
            axios.post('http://localhost:3000/reply/InsertReplyInfo',{
            username:this.getCookie('user'),
            message:this.textareaReply,
            to_who:this.sourceUser,
            self_id:this.self_id
            }).then(this.insertReplyInfo,(err)=>console.log(err))
          }else{
              this.$message('请输入内容')
          }
      },
      insertReplyInfo (res) {
          this.replyInfo = false
          const data = res.data.msg
        axios.post('http://localhost:3000/reply/GetAllReply',{
           id:this.id
         }).then(this.getAllReply,(err)=>{console.log(err)})
          this.$message({
              type:'success',
              message:data
          })
      },
      insertSuccessInfo (res) {
        axios.post('http://localhost:3000/commen/GetIdCommen',{
           id:this.id
         }).then(this.getAllCommen,(err)=>{console.log(err)})
         this.textarea=''
          this.$message({
              type:'success',
              message:res.data.msg
              })
      },
      getAllCommen(res){
        let data = res.data.data
        let newRes = []
        data.forEach((item)=>{
            newRes.unshift(JSON.parse(item))
          })
        this.commen = newRes
      },
      getAllReply (res) {
        let data = res.data.data
        let newRepArr = []
        data.forEach((item)=>{
            newRepArr.unshift(JSON.parse(item))
          })
        this.replyArr = newRepArr
      },
      appointment(){
        if(this.getCookie('user')){
            if(this.getCookie('user') === this.sourceUser){
                this.$message('您不能预约自己')
            }else{
                this.dateInfo = true
                this.yourPhone = ''
                this.value1 = ''
            }
        }else{
            this.$message('请登录')
        }
          
      },
      submitAppoint(){
        this.$refs.ruleForm.validate((val)=>{
            if(val){
                    axios.defaults.withCredentials = true//允许跨域访问
                    axios.post('http://localhost:3000/appointment/InsertAppointmentInfo',{
                         appointment_user:this.getCookie('user'),
                        receive_user:this.sourceUser,
                        appoint_msg_date:this.datevalue,
                        appoint_msg_phone:this.formLabelAlign.yourPhone,
                        which_house:this.address
                    }).then(this.insertAppointInfo,(err)=>console.log(err))
            }else{
                this.$message('请根据提示输入正确的手机号')
            }
    })
      },
      insertAppointInfo(res){
        console.log(this.datevalue) 
          const data = res.data
          if(data.code === 1){
              this.$message({
                  type:'success',
                  message:data.msg
              })
              this.dateInfo = false
          }else{
              this.$message('预约无效')
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
        getTime () {
            let date = new Date()
            let year = date.getFullYear()
            let mon = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours() //小时 
            let minu = date.getMinutes() //分 
            let sec = date.getSeconds() //秒
            let time = `${year}/${mon}/${day} ${hour}:${minu}:${sec}`
            return time
        }
  },
  created(){
      this.id = this.$route.query.id    
  },
  mounted() {
      //获取数据
        axios.post('http://localhost:3000/house/GetIdHouse',{
        id:this.id
        }).then(this.getSuccessInfo,(err)=>console.log(err))

        
        axios.post('http://localhost:3000/commen/GetIdCommen',{
           id:this.id
         }).then(this.getAllCommen,(err)=>{console.log(err)})

        axios.post('http://localhost:3000/reply/GetAllReply',{
           id:this.id
         }).then(this.getAllReply,(err)=>{console.log(err)})
  },
  computed:{
     ifEqul(){
         return function (a,b) {
         if(a === b){
             return true
         }
         }
     }
  }
}

</script>
<style scoped lang="stylus">
.subscribe >>> .el-textarea__inner
    padding-right 2.125rem
.subscribe >>> .el-button
    position absolute
    right .125rem
    bottom .125rem
    line-height 1px
.commenContainer >>> .el-button
    position absolute
    right .125rem
    bottom .125rem
    line-height 1px
.HouseDetail >>> .el-dialog__body
    height 4rem
.HouseDetail >>> .el-date-editor
    margin-bottom .5rem
.HouseDetail >>> .el-dialog
    border-radius .25rem
    width 40%
.top
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background: linear-gradient(to right, rgb(243, 182, 74) 2%, rgb(242, 197, 69) 97%) rgb(243, 182, 74)
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem
.top1
    width 100%
    line-height 1.25rem
    margin-top .5rem
    background linear-gradient(to right, rgb(18, 210, 198) 2%, rgb(14, 190, 212) 97%) rgb(18, 210, 198);
    border-radius .175rem .175rem 0 0
    color:#ffff
    font-size .35rem
    span
        margin-left .25rem
.main
    width 100%
    height 12rem
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding .25rem
    .detail
        width 44%
        height 100%
        float left
        margin 0
        .img 
            width 100%
            height 70%
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
            .el-button
                position absolute
                top 0
                right 0
    #allmap
        width 55%
        height 100%
        background #000
        float right
.subscribe
    position relative
.commenContainer ul li
    width 100%
    min-height 1.5rem
    margin-top .125rem
    border-radius .125rem
    border 1px solid #ddd
    list-style none
    padding .25rem
    box-sizing border-box
    font-size .375rem
    color #000
    position relative
    .userDetail
        position absolute
        right 3.125rem
        bottom .75rem
        color #cccccc
        font-size  .25rem
    .timeDetail
        position absolute
        right 3.125rem
        bottom .125rem
        color #cccccc
        font-size  .25rem
    .replyDetailInfo
        margin-left .5rem
        font-size .325rem
        color #000
        min-height .25rem
        margin-top .2rem
        padding-left .2rem
        border-left 0.075rem solid #ccc
        width:75%
        position relative
        .whoSub
            font-size 0.325rem
            color #cccccc
            margin-left 1.25rem
            position absolute
            right 0.625rem
            bottom 0.125rem
            .whoRep
                color #000
                font-size .325rem
        .fz
            color orange
            position absolute
            right -0.325rem
            bottom .125rem
.replyBtn
    float right
    margin-top .375rem
</style>
