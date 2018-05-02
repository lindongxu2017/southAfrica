<template>
    <div class="bonus-wrapper">
        <div class="container bonus">
            <div class="header">
                <p class="total">888.00</p>
                <p class="title">我的奖金</p>
                <div class="bonus-class">
                    <div><p class="nums">333.00</p><p class="name">组织奖</p></div>
                    <div><p class="nums">222.00</p><p class="name">领导奖</p></div>
                    <div><p class="nums">333.00</p><p class="name">拓展奖</p></div>
                </div>
            </div>
            <div class="balanceLog">
                <p class="bonus-logs van-hairline--bottom">奖金纪录</p>
                <div class="table-heaer van-hairline--bottom">
                    <div>时间</div>
                    <div>类型</div>
                    <div>金额</div>
                </div>
                <div class="table-body">
                    <div class="table-tr van-hairline--bottom" v-for="(item, index) in list" :key="index">
                        <div class="time">
                            <p>2018/4/26</p>&nbsp;
                            <p>13:00:00</p>
                        </div>
                        <div>余额提现</div>
                        <div>￥100.00</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bonus-wrapper',
    data () {
        return {
            list: ['', '', '']
        }
    },
    methods: {
    }
}
</script>