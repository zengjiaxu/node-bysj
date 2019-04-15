import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
import animate from 'animate.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animate);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
