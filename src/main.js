import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(VueAxios,axios)
//font-awesome
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
//Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//格式化日期 date-fns
import format from 'date-fns/format'

//导入总css样式 app.css
import '@/assets/app.css'

import '@/permission'

import relativeTime from 'dayjs/plugin/relativeTime'
//国际化
import 'dayjs/locale/zh-cn'
const dayjs=require('dayjs');

//引入时间线组件
import vuetimeline from "@growthbunker/vuetimeline"

Vue.use(vuetimeline)

//相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
dayjs().locale('zh-cn').format

//可以全局使用dayjs
Vue.prototype.dayjs=dayjs;

//date-fns
Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

import 'material-design-icons/iconfont/material-icons.css'

Vue.use(Buefy);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
