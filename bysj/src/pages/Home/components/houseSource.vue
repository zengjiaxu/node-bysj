<template>
    <div>
        <div class="house" v-for="(item,idx) of msg" :key="idx">
            <div class="top"></div>
            <div class="center"></div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        msg:[1]
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
        height 50px
        background #c0ac85
        border-radius 7px 7px 0 0
    .center
        width 100%
        height 700px
        background #ffffff
        border 1px solid #e5e5e5
        box-sizing border-box
</style>
