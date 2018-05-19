<template>
    <div class="pay-wrapper">
        <div class="container pay">
            <div class="address van-hairline--bottom" @click="goAddress">
                <van-cell-group>
                    <van-cell :title="address.name" :label="address.detail" is-link />
                </van-cell-group>
            </div>
            <div class="order-item" v-for="(item, index, key) in list" :key="key" :class="[index == 0 ? 'no-margin' : '']">
                <div class="order-cell" @click="router">
                    <div class="order-cell-img"><img :src="item.proimg"></div>
                    <div class="order-cell-info">
                        <p class="goods-name" v-html="item.productname">商品名称商品名称商品名称</p>
                        <p class="goods-price" v-html="'￥' + item.price">￥8000.00</p>
                        <!-- <p class="goods-tips">提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息</p> -->
                    </div>
                </div>
                <van-cell-group class="goods-info">
                    <div class="goods-num">
                        <div class="title">数量</div>
                        <div class="btn-group">
                            <!-- <div class="btn-item minus" @click="minus(item.productid, index)">-</div> -->
                            <div v-html="item.num">1</div>
                            <!-- <div class="btn-item plus" @click="plus(item.productid, index)">+</div> -->
                        </div>
                    </div>
                    <van-cell title="商品价格" :value="'￥' + (item.price * item.num) + '.00'" :border="bool"></van-cell>
                    <van-cell title="返回积分" :value="item.integral" :border="bool"></van-cell>
                    <!-- <van-cell value="总价：￥7920元" :border="bool"></van-cell> -->
                </van-cell-group>
            </div>
            <div class="all-data">
                <div class="slot"></div>
                <div class="data-wrapper">
                    <div class="data-item">
                        <div class="data-item-label">数量</div>
                        <div class="data-item-value" v-html="sum">2</div>
                    </div>
                    <div class="data-item">
                        <div class="data-item-label">商品金额</div>
                        <div class="data-item-value" v-html="'￥' + total">￥5455.00</div>
                    </div>
                    <div class="data-item">
                        <div class="data-item-label">返回积分</div>
                        <div class="data-item-value" v-html="reward">￥54.00</div>
                    </div>
                    <div class="data-item need-pay">
                        <div class="data-item-label">需支付</div>
                        <div class="data-item-value" v-html="'￥' + total">￥5401.00</div>
                    </div>
                </div>
            </div>
            <div class="pay-btn">
                <van-button type="default" size="large" @click.native="onSubmit">支付</van-button>
            </div>
            <!-- 输入密码 -->
            <van-popup v-model="passwordPopup" position="right" class="password">
                <van-password-input :value="password" info="密码为 6 位数字" @click.native="showKeyboard = true"></van-password-input>
                <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'pay-wrapper',
    data () {
        return {
            bool: false,
            id: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false,
            list: [],
            address: {
                name: '',
                detail: ''
            }
        }
    },
    computed: {
        total: function () {
            var sum = 0
            if (this.list.length > 0) {
                this.list.map(function (obj, index) {
                    sum += parseInt(obj.num) * obj.price
                })
                return sum
            }
            return sum
        },
        sum: function () {
            var sum = 0
            if (this.list.length > 0) {
                this.list.map(function (obj, index) {
                    sum += parseInt(obj.num)
                })
                return sum
            }
            return sum
        },
        reward: function () {
            var sum = 0
            if (this.list.length > 0) {
                this.list.map(function (obj, index) {
                    sum += parseInt(obj.integral)
                })
                return sum
            }
            return sum
        }
    },
    mounted () {
        this.fn.getUserInfo()
        setTimeout(() => {
            var userinfo = JSON.parse(localStorage.userinfo)
            this.address.name = userinfo.receiver
            this.address.detail = userinfo.province_name + userinfo.city_name + userinfo.address
        }, 100)
        this.id = this.$route.params.id
        this.getlist()
    },
    methods: {
        getlist () {
            this.fn.ajax('get', {action: 'detail', id: this.id}, this.api.order.list, res => {
                this.list = res.data.product_ist
            })
        },
        router () {
            this.$router.push({name: 'goodsDetail', params: {id: this.id}})
            // location.href = './goodsDetail.html?id=' + this.id
        },
        goAddress () {
            this.$router.push({name: 'addressAddorEdit'})
            // location.href = './address.html'
        },
        minus: function (id, index) {
            if (this.list[index].num >= 1) {
                this.list[index].num--
                this.cartEdit(id, this.list[index].num)
            }
        },
        plus: function (id, index) {
            this.list[index].num++
            this.cartEdit(id, this.list[index].num)
        },
        cartEdit (id, num) {
            this.fn.ajax('post', {action: 'editnum', id, num}, this.api.shopping.cart, res => {
                // todo
            })
        },
        onSubmit () {
            this.passwordPopup = true
        },
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                this.fn.ajax('get', {action: 'payment', id: this.id, pwd1: this.password}, this.api.order.list, res => {
                    if (res === 'error') {
                        this.password = ''
                        this.passwordPopup = false
                    } else {
                        Dialog.alert({
                            title: '提示',
                            message: '支付成功！'
                        }).then(() => {
                            localStorage.payed = 1
                            this.passwordPopup = false
                            this.$router.push({name: 'order', params: {type: 1}})
                        })
                    }
                })
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.passwordPopup) {
            this.password = ''
            this.passwordPopup = false
            next(false)
        } else {
            next()
        }
    }
}
</script>

<style type="text/css">
    .pay-wrapper .address {
        min-height: 87px;
    }
</style>