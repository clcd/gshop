// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
Vue.component(Button.name, Button)
import './filters'
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

import './mock/mockServer'//加载mockServer
/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router,
  store
})
