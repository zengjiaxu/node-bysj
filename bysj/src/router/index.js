import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Forget from '../pages/login/forget.vue'
import UserInfo from '../pages/userInfo/userInfo.vue'
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
      }
    ]
  })