import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store'
Vue.use(Vant)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router, // this.$router
  store, // this.$store
  render: h => h(App)
}).$mount('#app')
