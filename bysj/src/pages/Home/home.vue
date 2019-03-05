<template>
 <div class="home">
   <my-header/>
   <my-layout/>
   <my-foot/>
 </div>
</template>

<script>
import myHeader from './components/Header.vue'
import myFoot from './components/foot.vue'
import myLayout from './components/layout.vue'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components:{
    myHeader,
    myFoot,
    myLayout
  }
}

</script>
<style scoped>
</style>
