<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <p>设置登录及支付密码</p>
            <van-cell-group>
                <van-field v-model="password" type="password" label="登录密码" icon="clear" placeholder="请输入登录密码" @click-icon="password = ''"></van-field>
                <van-field v-model="repassword" type="password" label="确认登录密码" icon="clear" placeholder="请确认登录密码" @click-icon="repassword = ''"></van-field>
                <van-field v-model="operationPwd" type="password" label="支付密码" icon="clear" placeholder="请输入支付密码" @click-icon="repassword = ''"></van-field>
                <van-field v-model="operationRepwd" type="password" label="确认支付密码" icon="clear" placeholder="请确认支付密码" @click-icon="repassword = ''"></van-field>
            </van-cell-group>
            <div class="setPassword-btn">
                <van-button size="large" @click="login">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
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
    },
    methods: {
        login: function () {
            var self = this
            if (this.password === '') {
                Dialog.alert({ title: '提示', message: '请输入登录密码！' }).then(() => {})
                return false
            }
            if (this.repassword === '') {
                Dialog.alert({ title: '提示', message: '请确认登录密码！' }).then(() => {})
                return false
            }
            if (this.password !== this.repassword) {
                Dialog.alert({ title: '提示', message: '登录密码不一致！' }).then(() => {})
                return false
            }
            if (this.operationPwd === '') {
                Dialog.alert({ title: '提示', message: '请输入操作密码！' }).then(() => {})
                return false
            }
            if (this.operationRepwd === '') {
                Dialog.alert({ title: '提示', message: '请确认操作密码！' }).then(() => {})
                return false
            }
            if (!/^\d{6}$/.test(this.operationPwd)) {
                console.log(this.operationPwd, 1111)
                Dialog.alert({ title: '提示', message: '密码只能为6位数字！' }).then(() => {})
                return false
            }
            if (this.operationPwd !== this.operationRepwd) {
                Dialog.alert({ title: '提示', message: '支付密码不一致！' }).then(() => {})
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