<template>
    <div class="balanceLog-wrapper">
        <div class="container balanceLog">
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
</template>

<script>
export default {
    name: 'balanceLog-wrapper',
    data () {
        return {
            chosenAddressId: '1',
            list: [
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号'
                }
            ]
        }
    },
    methods: {
        address: function (type) {
            this.$router.push({name: 'addressAddorEdit', params: {type}})
        }
    }
}
</script>