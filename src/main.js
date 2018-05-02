// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

import './css/main.css'
import './css/vant-reset.css'

import {fn} from './js/main.js'
import {api} from './js/api.js'

Vue.prototype.fn = fn
Vue.prototype.api = api

Vue.config.productionTip = false

Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
