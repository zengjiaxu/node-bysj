import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Forget from '../pages/login/forget.vue'
import UserInfo from '../pages/userInfo/userInfo.vue'
import HouseDetail from '../pages/HouseDetail/HouseDetail.vue'
import SubmitHouse from '../pages/HouseDetail/SubmitHouse.vue'
Vue.use(Router)
export default new Router({
    routes: [
      {
          path: '/',
          name: 'Home',
          component: Home
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path:'/forget',
        name: 'Forget',
        component: Forget
      },
      {
        path:'/userInfo',
        name: 'UserInfo',
        component: UserInfo
      },
      {
        path:'/houseDetail',
        name: 'houseDetail',
        component:HouseDetail,
        props: true
      },{
        path:'/submitHouse',
        name:'submitHouse',
        component:SubmitHouse
      }
    ]
  })