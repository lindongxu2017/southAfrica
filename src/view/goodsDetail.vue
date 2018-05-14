<template>
    <div class="goodsDetail">
        <div class="container goodsDtail">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index, key) in detail.carousel_proimg" :key="key"><img :src="item"></van-swipe-item>
            </van-swipe>
            <div class="info">
                <div class="title">
                    <div class="name" v-html="detail.productname">文字描述文字描述文字描述文字描述文字描述文字描述文字描述</div>
                    <div class="nums">库存：<span v-html="detail.num"></span></div>
                </div>
                <div class="price" v-html="'￥' + detail.price">￥888888</div>
                <!-- <div class="tips" v-html="detail.productsn">文字描述文字描述文字描述文字描述文字</div> -->
            </div>
            <van-tabs v-model="active" class="goods-desc" :class="[showBar ? '': 'no-padding']" v-if="detail.memo">
                <van-tab title="商品详情" class="goods-img" v-html="detail.memo">
                    <!-- <img v-for="(img, key) in imageList" :src="img" :key="key"> -->
                </van-tab>
                <!-- <van-tab title="商品参数" class="goods-parameter">
                    <img v-for="(img, key) in parameter" :src="img" :key="key">
                </van-tab> -->
            </van-tabs>
            <van-goods-action v-if="showBar">
                <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn(1)" :info="info"></van-goods-action-mini-btn>
                <van-goods-action-big-btn text="加入购物车" @click="onClickMiniBtn(2)"></van-goods-action-big-btn>
                <!-- <van-goods-action-big-btn text="立即购买" @click="onClickMiniBtn(3)" primary></van-goods-action-big-btn> -->
            </van-goods-action>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsDetail',
    data () {
        return {
            active: 0,
            imageList: [
                require('../assets/img/sample1.jpg'),
                require('../assets/img/sample2.jpg'),
                require('../assets/img/sample3.jpg'),
                require('../assets/img/sample4.jpg'),
                require('../assets/img/sample5.jpg'),
                require('../assets/img/sample6.jpg'),
                require('../assets/img/sample7.jpg'),
                require('../assets/img/sample8.jpg')
            ],
            showBar: true,
            id: '',
            detail: {},
            info: 0
        }
    },
    mounted () {
        if (parseInt(this.$route.params.type) === 1) {
            this.showBar = false
        }
        this.id = this.$route.params.id
        this.getDetail()
        this.getTotal()
    },
    methods: {
        getDetail () {
            this.fn.ajax('get', {action: 'detail', id: this.id}, this.api.home.detail, res => {
                this.detail = res.data
            })
        },
        getTotal () {
            this.fn.ajax('get', {}, this.api.shopping.cart, res => {
                var total = 0
                res.data.list.map((item, index, input) => {
                    // console.log(item, index, input)
                    total += parseInt(item.num)
                })
                this.info = total
            })
        },
        onClickMiniBtn: function (type) {
            switch (parseInt(type)) {
                case 1:
                    this.$router.push({name: 'shoppingCart'})
                    break
                case 2:
                    // alert('do something')
                    this.fn.ajax('post', {num: 1, id: this.id}, this.api.shopping.joincart, res => {
                        this.info++
                    })
                    break
            }
        }
    }
}
</script>