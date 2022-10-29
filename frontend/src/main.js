/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LogInPage from './pages/login-page'
import DboardPage from "./pages/dboard-page.vue";
import Register from "./pages/register-page.vue";

import store from './store/'


Vue.use(VueRouter);

const routes = [
  { path: '/signIn', component: LogInPage },
  { path: '/signUp', component: Register },
  { path: '/dashboard', component: DboardPage },


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