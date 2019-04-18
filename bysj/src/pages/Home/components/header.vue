<template>
 <div class="headers">
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple-light">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#232836"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
            <el-submenu index="2">
                <template slot="title">我要找房</template>
                <el-menu-item index="2-1">搜索房源信息</el-menu-item>
                <el-menu-item index="2-2">显示所有房源信息</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">我要出租</template>
                <el-menu-item index="3-2">发布房源信息</el-menu-item>
                <el-menu-item index="3-3">管理已发布的房源</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">个人中心</template>
                <el-menu-item index="4-1">个人信息管理</el-menu-item>
            </el-submenu>
            <el-submenu index="5" v-if="ifadmin">
                <template slot="title">管理员权限</template>
                <el-menu-item index="5-1">审核用户个人及房源信息</el-menu-item>
                <el-menu-item index="5-2">受理用户举报信息</el-menu-item>
            </el-submenu>
            </el-menu>
              <transition
              name="custom-classes-transition"
              enter-active-class="animated bounceInLeft"
              leave-active-class="animated bounceOutRight"
            >
              <div class="search" v-show="searchShow">
                <input type="text" v-model="searchInfo" placeholder="请输入地区如省、市、区">
                <el-button @click="searchSource">搜索</el-button> 
                </div>
              </transition>
            <div class="lgr" v-show="!haveSession">
                <router-link to="/login">登录</router-link>/
                <router-link to="/register">注册</router-link>
            </div>
            <div class="lgr" v-show="haveSession">
              <router-link to="/unreadInfo">
                <i class="el-icon-message" ></i>
              </router-link>
              <span class="unreadMsg" v-if="false" >{{unreadMsg2}}</span>
              Hello，{{name}}
              <span class="exit" @click="handleExit">[退出]</span>
            </div>
        </div>
        <div class="top" v-show="mapShow">
          <span>您当前的位置为:  <span class="detailAdd">{{locationAdd}}</span></span>
          <i class="el-icon-error" @click="close"></i>
        </div>
        <div class="center" v-show="mapShow">
            <div id="l-map"></div>
        </div>
    </el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
   
</div>   
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: 'a',
      haveSession:false,
      activeIndex:'1',
      unreadMsg1:0,
      unreadMsg2:0,
      isActive:true,
      ifadmin:false,
      mapShow:false,
      adds:[],
      locationAdd:'',
      searchShow:false,
      searchInfo:''
    }
  },
  methods: {
     getInfo (res) {
       if(this.getCookie('session_id')){
         this.haveSession = true
         this.name = this.getCookie('user')
         this.$emit('getN',this.name)
         this.$emit('hasSess',this.haveSession)
       }else{
         this.haveSession = false
       }
     },
     handleSelect (key,path) {
       if(key === '4-1'){
         this.$router.push('/userInfo')
       }
       if(key === '3-2'){
         this.$router.push('/submitHouse')
       }
        if(key === '3-3'){
         this.$router.push('/manageHouse')
       }
        if(key === '5-1'){
         this.$router.push('/manageUserHouse')
       }
        if(key === '5-2'){
         this.$router.push('/manageUserReport')
       }
         if(key === '2-2'){
           this.mapShow = true
       }
         if(key === '2-1'){
           this.searchShow = !this.searchShow
       }
     },
     handleExit () {
       axios.defaults.withCredentials = true//允许跨域访问
        axios.post('http://localhost:3000/users/Exit',{
            msg:'exit',
          }).then(this.Exitinfo,(err)=>console.log(err))
     },
     Exitinfo (res) {
       this.$message({
              type:'success',
              message:res.data.msg
              })
       this.setCookie('session_id','',-1)
       this.setCookie('user','',-1)
       this.ifadmin = false
       if(this.getCookie('session_id')){
         this.haveSession = true
         this.name = res.data.sess
         this.$emit('hasSess',this.haveSession)
       }else{
         this.haveSession = false
         this.$emit('hasSess',this.haveSession)
       }
     },
     getAppointmentInfo (res) {
       const data = res.data
       if(data.code === 0){
         this.$message(data.data)
       }else{
      axios.post('http://localhost:3000/appointment/GetAppointmentReply',{
         username:this.getCookie('user'),
       }).then(this.getAppointmentReply,(err)=>console.log(err))
         this.unreadMsg1 =  data.data.length
       }
     },
     getAppointmentReply (res) {
       const data = res.data
       if(data.code === 0){
         this.$message(data.data)
       }else{
         this.unreadMsg2 =  data.data.length + this.unreadMsg1
       }
     },
     searchSource () {
          axios.post('http://localhost:3000/house/GetAddHouseSource',{
            address:this.searchInfo
          }).then(this.getAddHouseSource,(err)=>console.log(err))
     },
     getAddHouseSource (res) {
       const data = res.data.data
       let newDataArr = []
       data.forEach((item)=>{
         newDataArr.push(JSON.parse(item))
       })
          this.$emit('handleData',newDataArr)
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
   setCookie (name, value, day) {
   if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
     var expires = day * 24 * 60 * 60 * 1000;
     var date = new Date(+new Date()+expires);
     document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
   }else{
     document.cookie = name + "=" + escape(value);
    }
  },
  mapInfo () {
        let _this = this
        var map = new BMap.Map("l-map");

        //定位
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.centerAndZoom(new BMap.Point(r.point.lng,r.point.lat), 13);
            var point1 = new BMap.Point(r.point.lng,r.point.lat);
            var geoc = new BMap.Geocoder();   
            geoc.getLocation(point1,function (rs) { 
              var addComp = rs.addressComponents;
              _this.locationAdd = addComp.province + addComp.city +  addComp.district +  addComp.street + addComp.streetNumber
            })
          }        
      },{enableHighAccuracy: true}) 
        map.enableScrollWheelZoom(true);
        var myGeo = new BMap.Geocoder();
        this.adds.forEach((item)=>{
            myGeo.getPoint(item, function(point){
            if (point) {
              var address = new BMap.Point(point.lng, point.lat);
              addMarker(address,new BMap.Label(item,{offset:new BMap.Size(20,-10)}));
            }
          }, "济南市");
        })
        
        // 编写自定义函数,创建标注
        function addMarker(point,label){
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
          marker.setLabel(label);
        }




  },
  close () {
    this.mapShow = false
  },
  getAllHouseInfo(res){
    const data = res.data.data
    let newArr = []
    data.forEach((item) =>{
      let newData = JSON.parse(item)
      newArr.push(newData.address)
    })
    this.adds = newArr
    this.mapInfo()
  }
  },
  mounted () {
    this.getInfo()
                axios.post('http://localhost:3000/house/GetAllHouse',{
            msg:1
          }).then(this.getAllHouseInfo,(err)=>console.log(err))
       axios.defaults.withCredentials = true//允许跨域访问
       axios.post('http://localhost:3000/appointment/GetAppointmentInfo',{
           username:this.getCookie('user'),
         }).then(this.getAppointmentInfo,(err)=>console.log(err))
    if(this.getCookie('user') === 'admin'){
      this.ifadmin = true
    }else{
      this.ifadmin = false
    }
  }
}

</script>
<style lang="stylus" scoped>
.headers >>> .el-menu--horizontal>.el-submenu .el-submenu__title
  height 1.5rem
  line-height 1.5rem
  width 2.9rem
  margin 0 .5rem
.headers >>> .el-menu-item.is-active
  height 1.5rem
  line-height 1.5rem
  width 2.9rem
  text-align center
  font-size .35rem
.headers >>> .el-submenu__title
  text-align center
  font-size .35rem
.headers >>> .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow
  text-align center
  font-size .35rem
.headers >>> .el-menu-item
  height 1.5rem
  line-height 1.5rem
  width 2.9rem
  text-align center
  font-size .35rem
.top
    width 100%
    line-height 1.25rem
    height 1.25rem
    background linear-gradient(to right, #12d2c6 2%, #0ebed4 97%) #12d2c6
    border-radius .175rem .175rem 0 0
    color:#ffff
    margin-top .25rem
    font-size .35rem
    z-index 999
    position relative
    span
      margin-left .25rem
.center
    width 100%
    height 10rem
    background #ffffff
    border 1px solid #e5e5e5
    box-sizing border-box
    overflow scroll
    z-index 999
    position relative
  #l-map
    width 100%
    height 10rem
    z-index 999
  .el-icon-error 
    z-index 1999
    position absolute
    right .4rem
    top .4rem
    cursor pointer
  a
    text-decoration none
  .el-row 
    margin-bottom: .5rem;
    &:last-child 
      margin-bottom: 0; 
  .bg-purple-dark 
    background: #99a9bf;
  .bg-purple 
    background: #232836;
  .bg-purple-light 
    background: #232836;
    position relative
    height 1.5rem
    .search
      width 7.5rem
      height 1.5rem
      position absolute
      top 0
      right 5rem
      margin .25rem
      input
        width 60%
        height 60%
        outline none
        border-radius .75rem
        padding-left .25rem
        font-size .35rem
      .el-button
        padding .3rem .5rem
        border-radius .5rem
        font-size .35rem
        margin-left .1rem
    @media screen and (max-width: 820px) 
      .search
          position absolute
          top 0
          right -8rem
    .lgr
        display inline
        position absolute
        top 0
        right 0
        line-height 1.5rem
        color #79829a
        font-size .35rem
        font-weight normal
        a
            color #79829a
            text-decoration none
        a:hover
            text-decoration underline
            color #ffffff
        .exit
            color #79829a
            font-size .35rem
            font-weight normal
            cursor pointer
        .exit:hover
            text-decoration underline
            color #ffffff
        i
          font-size .425rem
        .unreadMsg
          color #ffffff
          position absolute
          left -0.3rem
          top .275rem
          background rgba(255,0,0,0.8)
          line-height .45rem
          width  .45rem
          text-align center
          border-radius 50%
          display inline-block
          font-size 1px
  .grid-content 
    min-height: 1.5rem;
  .center::-webkit-scrollbar 
      width: 0px;
      height: 0px;
</style>
