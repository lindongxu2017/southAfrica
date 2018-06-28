<template>
    <div class="cash-wrapper">
        <div class="container cash">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>提现金额</div>
            </div>
            <div class="cash-tips">提现手续费{{ratio}}</div>
            <div class="cash-balance">
                <div class="cell-title">我的余额</div>
                <div class="nums" v-html="total">888.88</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large" @click="submit">提现</van-button>
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
    name: 'cash-wrapper',
    data () {
        return {
            total: '',
            value: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false,
            ratio: '0%'
        }
    },
    mounted () {
        var userinfo = JSON.parse(localStorage.userinfo)
        this.getRatio()
        this.total = userinfo.j_price
        document.title = '提现'
    },
    methods: {
        submit () {
            if (this.value === '') {
                Dialog.alert({ title: '提示', message: '请输入金额！' }).then(() => {})
                return false
            }
            var password = JSON.parse(localStorage.userinfo).pwd1
            if (password === '' || password === null || password === 'null') {
                // alert('请设置操作密码')
                Dialog.confirm({
                    title: '提示',
                    message: '暂未设置操作密码，是否前往设置？'
                }).then(() => {
                    this.$router.push({name: 'operationPassword'})
                }).catch(() => {
                    // on cancel
                })
                return false
            }
            this.passwordPopup = true
        },
        getRatio () {
            this.fn.ajax('post', {action: 'list'}, this.api.center.cashRatio, res => {
                this.ratio = res.data.glo_withdraw_fee
            })
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
                this.fn.ajax('post', {price: this.value, pay_password: this.password}, this.api.center.cash, res => {
                    if (res === 'error') {
                        this.password = ''
                        this.passwordPopup = false
                    } else {
                        Dialog.alert({
                            title: '提示',
                            message: '提交成功，请等待后台审核！'
                        }).then(() => {
                            this.$router.back()
                        })
                    }
                })
            }
        },
        passwordPopup: function () {
            if (this.passwordPopup) {
                document.title = '输入密码'
            } else {
                document.title = '提现'
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.passwordPopup) {
            this.passwordPopup = false
            next(false)
        } else {
            next()
        }
    }
}
</script>

<style type="text/css">
    .cash .cash-btn span.van-button__text {
        color: #fff;
    }
</style>

<style type="text/css" scoped>
    .cash-btn .van-button {
        background-color: #D0021B;
        border: 1px solid #D0021B;
    }
</style>