/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import store from './store/'


Vue.use(VueRouter);

const routes = [
  // { path: '/', component: Dashboard },
]

const router = new VueRouter({
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')