<template>
    <div class="register-wrapper">
        <div class="lan-swith">
            <div :class="[lanActive == 0 ? 'active' : '' ]" @click="switchLan(0)">EN</div>
            <div :class="[lanActive == 1 ? 'active' : '' ]" @click="switchLan(1)">中文</div>
        </div>
        <div class="container register">
            <div class="tab-wrapper">
                <div class="switch-tab">
                    <div class="tab-item" :class="[active == 1 ? 'active' : '']" @click="active=1">注册</div>
                    <div class="tab-item" :class="[active == 2 ? 'active' : '']" @click="active=2">登录</div>
                </div>
                <div class="tab-content" v-show="active == 1">
                    <div class="field-wrapper">
                        <div class="register-field">
                            <van-cell-group>
                                <van-field v-model="register.phone" :class="[register.phone.length > 0 ? 'length' : '']" type="number" placeholder="请输入手机号" ></van-field>
                                <van-field v-model="register.code" :class="[register.code.length > 0 ? 'length' : '']" placeholder="请输入验证码" >
                                    <div slot="button" v-html="$t('m.getCode')">获取</div>
                                </van-field>
                            </van-cell-group>
                        </div>
                        <div class="register-btn">
                            <van-button size="large" @click="goSetPassword">下一步</van-button>
                        </div>
                    </div>
                </div>
                <div class="tab-content" v-show="active == 2">
                    <div class="field-wrapper">
                        <div class="register-field">
                            <van-cell-group>
                                <van-field v-model="login.phone" :class="[login.phone.length > 0 ? 'length' : '']" type="number" placeholder="请输入手机号" ></van-field>
                                <van-field v-model="login.password" :class="[login.password.length > 0 ? 'length' : '']" type="password" placeholder="请输入密码" ></van-field>
                                <p class="forgetPassword" @click="goForgetPassword">忘记密码？</p>
                            </van-cell-group>
                        </div>
                        <div class="register-btn">
                            <van-button size="large" @click="signUp">登录</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// UI框架组件国际化
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
export default {
    name: 'register-wrapper',
    data () {
        return {
            active: 1,
            register: {
                phone: '',
                code: ''
            },
            login: {
                phone: '',
                password: ''
            },
            lanActive: 1,
            lang: 'zh-CN'
        }
    },
    mounted () {
        this.lang = this.$i18n.locale
        if (this.$i18n.locale === 'en-US') {
            this.lanActive = 0
        }
        if (localStorage.lang === 'en-US') {
            this.lanActive = 0
            this.lang = 'en-Us'
            this.switchLan(0)
        }
    },
    methods: {
        goSetPassword () {
            this.$router.push({name: 'setPassword'})
        },
        signUp () {
            this.$router.replace({name: 'home'})
        },
        goForgetPassword () {
            this.$router.push({name: 'forgetPassword_step1'})
        },
        switchLan (type) {
            this.lanActive = type
            if (this.lang === 'en-US') {
                this.lang = 'zh-CN'
                // UI框架组件国际化
                Locale.use('zh-CN', zhCN)
                // 存储语言设置
                localStorage.lang = 'zh-CN'
            } else {
                this.lang = 'en-US'
                // UI框架组件国际化
                Locale.use('en-US', enUS)
                // 存储语言设置
                localStorage.lang = 'en-US'
            }
            // i18n 国际化
            this.$i18n.locale = this.lang
        }
    }
}
</script>

<style type="text/css" scoped>
    .lan-swith {
        display: flex;
        border: 1px solid rgba(255, 255, 255, 0.7);
        position: absolute;
        top: 38px;
        right: 15px;
        border-radius: 3px;
        z-index: 2;
    }
    .lan-swith > div {
        padding: 0 2px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
    }
    .lan-swith > div.active {
        background-color: rgba(255, 255, 255, 0.7);
        color: #D0021B;
    }
</style>