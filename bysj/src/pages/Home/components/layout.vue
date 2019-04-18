<template>
   <div class="guide">
    <el-row>
        <el-col :span="24" class="cols">
            <el-row >
            <el-col :span="14" class="left">
                <el-carousel height="6.125rem" :interval="2000">
                    <el-carousel-item v-for="item in img" :key="item" :style="{background:`url(${item})`,backgroundSize:'19.55rem 6.125rem'}">
                    <router-link to="/"></router-link>
                </el-carousel-item>
                </el-carousel>
                </el-col> 
            <el-col :span="4" class="center"></el-col> 
            <el-col :span="6" class="right">
                <img src="http://img.mp.itc.cn/q_70,c_zoom,w_640/upload/20161229/6c94cbbac2ce4bed869b50e75aa431b6.gif" alt="" v-show="sendSess">
                <img src="../../../assets/xly.png" alt="" v-show="!sendSess">
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
export default {
  data(){
    return{
      img:["http://dingyue.nosdn.127.net/EXbMgD1sjZb8zZMMsmUnIDnyC6wgAM8MCSXVNR7MMaFVW1537756382272.jpeg",
      "http://static.leiphone.com/uploads/new/article/740_740/201508/55d18b5762137.jpg",
      "http://dingyue.nosdn.127.net/=W=vpeOIX5VbmFNfBjcyN80sfS8qGf6NjbGNnMlSNL1UR1537756383057.jpeg"
      ],
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
    margin-top: .25rem;
    height: 10.6rem;
    font-size: .35rem
}
.el-row{
  height: 4.675rem;
  display: flex
}
.el-col{
  height: 100%;
  margin-right: .25rem;
}
.cols{
    margin-right: 0;
}
.el-row:nth-child(1){
  height: 6.125rem;
}
.el-row:nth-child(1)>.left a {
  display: block;
  width: 100%;
  height: 100%;
}
.el-row:nth-child(1)>.center {
  background:url(../../../assets/kj.jpg) no-repeat;
  background-size:100% 100%;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(1)>.right {
  text-align: center;
  background: #fff;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
}
.el-row:nth-child(1)>.right img{
  width: 1.5rem;
border-radius: 50%;
margin-top: .75rem;
}
.el-row:nth-child(1)>.right p{
margin-top: .25rem;
}
.el-row:nth-child(1)>.right a{
  display: block;
  border: 1px solid #e5e5e5;
  width: 3.075rem;
  line-height: 1rem;
  border-radius: .5rem;
  text-align: center;
  margin: 0 auto;
  color: #333;
  margin-top: .25rem;
}
.el-row:nth-child(1)>.right a:hover{
  background:rgba(153, 153,153, 0.1);
}
.el-row>.left-center {
  background: purple;
}
.el-row:nth-child(2)>.middle>.left {
   background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555411467719&di=36d62ffb38eecd63e9f75d37f9690a33&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F901bc660543247cab8849de055e74b0c5a21edbe26ede-wezOCF_fw658) no-repeat;
  background-size:100% 100%;
  display: inline-block;
  width: calc(50% - 5px);
  height: 100%;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(2)>.middle>.right{
  background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555411585339&di=85ab4bb19a48ae5ae32d7c30b8d54cd6&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F00%2F04%2F21%2F8656223b0e52fb5.jpg) no-repeat;
  background-size:100% 100%;
  margin-left:.125rem ;
  border: 1px solid #e5e5e5;
  float:right;
}
.el-row:nth-child(2)>.center {
  background:url(http://img.sc115.com/uploads/allimg/110620/2011062022355967.jpg) no-repeat;
  background-size:100% 100%;
  border: 1px solid #e5e5e5;
}
.el-row:nth-child(2)>.right {
  text-align: center;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  box-sizing: border-box
}
.el-row:nth-child(2)>.right>p:nth-of-type(1){
  font-size: .375rem
}
.el-row:nth-child(2)>.right>p:nth-of-type(2){
  font-size: .3rem
}
.el-row:nth-child(2)>.right>p>span{
  color:red
}
.el-row:nth-child(2)>.right>img {
  margin-top: .375rem;
  width: 2.5rem;
}
.el-row:nth-child(2){
  margin-top: .25rem;
  height: 4.225rem;
}
a{
  text-decoration: none
}
@media screen and (max-width: 716px) {
  .el-row:nth-child(1)>.right a{
      line-height: .5rem
  }
}

</style>