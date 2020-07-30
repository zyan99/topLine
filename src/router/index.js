// 引入Vue的依赖
import Vue from 'vue'
// 引入路由的依赖
import VueRouter from 'vue-router'
// 引入 Home 组件
import Home from '../views/Home.vue'
// 将 VueRouter 混入到 Vue 中
// this.$router
Vue.use(VueRouter)

// 路由配置
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history', 默认是 hash 默式
  // base: process.env.BASE_URL,
  routes
})

export default router
