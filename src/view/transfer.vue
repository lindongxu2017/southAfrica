<template>
    <div class="transfer-wrapper">
        <div class="container cash recharge transfer">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>转账金额</div>
            </div>
            <!-- <div class="select">
                <div class="select-label">转账类型</div>
                <div>
                    <select v-model="selectValue">
                        <option value="1">余额</option>
                        <option value="2">银行卡</option>
                    </select>
                </div>
            </div> -->
            <div class="transfer-account">
                <div class="title">转入人会员编号</div>
                <input type="text" v-model="account">
            </div>
            <div class="cash-balance">
                <div class="cell-title">我的积分</div>
                <div class="nums" v-html="total">888.88</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large" @click="submit">转账</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'transfer-wrapper',
    data () {
        return {
            total: '',
            value: '',
            selectValue: 1,
            account: ''
        }
    },
    mounted () {
        var userinfo = JSON.parse(localStorage.userinfo)
        this.total = userinfo.j_price
    },
    methods: {
        submit () {
            if (this.value === '') {
                Dialog.alert({ title: '提示', message: '请输入金额！' }).then(() => {})
                return false
            }
            if (this.account === '') {
                Dialog.alert({ title: '提示', message: '请输入转入账户！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {action: 'transfer', price: this.value, tousername: this.account}, this.api.center.transfer, res => {
                Dialog.alert({ title: '提示', message: '提交成功，请等待后台审核！' }).then(() => {
                    this.$router.back()
                })
            })
        }
    }
}
</script>

<style type="text/css">
    .transfer-wrapper .cash-btn span.van-button__text {
        color: #fff;
    }
</style>

<style type="text/css" scoped>
    .cash-btn .van-button {
        background-color: #D0021B;
        border: 1px solid #D0021B;
    }
</style>