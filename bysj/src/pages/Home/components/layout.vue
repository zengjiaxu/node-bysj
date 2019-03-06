<template>
   <div class="guide">
    <el-row>
        <el-col :span="24" class="cols">
            <el-row >
            <el-col :span="14" class="left">
                <el-carousel height="245px" :interval="2000">
                    <el-carousel-item v-for="item in img" :key="item" :style="{background:`url(${item})`,backgroundSize:'cover'}">
                    <router-link to="/"></router-link>
                </el-carousel-item>
                </el-carousel>
                </el-col> 
            <el-col :span="4" class="center"></el-col> 
            <el-col :span="6" class="right">
                <!-- <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
                <p>Hi! 你好</p>
                <router-link to="/register">注册</router-link>
                <router-link to="/login">登录</router-link> -->
            </el-col> 
            </el-row>
            <el-row>
                <el-col :span="14" class="middle">
                <div class="left"></div>
                <div class="left right"></div>
                </el-col> 
                <el-col :span="4" class="center"></el-col> 
                <el-col :span="6" class="right">
                <!-- <img src="http://s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="">
                <p>美团手机app版本</p>
                <p> <span>1元起</span> 吃喝玩乐</p> -->
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
      img:[
      "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg",
      "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg",
      "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg",
      "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg",
      "https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png"
      ]
    }
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
  background:url(http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg) no-repeat;
  background-size:cover;
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
   background:url(http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png) no-repeat;
  background-size:cover;
  display: inline-block;
  width: calc(50% - 5px);
  height: 100%;
}
.el-row:nth-child(2)>.middle>.right{
  background:url(http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg) no-repeat;
  background-size:cover;
  margin-left:5px ;
}
.el-row:nth-child(2)>.center {
   background:url(http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg) no-repeat;
  background-size:cover;
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