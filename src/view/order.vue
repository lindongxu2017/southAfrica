<template>
    <div class="order-wrapper">
        <div class="container order">
            <van-tabs v-model="active">
                <van-tab title="所有订单">
                    <div class="order-list">
                        <div class="order-item" v-for="(item, key) in list1" :key="key" @click="goDetail(item.id)">
                            <div class="order-num-status van-hairline--bottom">
                                <div>订单号：521564654564</div>
                                <div>付款</div>
                            </div>
                            <div class="order-info">
                                <div class="order-img"><img src="../assets/img/demo.jpg"></div>
                                <div class="order-desc">
                                    <div>商品名称</div>
                                    <div class="price-nums">
                                        <div>￥ 168.00</div>
                                        <div>x2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-btn van-hairline--top" @click.stop="goPay(item.id)">支付</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待付款">
                    <div class="order-list">
                        <div class="order-item" v-for="(item, key) in list2" :key="key" @click="goDetail(item.id)">
                            <div class="order-num-status van-hairline--bottom">
                                <div>订单号：521564654564</div>
                                <div>付款</div>
                            </div>
                            <div class="order-info">
                                <div class="order-img"><img src="../assets/img/demo.jpg"></div>
                                <div class="order-desc">
                                    <div>商品名称</div>
                                    <div class="price-nums">
                                        <div>￥ 168.00</div>
                                        <div>x2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-btn van-hairline--top" @click.stop="goPay(item.id)">支付</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待收货">
                    <div class="order-list">
                        <div class="order-item" v-for="(item, key) in list3" :key="key" @click="goDetail(item.id)">
                            <div class="order-num-status van-hairline--bottom">
                                <div>订单号：521564654564</div>
                                <div>收货</div>
                            </div>
                            <div class="order-info">
                                <div class="order-img"><img src="../assets/img/demo.jpg"></div>
                                <div class="order-desc">
                                    <div>商品名称</div>
                                    <div class="price-nums">
                                        <div>￥ 168.00</div>
                                        <div>x2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-btn van-hairline--top" @click.stop="commit(item.id)">确认收货</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="已完成">
                    <div class="order-list">
                        <div class="order-item" v-for="(item, key) in list4" :key="key" @click="goDetail(item.id)">
                            <div class="order-num-status van-hairline--bottom">
                                <div>订单号：521564654564</div>
                                <div>已完成</div>
                            </div>
                            <div class="order-info">
                                <div class="order-img"><img src="../assets/img/demo.jpg"></div>
                                <div class="order-desc">
                                    <div>商品名称</div>
                                    <div class="price-nums">
                                        <div>￥ 168.00</div>
                                        <div>x2</div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="order-btn van-hairline--top">支付</div> -->
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
            list1: ['', '', '', '', '', '', '', ''],
            // 待付款
            list2: ['', '', ''],
            // 待收货
            list3: ['', ''],
            // 已完成
            list4: ['', '', '']
        }
    },
    created: function () {
        this.active = this.$route.params.type
    },
    methods: {
        goPay: function (id) {
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