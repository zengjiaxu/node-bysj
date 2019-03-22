<template>
   <div class="guide">
    <el-row>
        <el-col :span="24" class="cols">
            <el-row >
            <el-col :span="14" class="left">
                <el-carousel height="245px" :interval="2000">
                    <el-carousel-item v-for="item in img" :key="item" :style="{background:`url(${item})`,backgroundSize:'782px 245px'}">
                    <router-link to="/"></router-link>
                </el-carousel-item>
                </el-carousel>
                </el-col> 
            <el-col :span="4" class="center"></el-col> 
            <el-col :span="6" class="right">
                <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
                <p>Hi! 你好</p>
                <p v-show="sendSess">{{sendN}}</p>
                <!-- <span class="exit" @click="handleExit">[退出]</span> -->
                <div v-show="!sendSess">
                <router-link to="/register">注册</router-link>
                <router-link to="/login">登录</router-link>
                </div>
            </el-col> 
            </el-row>
            <el-row>
                <el-col :span="14" class="middle">
                <div class="left"></div>
                <div class="left right"></div>
                </el-col> 
                <el-col :span="4" class="center"></el-col> 
                <el-col :span="6" class="right">
                <img src="../../../assets/ewm.png" alt="">
                <p>微信联系客服</p>
                </el-col> 
            </el-row>
        </el-col>
     </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data(){
    return{
      img:["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553146249708&di=c721c0d99882df8beee55393a780f88d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fae51f3deb48f8c54df9fce3130292df5e0fe7f5b.jpg","http://file1.youboy.com/e/2015/5/20/83/940147.png","https://www.oppein.cn/updata/uploads/201501/54ab56dad1551.jpg"],
      newName:''
    }
  },
  props:['sendN','sendSess'],
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
     setCookie (name, value, day) {
     if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
       var expires = day * 24 * 60 * 60 * 1000;
       var date = new Date(+new Date()+expires);
       document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
     }else{
       document.cookie = name + "=" + escape(value);
      }
    },
     getInfo () {
       if(this.getCookie('session_id')){
         this.newName = this.name
       }else{
         this.newName = ''
       }
     }
  },
  mounted (){
      this.getInfo()
  }
}
</script>

<style scoped>
.guide{
    margin-top: 10px;
    height: 424px;
}
.el-row{
  height: 187px;
  display: flex
}
.el-col{
  height: 100%;
  margin-right: 10px;
}
.cols{
    margin-right: 0;
}
.el-row:nth-child(1){
  height: 245px;
}
.el-row:nth-child(1)>.left a {
  display: block;
  width: 100%;
  height: 100%;
}
.el-row:nth-child(1)>.center {
  background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553144434161&di=2b0876ba649d0468038748e36c65489f&imgtype=0&src=http%3A%2F%2Fs8.sinaimg.cn%2Fbmiddle%2F001Sd502zy6Ua1RdIkT07%26690) no-repeat;
  background-size:208px 245px;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(1)>.right {
  text-align: center;
  background: #fff;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  box-sizing: border-box
}
.el-row:nth-child(1)>.right img{
  width: 60px;
border-radius: 50%;
margin-top: 30px;
}
.el-row:nth-child(1)>.right p{
margin-top: 10px;
}
.el-row:nth-child(1)>.right a{
  display: block;
  border: 1px solid #e5e5e5;
  width: 123px;
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
  margin: 0 auto;
  color: #333;
  margin-top: 10px;
}
.el-row:nth-child(1)>.right a:hover{
  background:rgba(153, 153,153, 0.1);
}
.el-row>.left-center {
  background: purple;
}
.el-row:nth-child(2)>.middle>.left {
   background:url(http://img1.cache.netease.com/catchpic/A/AF/AF7D624C76DB2D70F63A027F5C6D7819.png) no-repeat;
  background-size:359px 169px;
  display: inline-block;
  width: calc(50% - 5px);
  height: 100%;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(2)>.middle>.right{
  background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553144810735&di=01ed3cf007ccd39a52109ee29d5d45ec&imgtype=0&src=http%3A%2F%2F91cycn.37cy.com%2Fcy91cycn%2F1806%2F18-06-05%2F201806050924203.jpg) no-repeat;
  background-size:359px 169px;
  margin-left:5px ;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(2)>.center {
  background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553145013428&di=40999aa9986eaa147c491459900b8e06&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D99168c98e350352aa56c2d4b3b2a9187%2Fc75c10385343fbf211f4250cba7eca8064388fc1.jpg) no-repeat;
  background-size:208px 178px;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(2)>.right {
  text-align: center;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  box-sizing: border-box
}
.el-row:nth-child(2)>.right>p:nth-of-type(1){
  font-size: 15px
}
.el-row:nth-child(2)>.right>p:nth-of-type(2){
  font-size: 12px
}
.el-row:nth-child(2)>.right>p>span{
  color:red
}
.el-row:nth-child(2)>.right>img {
  margin-top: 15px;
  width: 100px;
}
.el-row:nth-child(2){
  margin-top: 10px;
  height: 169px;
}
</style>