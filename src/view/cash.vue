<template>
    <div class="cash-wrapper">
        <div class="container cash">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>提现金额</div>
            </div>
            <div class="cash-tips">提现手续费10%</div>
            <div class="cash-balance">
                <div class="cell-title">我的金额</div>
                <div class="nums">888.88</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large">提现</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cash-wrapper',
    data () {
        return {
            value: '',
            password: ''
        }
    },
    methods: {
        submit () {
            this.fn.ajax('post', {price: this.value, pay_password: this.password}, this.api.center.cash, res => {
                this.$router.back()
            })
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