// 引入 Vue 依赖
import Vue from 'vue'
// 引入 App 组件
import App from './App.vue'
// 引入 Vue-router 配置
import router from './router'
// 引入 vuex 的配置
import store from './store'  //   ./store/index.js
// a.1 引入axios
import axios from "./common/myaxios"
// a.2 在 Vue 的原型上添加 $axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
// 创建一个 vue 的实例
new Vue({
  router,// vue-router
  store,// vuex this.$store.state 的数据
  render: h => h(App) // 将 App 组件渲染到 '#app
}).$mount('#app')
