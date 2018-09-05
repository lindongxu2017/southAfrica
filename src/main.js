// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n' // 双语

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

import './css/main.css'
import './css/vant-reset.css'
import './css/response.css'
import {api} from './js/api.js'
import {fn} from './js/main.js'

Vue.prototype.api = api
window.api = api
Vue.prototype.fn = fn

Vue.config.productionTip = false

Vue.use(Vant)

// 双语
Vue.use(VueI18n) // 通过插件的形式挂载

const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识
    // this.$i18n.locale 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./common/lang/zh'), // 中文语言包
        'en-US': require('./common/lang/en') // 英文语言包
    }
})

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    i18n,
    router,
    components: { App },
    template: '<App/>'
})
