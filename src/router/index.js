import Vue from 'vue'
import VueRouter from 'vue-router'
import Cinemas from '@/views/Cinemas.vue'
import Films from '@/views/Films.vue'
import Mine from '@/views/Mine.vue'
import City from '@/views/City.vue'
// import Nowplaying from '@/views/films/Nowplaying.vue'
// import Comingsoon from '@/views/films/Comingsoon.vue'
// import Search from '@/views/Search.vue'
// import Detail from '@/views/Detail.vue'
// import Login from '@/views/Login.vue'
// import Order from '@/views/Order.vue'

Vue.use(VueRouter) // 注册路由插件，两个全局组件 router-view router-link

// 配置表
const routes = [
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: () => import('@/views/films/Nowplaying.vue')
      },
      {
        path: '/films/comingsoon',
        component: () => import('@/views/films/Comingsoon.vue')
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'myDetail',
    path: '/detail/:id',
    component: () => import('@/views/Detail.vue')
  },
  {
    meta: {
      isRequired: true
    },
    path: '/mine',
    component: Mine
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    meta: {
      isRequired: true
    },
    path: '/order',
    component: () => import('@/views/Order.vue')
  },
  // 重定向
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.isRequired) {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
