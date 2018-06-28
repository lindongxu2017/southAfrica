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
                    <van-cell title="返回余额" :value="item.integral" :border="bool"></van-cell>
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
                        <div class="data-item-label">返回余额</div>
                        <div class="data-item-value" v-html="reward">￥54.00</div>
                    </div>
                    <div class="data-item reductible"  v-if="points != ''">
                        <div class="data-item-label">余额抵扣</div>
                        <div class="data-item-value" v-html="'-' + points">￥54.00</div>
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
            <p class="points"><span @click="dialogVisibility = true">使用余额抵扣？</span></p>
            <van-dialog v-model="dialogVisibility" show-cancel-button :before-close="beforeClose">
                <p class="dialog-title">余额抵扣</p>
                <div class="dialog-body">
                    <van-field v-model="points" type="number"
                    :error-message="points > parseInt(rules.jifen_yu_max) ? '余额抵扣上限不能超过' + rules.jifen_yu_max : ''"
                    label="余额" placeholder="请输入余额数量"/>
                    <div class="rules">
                        <div class="title">规则</div>
                        <div class="values">
                            余额抵扣上限<strong v-html="rules.jifen_yu_max"></strong>，当前可用余额<strong v-html="j_price"></strong>
                        </div>
                    </div>
                </div>
            </van-dialog>
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
            },
            points: '',
            dialogVisibility: false,
            j_price: 0,
            rules: {}
        }
    },
    computed: {
        total: function () {
            var sum = 0
            if (this.list.length > 0) {
                this.list.map(function (obj, index) {
                    sum += parseInt(obj.num) * obj.price
                })
                if (this.points !== '') {
                    sum -= parseInt(this.points)
                }
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
        this.getRules()
        this.j_price = JSON.parse(localStorage.userinfo).j_price
        document.title = '支付'
    },
    methods: {
        getRules () {
            this.fn.ajax('post', {action: 'getRatio'}, this.api.shopping.ratio, res => {
                this.rules = res.data
            })
        },
        getlist () {
            this.fn.ajax('get', {action: 'detail', id: this.id}, this.api.order.list, res => {
                this.list = res.data.product_ist
                if (parseInt(res.data.state) > 0) {
                    Dialog.alert({
                        title: '提示',
                        message: '支付已完成！'
                    }).then(() => {
                        this.$router.push({name: 'home'})
                    })
                }
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
        },
        beforeClose (action, done) {
            if (action === 'confirm') {
                if (this.points > 100) {
                    return false
                } else {
                    setTimeout(done, 1000)
                }
            } else {
                done()
                this.points = ''
            }
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                this.fn.ajax('get', {action: 'payment', id: this.id, pwd1: this.password, input_jifen: this.points}, this.api.order.list, res => {
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
                            this.points = ''
                            this.fn.getUserInfo()
                        })
                    }
                })
            }
        },
        passwordPopup: function () {
            if (this.passwordPopup) {
                document.title = '输入密码'
            } else {
                document.title = '支付'
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
    .pay .van-dialog__footer--buttons .van-button {
        background-color: #fff;
        border-color: #fff;
    }
</style>

<style scoped>
    .pay-btn {
        margin-bottom: 5px;
    }
    .points {
        font-size: 14px;
        text-align: right;
        padding: 0 15px 30px;
    }
    .dialog-title {
        text-align: center;
        line-height: 45px;
        border-bottom: 1px solid #e5e5e5;
    }
    .dialog-body {
        padding: 15px 0;
    }
    .rules {
        display: flex;
        padding: 10px 15px;
        font-size: 14px;
    }
    .rules .title {
        flex: 1;
        flex-basis: 90px;
        color: #333;
    }
    .rules .values {
        color: #606266;
        flex-wrap: wrap;
    }
    .pay .all-data .data-wrapper .data-item.reductible .data-item-value {
        color: #d0021b;
    }
</style>