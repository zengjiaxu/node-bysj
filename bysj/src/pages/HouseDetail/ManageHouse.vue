<template>
   <div>
<el-row type="flex" justify="center">
      <el-col :span="16">
          <div class="top"><span>我的房源信息</span></div>
          <div class="main">
            <div v-for="item of detailInfo" :key="item.id">
              <div class="detail">
                <div class="img">
                    <img src="../../assets/fw1.jpg" alt="">
                </div>
                <div class="info">
                    <p class="size">{{item.size}}
                      <el-button @click="deleteHouse" type="success">删除</el-button>
                      <el-button @click="updateHouse(item.id)" type="primary">修改</el-button>
                    </p>
                    <p class="address">地理位置：{{item.address}}</p>
                    <p class="phone">联系电话：{{item.phone}}</p>
                    <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                </div>
              </div>
              </div>
          </div>

      </el-col>
    </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      detailInfo:[
            {id:'1',size:'三室一厅',address:'浙江省衢州市',phone:'15898913974',price:'2000',img:'../../../assets/fw1.jpg'},
            {id:'2',size:'一室一厅',address:'浙江省衢州市',phone:'15898913974',price:'1000',img:'../../../assets/fw1.jpg'},
            {id:'3',size:'三室二厅',address:'浙江省衢州市',phone:'15898913974',price:'3000',img:'../../../assets/fw1.jpg'},
            {id:'4',size:'二室一厅',address:'浙江省衢州市',phone:'15898913974',price:'1500',img:'../../../assets/fw1.jpg'},
            {id:'5',size:'三室一厅',address:'浙江省衢州市',phone:'15898913974',price:'2000',img:'../../../assets/fw1.jpg'},
            {id:'6',size:'一室一厅',address:'浙江省衢州市',phone:'15898913974',price:'1000',img:'../../../assets/fw1.jpg'},
            {id:'7',size:'三室一厅',address:'浙江省衢州市',phone:'15898913974',price:'1500',img:'../../../assets/fw1.jpg'},
            {id:'8',size:'三室二厅',address:'浙江省衢州市',phone:'15898913974',price:'3000',img:'../../../assets/fw1.jpg'},
            {id:'9',size:'三室一厅',address:'浙江省衢州市',phone:'15898913974',price:'2000',img:'../../../assets/fw1.jpg'}]
    }
  },
  methods:{
    deleteHouse () {

    },
    updateHouse (x) {
      this.$router.push({name:'submitHouse',query:{id:x}})
    }
  }
}
</script>

<style lang="stylus">
.top
    width 100%
    line-height 50px
    margin-top 20px
    background: linear-gradient(to right, rgb(255, 113, 74) 2%, rgb(252, 66, 66) 97%); 
    border-radius 7px 7px 0 0
    color:#ffff
    span
        margin-left 10px

.main
    width 100%
    height 500px
    box-sizing border-box
    border 1px solid #c
    border-top none
    padding 10px
    overflow scroll
    .detail
        width  48%
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
