<template>
    <div class="transfer-wrapper">
        <div class="container cash recharge transfer">
            <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>转账金额</div>
            </div>
            <div class="select">
                <div class="select-label">转账类型</div>
                <div>
                    <select v-model="selectValue">
                        <option value="1">余额</option>
                        <option value="2">银行卡</option>
                    </select>
                </div>
            </div>
            <div class="transfer-account">
                <div class="title">转入人会员编号</div>
                <input type="text" v-model="account">
            </div>
            <div class="cash-balance">
                <div class="cell-title">我的金额</div>
                <div class="nums">888.88</div>
            </div>
            <div class="cash-btn">
                <van-button type="default" size="large">转账</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'transfer-wrapper',
    data () {
        return {
            value: '',
            selectValue: 1,
            account: ''
        }
    },
    methods: {
    }
}
</script>