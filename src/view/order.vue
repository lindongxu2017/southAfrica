<template>
    <div class="order-wrapper">
        <div class="container order" :class="[lang_en?'en':'']">
            <van-tabs v-model="active">
                <van-tab v-for="(item, indexF, key) in list" :key="key" :title="item.title">
                    <div class="order-list" v-if="indexF == active">
                        <van-list v-model="loading" :finished="finished" :offset="offset" @load="onLoad(indexF)">
                            <div class="order-item" v-for="(obj, index1, key) in item.list" :key="key">
                                <div class="order-num-status">
                                    <div>{{$t('m.orderNumber')}}：<span v-html="obj.id"></span></div>
                                    <div :class="{'pending-pay': obj.state == 0, 'confirm': obj.state == 1}" >
                                        <span v-html="obj.state_name"></span>
                                        <img v-if="obj.state == 0" src="../assets/icon/pendingPay.png" width="16">
                                        <img v-if="obj.state == 1" src="../assets/icon/confirm.png" width="16">
                                    </div>
                                </div>
                                <div class="order-num-status" v-if="obj.log_no" style="padding-top: 10px">
                                    <div>{{$t('m.trackingNumber')}}：<span v-html="obj.log_no"></span></div>
                                </div>
                                <div class="order-num-status" v-if="obj.log_no" style="padding-top: 10px">
                                    <div>{{$t('m.logisticsCompany')}}：<span v-html="obj.company"></span></div>
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
                                <div class="order-btn van-hairline--top pendingPay" v-if="obj.state == 0">
                                    <div class="van-hairline--right" @click.stop="deleteOrder(indexF, index1, obj.id)">{{$t('m.deleteOrder')}}</div>
                                    <div @click.stop="goPay(obj.id)">{{$t('m.pay')}}</div>
                                </div>
                                <div class="order-btn van-hairline--top confirm" v-if="obj.state == 2" @click.stop="comfirm(index1, obj.id)">{{$t('m.confirmReceipt')}}</div>
                            </div>
                        </van-list>
                    </div>
                    <div class="noMore" v-if="total[indexF] == 0">
                        <img src="../assets/icon/noMore.png">
                        <p>{{$t('m.noOrder')}}</p>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'order-wrapper',
    data () {
        return {
            active: 0,
            // 全部
            list: [],
            loading: false,
            finished: false,
            total: [1, 1, 1, 1, 1],
            page: [1, 1, 1, 1, 1],
            offset: 100,
            routeName: '',
            lang_en: false
        }
    },
    mounted () {
        if (localStorage.lang === 'en-US') {
            this.lang_en = true
        }
        document.title = '订单列表'
        // console.log(window.lang)
        setTimeout(() => {
            // console.log(window.lang)
            this.list = [
                { title: window.lang('m.allOrder'), list: [] },
                { title: window.lang('m.pendingPayment'), list: [] },
                { title: window.lang('m.pendingDelivery'), list: [] },
                { title: window.lang('m.pendingReceived'), list: [] },
                { title: window.lang('m.finished'), list: [] }
            ]
            this.$nextTick(() => {
                if (this.$route.params.type >= 0) {
                    this.active = this.$route.params.type + 1
                }
            })
        })
    },
    methods: {
        getlist () {
            var state = this.active
            if (this.active === 0) {
                state = ''
            } else {
                state = this.active - 1
            }
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
        deleteOrder (index1, index2, id) {
            var self = this
            Dialog.confirm({
                title: self.$t('m.tip'),
                message: self.$t('m.isDeleteOrder')
            }).then(() => {
                // on confirm
                this.fn.ajax('get', {action: 'del', id}, this.api.order.list, res => {
                    this.list[index1].list.splice(index2, 1)
                    this.total[index1]--
                })
            }).catch(() => {
                // on cancel
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
                this.list[3].list.splice(index, 1)
                this.active = 4
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

<style type="text/css">
    .order-wrapper .en .van-tabs__nav--line {
        display: block;
        white-space: nowrap;
    }
    .order-wrapper .en .van-tab {
        display: inline-block;
    }
</style>

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