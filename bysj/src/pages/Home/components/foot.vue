<template>
 <div class="foot">
     <ul>
       <li> <a href="https://mashable.com/category/twitter/"></a> </li>
       <li> <a href="https://www.facebook.com/"></a> </li>
       <li> <a href="https://weibo.com/"></a> </li>
       <li> <a href="https://www.douban.com/"></a> </li>
       <li> <a href="https://github.com/zengjiaxu"></a> </li>
     </ul>
     <span>@软测153-201511105094-曾佳徐</span>
 </div>
</template>

<script>
export default {
  name:'foot',
  data () {
    return {

    }
  }
}

</script>
<style lang="stylus" scoped>
.foot
    margin-top 0.25rem
    background rgba(220,220,220,0.4)
    width 100%
    height 3rem
    text-align center
    color #AAAAAA
    margin-bottom .25rem
    font-size .35rem
    ul
      display flex
      justify-content center
      padding 0 6rem
      li
        background #000
        width 1rem
        height 1rem
        border-radius 50%
        list-style none
        margin .5rem
        cursor pointer
        opacity 0.5
        a
          width 100%
          height 100%
          display inline-block
      li:hover
        border-radius .125rem
        opacity 1
        transition 0.5s
      li:nth-of-type(1)
         background-image url(../../../assets/social.png)
      li:nth-of-type(2)
         background-image url(../../../assets/social.png)
         background-position-x -40px
      li:nth-of-type(3)
         background-image url(../../../assets/social.png)
         background-position-x -160px  
      li:nth-of-type(4)
         background-image url(../../../assets/social.png)
         background-position -40px -40px
      li:nth-of-type(5)
         background-image url(../../../assets/social.png)
         background-position -160px -40px
</style>
