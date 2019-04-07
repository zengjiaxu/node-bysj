<template>
 <div>
     <my-header></my-header>
    <el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>房源详细信息</span></div>
          <div class="main">
              <div class="detail">
                <div class="img">
                    <img src="../../assets/fw1.jpg" alt="">
                </div>
                <div class="info">
                    <p class="size">{{houseLarge}}</p>
                    <p class="address">地理位置：{{address}}</p>
                    <p class="phone">联系电话：{{phone}}</p>
                    <p class="bPrice"><span class="price">￥{{price}}</span>/月</p>
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
                      <el-button type="info">回复</el-button>
                      </li>
              </ul>
          </div>
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
        textarea:'',
        commen:[]
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
            id:this.id
            }).then(this.insertSuccessInfo,(err)=>console.log(err))

            axios.post('http://localhost:3000/commen/GetIdCommen',{
           id:this.id
            }).then(this.getAllCommen,(err)=>{console.log(err)})
          }else{
              this.$message('请输入内容')
          }

      },
      insertSuccessInfo (res) {
          this.$message(res.data.msg)
      },
      getAllCommen(res){
        let data = res.data.data
        let newRes = []
        data.forEach((item)=>{
            newRes.push(JSON.parse(item))
          })
        this.commen = newRes
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

  }
}

</script>
<style scoped lang="stylus">
.subscribe >>> .el-textarea__inner
    padding-right 85px
.subscribe >>> .el-button
    position absolute
    right 5px
    bottom 5px
    line-height 1px
.commenContainer >>> .el-button
    position absolute
    right 5px
    bottom 5px
    line-height 1px
.top
    width 100%
    line-height 50px
    margin-top 20px
    background: linear-gradient(to right, rgb(243, 182, 74) 2%, rgb(242, 197, 69) 97%) rgb(243, 182, 74)
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px
.top1
    width 100%
    line-height 50px
    margin-top 20px
    background linear-gradient(to right, rgb(18, 210, 198) 2%, rgb(14, 190, 212) 97%) rgb(18, 210, 198);
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px
.main
    width 100%
    height 400px
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding 10px
    .detail
        width 44%
        height 100%
        float left
        margin 0
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
    #allmap
        width 55%
        height 100%
        background #000
        float right
.subscribe
    position relative
.commenContainer ul li
    width 100%
    height 60px
    margin-top 5px
    border-radius 5px
    border 1px solid #ddd
    list-style none
    padding 10px
    box-sizing border-box
    font-size 15px
    color #000
    position relative
</style>
