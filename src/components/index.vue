<template>
    <div class="root">
        <router-view></router-view>
        <router-view name="footerNav"></router-view>
    </div>
</template>

<script>
// UI框架组件国际化
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'

export default {
    name: 'root',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    beforeCreate () {
        if (!localStorage.userinfo) {
            this.$router.push({name: 'register'})
            return false
        }
    },
    mounted () {
        if (localStorage.lang === 'en-US') {
            this.$i18n.locale = 'en-US'
            Locale.use('en-US', enUS)
        }
        window.lang = this.$t
    },
    computed: {
        lang: function () {
            return localStorage.lang
        }
    },
    watch: {
        lang () {
            if (this.lang === 'zh-CN') {
                Locale.use('zh-CN', zhCN)
            } else {
                Locale.use('en-US', zhCN)
            }
        }
    }
}
</script>
