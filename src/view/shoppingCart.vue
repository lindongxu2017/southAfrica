<template>
    <div class="shoppingCart">
        <div class="classify">
            <div class="main-content">
                <div class="block">
                    <div class="class-list-item" v-for="(item, index) in goodslist" :key="index" @click="router(item.productid)">
                        <div class="class-list-item-img">
                            <img :src="item.proimg">
                        </div>
                        <div class="class-list-item-info">
                            <div class="goods-name" v-html="item.productname">商品名称商品名称商品名称</div>
                            <div class="goods-info">
                                <div class="goods-price" v-html="'￥' + item.price">￥8000.00</div>
                                <div class="goods-buy">
                                    <div class="num-btn minus" @click.stop="minus(item.productid, index)">-</div>
                                    <div v-html="item.num">2</div>
                                    <div class="num-btn plus" @click.stop="plus(item.productid, index)">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="noMore" v-if="goodslist.length < 1">
                        <img src="../assets/icon/noMore.png">
                        <p>购物车是空的 ...</p>
                    </div>
                </div>
            </div>
        </div>
        <van-submit-bar :price="total" v-if="showTabbar" button-text="结算" :class="[showTabbar? 'showTabbar' : '']" @submit="onSubmit"></van-submit-bar>
        <van-popup v-model="popupVisibility" position="bottom">
            <van-picker :columns="columns" value-key="realname" show-toolbar title="选择代理商" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'shoppingCart',
    data () {
        return {
            showTabbar: false,
            popupVisibility: false,
            agentID: '',
            goodslist: [],
            columns: []
        }
    },
    computed: {
        total: function () {
            var sum = 0
            if (this.goodslist.length < 1) {
                return sum
            } else {
                this.goodslist.map(function (obj, index) {
                    sum += obj.num * obj.price * 100
                })
            }
            return sum
        }
    },
    mounted () {
        // if (parseInt(this.$route.params.type) === 1) {
        //     this.showTabbar = false
        // }
        this.getlist()
        this.getAgentlist()
        document.title = '购物车'
    },
    methods: {
        getAgentlist () {
            this.fn.ajax('post', {action: 'agentlist'}, this.api.shopping.cart, res => {
                this.columns = this.columns.concat(res.data)
            })
        },
        onCancel () {
            this.popupVisibility = false
        },
        onConfirm (value, index) {
            this.agentID = value.id
            this.popupVisibility = false
            this.fn.ajax('post', {action: 'order', agentid: this.agentID}, this.api.order.create, res => {
                this.$router.push({name: 'pay', params: {id: res.data.orderid, type: '1'}})
            })
        },
        onChange (picker, values) {
            this.agentID = values.id
        },
        getlist () {
            this.fn.ajax('get', {}, this.api.shopping.cart, res => {
                // this.detail = res.data
                this.goodslist = res.data.list
                if (this.goodslist.length < 1) {
                    this.showTabbar = false
                } else {
                    this.showTabbar = true
                }
            })
        },
        router: function (id) {
            this.$router.push({name: 'goodsDetail', params: {id, type: 1}})
        },
        minus: function (id, index) {
            if (this.goodslist[index].num >= 1) {
                this.goodslist[index].num--
                this.cartEdit(id, this.goodslist[index].num, index)
            }
        },
        plus: function (id, index) {
            this.goodslist[index].num++
            this.cartEdit(id, this.goodslist[index].num, index)
        },
        cartEdit (id, num, index) {
            this.fn.ajax('post', {action: 'editnum', id, num}, this.api.shopping.cart, res => {
                // todo
                if (this.goodslist[index].num === 0) {
                    this.goodslist.splice(index, 1)
                    this.showTabbar = false
                }
            })
        },
        onSubmit: function () {
            this.popupVisibility = true
        }
    }
}
</script>

<style type="text/css" scoped>
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