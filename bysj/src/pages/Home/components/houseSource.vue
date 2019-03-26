<template>
    <div>
        <div class="house" v-for="(item,idx) of msg" :key="idx">
            <div class="top"><span>房源信息</span></div>
            <div class="center">
                <ul>
                    <li v-for="(item,index) of houseSource" :key="index">
                        <img src="../../../assets/fw1.jpg" alt="">
                        <p class="size">三室一厅</p>
                        <p class="name">联系人:曾佳徐</p>
                        <p class="phone">联系电话：110</p>
                        <p class="bPrice"><span class="price">￥2000</span>/月</p>
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
        houseSource:[1,2,3,4,5,6,7,8,9]
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
