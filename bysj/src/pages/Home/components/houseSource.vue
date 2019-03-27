<template>
    <div>
        <div class="house" v-for="(item,idx) of msg" :key="idx">
            <div class="top"><span>房源信息</span></div>
            <div class="center">
                <ul>
                    <li v-for="item of houseSource" :key="item.id" @click="toDetail(item.id)">
                        <img src="../../../assets/fw1.jpg" alt="">
                        <p class="size">{{item.size}}</p>
                        <p class="address">地理位置：{{item.address}}</p>
                        <p class="phone">联系电话：{{item.phone}}</p>
                        <p class="bPrice"><span class="price">￥{{item.price}}</span>/月</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        msg:[1],
        houseSource:[
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
      toDetail (x) {
          this.$router.push({name:'houseDetail',query:{id:x}})
      }
  }
}
</script>
<style lang="stylus" scoped>
.house
    width 100%
    margin-top 40px
    .top
        width 100%
        line-height 50px
        background #c0ac85
        border-radius 7px 7px 0 0
        color:#ffff
        span
          margin-left 10px
    .center
        width 100%
        height 690px
        background #ffffff
        border 1px solid #e5e5e5
        box-sizing border-box
        overflow scroll
        ul li
          list-style none
          width 32%
          height 332px
          margin 0
          padding 0
          float left
          margin 10px 0 0 11px
          position relative
          cursor pointer
          img 
            width 100%
            height 250px
          p
            font-size 14px
            color #999
            line-height 20px
          .bPrice
            text-align right 
            display inline-block
            position absolute
            bottom  18px
            right 0
            font-size 14px
            color #999
          .price
            color orange
            font-size 30px
    .center::-webkit-scrollbar 
        width: 0px;
        height: 0px;
</style>
