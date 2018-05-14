<template>
    <div class="loginPassword-wrapper">
        <div class="container loginPassword">
            <van-cell-group>
                <!-- <van-field v-model="phone" label="手机号" required placeholder="请输入手机号"></van-field>
                <van-field center v-model="code" required label="验证码" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''">
                    <div slot="button">获取</div>
                </van-field> -->
                <van-field v-model="password" type="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" type="password" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <div class="addressAdd">
                <div class="save-btn">
                    <van-button type="default" size="large" @click="setPassword">保存</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'loginPassword-wrapper',
    data () {
        return {
            phone: '',
            code: '',
            password: '',
            repassword: ''
        }
    },
    mounted () {
        // this.password = this.repassword = JSON.parse(localStorage.userinfo).pwd
    },
    methods: {
        setPassword () {
            if (this.password === '') {
                Dialog.alert({ title: '提示', message: '请输入新密码！' }).then(() => {})
                return false
            }
            if (this.repassword === '') {
                Dialog.alert({ title: '提示', message: '请确认新密码！' }).then(() => {})
                return false
            }
            if (this.password !== this.repassword) {
                Dialog.alert({ title: '提示', message: '重复密码不一致！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {action: 'pwd', pwd: this.password, repwd: this.repassword}, this.api.user.loginPwd, res => {
                Dialog.alert({ title: '提示', message: '设置成功！' }).then(() => {
                    this.$router.back()
                })
            })
        }
    }
}
</script>