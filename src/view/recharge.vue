<template>
    <div class="recharge-wrapper">
        <div class="container cash recharge">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>充值金额</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large">充值</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'recharge-wrapper',
    data () {
        return {
            value: ''
        }
    },
    methods: {
    }
}
</script>