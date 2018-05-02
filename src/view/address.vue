<template>
    <div class="address-wrapper">
        <div class="container address">
            <van-address-list v-model="chosenAddressId" :list="list" @add="address(1)" @edit="address(2)"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'address-wrapper',
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

<style type="text/css">
    .address-wrapper .van-address-list__add {
        width: 100%;
    }
</style>