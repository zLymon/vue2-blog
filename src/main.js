// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import '@/assets/style/common.scss'
import '@/assets/style/github-markdown.css'
import '@/assets/style/atom-one-dark.min.css'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://47.107.75.183:80';
axios.defaults.baseURL = process.env.baseURL
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(response.data.errorMsg == '请登录'){
      localStorage.clear();
      alert('请重新登录')
      router.replace({
        path: '/admin'
      })
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});