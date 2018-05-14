<template>
    <div class="order-wrapper">
        <div class="container order">
            <van-tabs v-model="active">
                <van-tab v-for="(item, index, key) in list" :key="key" :title="item.title">
                    <div class="order-list" v-if="index == active">
                        <van-list v-model="loading" :finished="finished" :offset="offset" @load="onLoad(index)">
                            <div class="order-item" v-for="(obj, index1, key) in item.list" :key="key">
                                <div class="order-num-status">
                                    <div>订单号：<span v-html="obj.id"></span></div>
                                    <div :class="{'pending-pay': obj.state == 0, 'confirm': obj.state == 1}" >
                                        <span v-html="obj.state_name"></span>
                                        <img v-if="obj.state == 0" src="../assets/icon/pendingPay.png" width="16">
                                        <img v-if="obj.state == 1" src="../assets/icon/confirm.png" width="16">
                                    </div>
                                </div>
                                <div v-for="(product, index, key) in obj.product_ist" :key="key" @click="goDetail(product.productid)">
                                    <div class="order-info">
                                        <div class="order-img"><img :src="product.proimg"></div>
                                        <div class="order-desc">
                                            <div v-html="product.productname">商品名称</div>
                                            <div class="price-nums">
                                                <div v-html="'￥' + product.price">￥168.00</div>
                                                <div v-html="'x' + product.num"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-btn van-hairline--top pendingPay" v-if="obj.state == 0" @click.stop="goPay(obj.id)">去支付</div>
                                <div class="order-btn van-hairline--top confirm" v-if="obj.state == 1" @click.stop="comfirm(index1, obj.id)">确认收货</div>
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
            active: 0,
            // 全部
            list: [
                { title: '所有订单', list: [] },
                { title: '待付款', list: [] },
                { title: '待收货', list: [] },
                { title: '已完成', list: [] }
            ],
            loading: false,
            finished: false,
            total: [1, 1, 1, 1],
            page: [1, 1, 1, 1],
            offset: 100,
            routeName: ''
        }
    },
    mounted () {
        this.active = this.$route.params.type
        this.tabActive = this.$route.params.type
    },
    methods: {
        getlist () {
            var state = ''
            switch (parseInt(this.active)) {
                case 0:
                    state = ''
                    break
                case 1:
                    state = 0
                    break
                default:
                    state = this.active
                    break
            }
            // 有待优化
            this.fn.ajax('get', {action: 'list', state, pageno: this.page[this.active]}, this.api.order.list, res => {
                this.total[this.active] = parseInt(res.data.total)
                this.loading = false
                if (this.list[this.active].list.length >= this.total[this.active]) {
                    this.finished = true
                } else {
                    this.list[this.active].list = this.list[this.active].list.concat(res.data.list)
                    this.page[this.active]++
                    if (this.list[this.active].list.length < this.total[this.active] && this.total[this.active] <= 10) {
                        this.page[this.active] = 1
                    }
                }
            })
        },
        goPay: function (id) {
            this.$router.push({name: 'pay', params: {id, type: 2}})
        },
        goDetail: function (id) {
            this.$router.push({name: 'goodsDetail', params: {id, type: 2}})
            // this.$router.push({name: 'orderDetail', params: {id}})
        },
        comfirm: function (index, id) {
            this.fn.ajax('get', {action: 'receive', id}, this.api.order.list, res => {
                this.list[2].list.splice(index, 1)
                this.active = 3
            })
        },
        onLoad: function (index) {
            this.getlist()
        }
    },
    watch: {
        active: function () {
            this.loading = false
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