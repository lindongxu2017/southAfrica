<template>
    <div class="operationPassword-wrapper">
        <div class="container operationPassword">
            <van-cell-group v-if="!isSet">
                <van-field v-model="password" type="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" type="password" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <van-cell-group v-if="isSet">
                <!-- <van-field v-model="oldpassword" type="password" label="旧密码" required placeholder="请输入旧密码"></van-field> -->
                <van-field v-model="password" type="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" type="password" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <div class="addressAdd">
                <div class="save-btn">
                    <van-button type="default" size="large" @click="save">保存</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'operationPassword-wrapper',
    data () {
        return {
            isSet: true,
            oldpassword: '',
            password: '',
            repassword: ''
        }
    },
    mounted () {
        var pwd1 = JSON.parse(localStorage.userinfo).pwd1
        if (pwd1 === '' || pwd1 === null || pwd1 === 'null') {
            this.isSet = false
        }
    },
    methods: {
        save () {
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
            if (!/^\d{6}$/.test(this.password)) {
                Dialog.alert({ title: '提示', message: '密码只能为6位数字！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {action: 'pwd1', pwd1: this.password, repwd1: this.repassword}, this.api.user.opareatPwd, res => {
                Dialog.alert({ title: '提示', message: '设置成功！' }).then(() => {
                    this.$router.back()
                })
            })
        }
    }
}
</script>