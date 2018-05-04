<template>
    <div class="order-wrapper">
        <div class="container order">
            <van-tabs v-model="active">
                <van-tab v-for="(item, key) in list" :key="key" :title="item.title">
                    <div class="order-list">
                        <div class="order-item" v-for="(obj, key) in item.list" :key="key" @click="goDetail(item.id)">
                            <div class="order-num-status">
                                <div>订单号：<span v-html="obj.order_num"></span></div>
                                <div :class="{'pending-pay': obj.status == 1, 'confirm': obj.status == 2}" >
                                    <span v-html="obj.status_msg"></span>
                                    <img v-if="obj.status == 1" src="../assets/icon/pendingPay.png" width="16">
                                    <img v-if="obj.status == 2" src="../assets/icon/confirm.png" width="16">
                                </div>
                            </div>
                            <div class="order-info">
                                <div class="order-img"><img :src="obj.goods_img"></div>
                                <div class="order-desc">
                                    <div v-html="obj.goods_name">商品名称</div>
                                    <div class="price-nums">
                                        <div v-html="'￥' + obj.goods_price">￥168.00</div>
                                        <div v-html="'x' + obj.goods_num"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-btn van-hairline--top pendingPay" v-if="obj.status == 1" @click.stop="goPay(item.id)">去支付</div>
                            <div class="order-btn van-hairline--top confirm" v-if="obj.status == 2" @click.stop="goPay(item.id)">确认收货</div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order-wrapper',
    data () {
        return {
            active: 0,
            // 全部
            list: [
                {
                    title: '所有订单',
                    list: [
                        {
                            order_num: '521564654564',
                            status: 1,
                            status_msg: '待付款',
                            goods_img: require('../assets/img/goods1.png'),
                            goods_name: '商品名称',
                            goods_price: '168.00',
                            goods_num: '2'
                        },
                        {
                            order_num: '521564654555',
                            status: 1,
                            status_msg: '待付款',
                            goods_img: require('../assets/img/goods2.png'),
                            goods_name: '商品名称',
                            goods_price: '121.00',
                            goods_num: '1'
                        },
                        {
                            order_num: '521564654578',
                            status: 2,
                            status_msg: '待收货',
                            goods_img: require('../assets/img/goods3.png'),
                            goods_name: '商品名称',
                            goods_price: '1680.00',
                            goods_num: '1'
                        },
                        {
                            order_num: '5215646545545',
                            status: 3,
                            status_msg: '已完成',
                            goods_img: require('../assets/img/goods1.png'),
                            goods_name: '商品名称',
                            goods_price: '3680.00',
                            goods_num: '1'
                        }
                    ]
                },
                {
                    title: '待付款',
                    list: [
                        {
                            order_num: '521564654564',
                            status: 1,
                            status_msg: '待付款',
                            goods_img: require('../assets/img/goods1.png'),
                            goods_name: '商品名称',
                            goods_price: '168.00',
                            goods_num: '2'
                        },
                        {
                            order_num: '521564654555',
                            status: 1,
                            status_msg: '待付款',
                            goods_img: require('../assets/img/goods2.png'),
                            goods_name: '商品名称',
                            goods_price: '121.00',
                            goods_num: '1'
                        }
                    ]
                },
                {
                    title: '待付款',
                    list: [
                        {
                            order_num: '521564654578',
                            status: 2,
                            status_msg: '待收货',
                            goods_img: require('../assets/img/goods3.png'),
                            goods_name: '商品名称',
                            goods_price: '1680.00',
                            goods_num: '1'
                        }
                    ]
                },
                {
                    title: '已完成',
                    list: [
                        {
                            order_num: '5215646545545',
                            status: 3,
                            status_msg: '已完成',
                            goods_img: require('../assets/img/goods1.png'),
                            goods_name: '商品名称商品名称商品名称商品名称商品名称商品名称',
                            goods_price: '3680.00',
                            goods_num: '1'
                        }
                    ]
                }
            ]
        }
    },
    created: function () {
        this.active = this.$route.params.type
    },
    methods: {
        goPay: function (id) {
            id = 6
            this.$router.push({name: 'pay', params: {id}})
        },
        goDetail: function (id) {
            id = 1
            this.$router.push({name: 'orderDetail', params: {id}})
        },
        commit: function (id) {
            alert('确认收货')
        }
    }
}
</script>

<style type="text/css" scoped>
    * {
        color: #333;
    }
    .price-nums > div:first-child {
        color: #D0021B;
    }
    .price-nums > div:last-child {
        color: #A8A8A8;
    }
</style>