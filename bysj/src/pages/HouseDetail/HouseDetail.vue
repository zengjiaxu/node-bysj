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
                    <p class="size">三室一厅</p>
                    <p class="address">地理位置：{{address}}</p>
                    <p class="phone">联系电话：15898913974</p>
                    <p class="bPrice"><span class="price">￥20000</span>/月</p>
                </div>
              </div>
              <div id="allmap"></div>
          </div>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import myHeader from '../Home/components/Header.vue'
export default {
  data () {
    return {
        id:'1',
        address:'浙江省衢州市衢江区振兴西路238号',
        jd:'',
        wd:''
    }
  },
  components:{
      myHeader
  },
  created(){
      this.id = this.$route.query.id    
  },
  mounted() {
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
  }
}

</script>
<style scoped lang="stylus">
.top
    width 100%
    line-height 50px
    margin-top 20px
    background #c0ac85
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px
.main
    width 100%
    height 500px
    box-sizing border-box
    border 1px solid #c0ac85
    border-top none
    padding 10px
    .detail
        width 500px
        height 100%
        float left
        .img 
            width 100%
            height 350px
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
        width 745px
        height 100%
        background #000
        float right
</style>
