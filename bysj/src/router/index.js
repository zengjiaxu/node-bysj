import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Forget from '../pages/login/forget.vue'
import UserInfo from '../pages/userInfo/userInfo.vue'
import HouseDetail from '../pages/HouseDetail/HouseDetail.vue'
import SubmitHouse from '../pages/HouseDetail/SubmitHouse.vue'
import ManageHouse from '../pages/HouseDetail/ManageHouse.vue'
import UnreadInfo from '../pages/unreadInfo/unreadInfo.vue'
import ManageUserHouse from '../pages/admin/manageUserHouse.vue'
import ManageUserReport from '../pages/admin/manageUserReport.vue'
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
      },
      {
        path:'/submitHouse',
        name:'submitHouse',
        component:SubmitHouse
      }, 
      {
        path:'/submitHouse',
        name:'submitHouse',
        component:SubmitHouse,
        props: true
      },
      {
        path:'/manageHouse',
        name:'manageHouse',
        component:ManageHouse
      },
      {
        path:'/unreadInfo',
        name:'unreadInfo',
        component:UnreadInfo
      },
      {
        path:'/manageUserHouse',
        name:'manageUserHouse',
        component:ManageUserHouse
      },
      {
        path:'/manageUserReport',
        name:'manageUserReport',
        component:ManageUserReport
      }
    ]
  })