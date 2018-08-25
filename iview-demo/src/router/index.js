import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/loginRegister/login'
import register from '@/components/loginRegister/register'
import home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:home 
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    }
  ]
})
