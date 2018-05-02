<template>
    <div class="shoppingCart">
        <div class="classify">
            <div class="main-content">
                <div class="block">
                    <div class="class-list-item" v-for="(item, index) in goodslist" :key="index" @click="router(item.id)">
                        <div class="class-list-item-img">
                            <img :src="item.imgUrl">
                        </div>
                        <div class="class-list-item-info">
                            <div class="goods-name" v-html="item.title">商品名称商品名称商品名称</div>
                            <div class="goods-info">
                                <div class="goods-price" v-html="'￥' + item.price">￥8000.00</div>
                                <div class="goods-buy">
                                    <div class="num-btn minus" @click.stop="minus(item.id, index)">-</div>
                                    <div v-html="item.num">2</div>
                                    <div class="num-btn plus" @click.stop="plus(item.id, index)">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-submit-bar :price="total" button-text="结算" :class="[showTabbar? 'showTabbar' : '']" @submit="onSubmit"></van-submit-bar>
    </div>
</template>

<script>
export default {
    name: 'shoppingCart',
    data () {
        return {
            showTabbar: true,
            goodslist: [
                {title: '商品1名称商品1名称商品1名称商品1名称商品1名称商品1名称商品1名称商品1名称商品1名称', desc: '描述文字描述文字描述文字描述文字', num: 1, price: 100.00, imgUrl: require('../assets/img/goods1.png')},
                {title: '商品2名称', desc: '描述文字描述文字', num: 1, price: 300.00, imgUrl: require('../assets/img/goods2.png')},
                {title: '商品3名称', desc: '描述文字描述文字描述文字描述文字', num: 1, price: 60.00, imgUrl: require('../assets/img/goods3.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods1.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods2.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods3.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods1.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods2.png')},
                {title: '商品4名称', desc: '描述文字', num: 2, price: 50.00, imgUrl: require('../assets/img/goods3.png')}
            ]
        }
    },
    computed: {
        total: function () {
            var sum = 0
            this.goodslist.map(function (obj, index) {
                sum += obj.num * obj.price
            })
            return sum * 100
        }
    },
    mounted () {
        if (parseInt(this.$route.params.type) === 1) {
            this.showTabbar = false
        }
    },
    methods: {
        router: function (id) {
            id = 4
            this.$router.push({name: 'goodsDetail', params: {id, type: 1}})
        },
        minus: function (id, index) {
            if (this.goodslist[index].num >= 1) {
                this.goodslist[index].num--
            }
        },
        plus: function (id, index) {
            console.log(id, index)
            this.goodslist[index].num++
        },
        onSubmit: function () {
            this.$router.push({name: 'pay', params: {id: NaN}})
            // location.href = 'pay.html'
        }
    }
}
</script>