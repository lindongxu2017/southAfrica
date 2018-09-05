<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <p>{{$t('m.textTips_3')}}</p>
            <van-cell-group>
                <van-field v-model="password" type="password" :label="$t('m.loginPassword')" icon="clear" :placeholder="$t('m.inputTips_6')" @click-icon="password = ''"></van-field>
                <van-field v-model="repassword" type="password" :label="$t('m.loginPassword')" icon="clear" :placeholder="$t('m.inputTips_8')" @click-icon="repassword = ''"></van-field>
                <van-field v-model="operationPwd" type="password" :label="$t('m.payPassword')" icon="clear" :placeholder="$t('m.inputTips_9')" @click-icon="repassword = ''"></van-field>
                <van-field v-model="operationRepwd" type="password" :label="$t('m.payPassword')" icon="clear" :placeholder="$t('m.inputTips_10')" @click-icon="repassword = ''"></van-field>
            </van-cell-group>
            <div class="setPassword-btn">
                <van-button size="large" @click="login">{{$t('m.login')}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>

import { Dialog, Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
export default {
    name: 'setPassword-wrapper',
    data () {
        return {
            register: {},
            password: '',
            repassword: '',
            operationPwd: '',
            operationRepwd: ''
        }
    },
    mounted () {
        this.register = JSON.parse(localStorage.register)
        document.title = '设置密码'
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
    },
    methods: {
        login: function () {
            var self = this
            if (this.password === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.loginPasswordEmpty') }).then(() => {})
                return false
            }
            if (this.repassword === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.comfirmLoginPasswordEmpty') }).then(() => {})
                return false
            }
            if (this.password !== this.repassword) {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.popupTips_5') }).then(() => {})
                return false
            }
            if (this.operationPwd === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.payPasswordEmpty') }).then(() => {})
                return false
            }
            if (this.operationRepwd === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.comfirmPayPasswordEmpty') }).then(() => {})
                return false
            }
            if (!/^\d{6}$/.test(this.operationPwd)) {
                console.log(this.operationPwd, 1111)
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.popupTips_6') }).then(() => {})
                return false
            }
            if (this.operationPwd !== this.operationRepwd) {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.popupTips_7') }).then(() => {})
                return false
            }

            var data = {
                username: this.register.username,
                password: this.password,
                cpassword: this.repassword,
                mobile: this.register.phone,
                pwd1: this.operationPwd,
                cpwd1: this.operationRepwd,
                realname: this.register.realname
            }

            this.fn.ajax('post', data, this.api.admin.register, res => {
                if (res === 'error') {
                    localStorage.removeItem('register')
                    this.$router.back()
                } else {
                    this.fn.ajax('post', {username: this.register.username, password: this.password}, this.api.admin.login, result => {
                        self.getUserInfo()
                    })
                }
            })
        },
        getUserInfo () {
            this.fn.ajax('get', {}, this.api.user.info, response => {
                localStorage.removeItem('register')
                localStorage.userinfo = JSON.stringify(response.data)
                this.$router.push({name: 'home'})
            })
        }
    }
}
</script>

<style type="text/css">
    .setPassword-wrapper .van-field--has-icon .van-field__control {
        padding-right: 0;
    }
</style>