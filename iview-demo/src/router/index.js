import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/loginRegister/login'
import register from '@/components/loginRegister/register'
import home from '@/components/home'
import comments from '@/components/comments'
import videoArea from '@/components/videoArea'
import audioArea from '@/components/audioArea'

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
    },
    {
      path:'/comments',
      name:'comments',
      component:comments
    },
    {
      path:'/videoArea',
      name:'videoArea',
      component:videoArea
    },
    {
      path:'/audioArea',
      name:'audioArea',
      component:audioArea
    }

  ]
})
