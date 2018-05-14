<template>
    <div class="recharge-wrapper">
        <div class="container cash recharge">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>充值金额</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large" @click="submit">充值</van-button>
            </div>
        </div>
        <!-- 输入密码 -->
        <van-popup v-model="passwordPopup" position="right" class="password">
            <van-password-input :value="password" info="密码为 6 位数字" @click.native="showKeyboard = true"></van-password-input>
            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
        </van-popup>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'recharge-wrapper',
    data () {
        return {
            value: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false
        }
    },
    methods: {
        submit () {
            if (this.value === '') {
                Dialog.alert({ title: '提示', message: '请输入金额！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {price: this.value}, this.api.center.recharge, res => {
                Dialog.alert({
                    title: '提示',
                    message: res.message
                }).then(() => {
                    this.$router.back()
                })
            })
            // this.passwordPopup = true
        },
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                // this.fn.ajax('post', {price: this.value, pay_password: this.password}, this.api.center.recharge, res => {
                this.fn.ajax('post', {price: this.value}, this.api.center.recharge, res => {
                    this.$toast.success('充值成功')
                    this.$router.back()
                })
            }
        }
    }
}
</script>

<style type="text/css">
    .recharge-wrapper .cash-btn span.van-button__text {
        color: #fff;
    }
</style>

<style type="text/css" scoped>
    .cash-btn .van-button {
        background-color: #D0021B;
        border: 1px solid #D0021B;
    }
</style>