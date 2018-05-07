<template>
    <div class="order-wrapper">
        <div class="container order">
            <van-tabs v-model="active">
                <van-tab v-for="(item, index, key) in list" :key="key" :title="item.title">
                    <div class="order-list">
                        <van-list v-model="loading" :finished="finished" @load="onLoad(index)">
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
                        </van-list>
                    </div>
                    <div class="noMore" v-if="total[index] == 0">
                        <img src="../assets/icon/noMore.png">
                        <p>暂无订单...</p>
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
            active: '',
            // 全部
            list: [
                { title: '所有订单', list: [] },
                { title: '待付款', list: [] },
                { title: '待收货', list: [] },
                { title: '已完成', list: [] }
            ],
            loading: false,
            finished: false,
            total: [-1, -1, -1, -1],
            page: [1, 1, 1, 1]
        }
    },
    created: function () {
        this.active = this.$route.params.type
    },
    methods: {
        getlist () {
            if (parseInt(this.active) === 0) {
                this.fn.ajax('get', {action: 'list', pageno: this.page[0]}, this.api.order.list, res => {
                    this.total[0] = parseInt(res.data.total)
                    this.list[0].list = this.list[0].list.concat(res.data.list)
                    this.loading = false
                    if (this.list[0].list.length >= this.total[0]) {
                        this.finished = true
                    } else {
                        this.page[0]++
                    }
                })
            } else {
                var state
                switch (parseInt(this.active)) {
                    case 1:
                        state = 0
                        break
                    default:
                        state = this.active
                }
                this.fn.ajax('get', {action: 'list', state, pageno: this.page[this.active]}, this.api.order.list, res => {
                    this.total[this.active] = parseInt(res.data.total)
                    this.list[this.active].list = this.list[this.active].list.concat(res.data.list)
                    if (this.list[this.active].list.length >= this.total[this.active]) {
                        this.loading = false
                        this.finished = true
                    } else {
                        this.page[this.active]++
                    }
                })
            }
        },
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
        },
        onLoad: function (index) {
            if (parseInt(index) === parseInt(this.active)) {
                this.getlist()
            }
        }
    },
    watch: {
        active: function () {
            this.finished = false
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
    .noMore {
        margin-top: 30%;
        text-align: center;
        display: block;
    }
    .noMore img {
        width: 40%;
        opacity: 0.5;
    }
    .noMore p {
        font-size: 14px;
        margin-top: 5%;
        color: #999;
    }
</style>