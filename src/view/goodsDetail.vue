<template>
    <div class="goodsDetail">
        <div class="container goodsDtail">
            <van-swipe :autoplay="3000">
                <van-swipe-item><img src="../assets/img/banner2.jpg"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner3.jpg"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner4.jpg"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner5.jpg"></van-swipe-item>
            </van-swipe>
            <div class="info">
                <div class="title">
                    <div class="name">文字描述文字描述文字描述文字描述文字描述文字描述文字描述</div>
                    <div class="nums">库存：66666</div>
                </div>
                <div class="price">￥888888</div>
                <div class="tips">文字描述文字描述文字描述文字描述文字</div>
            </div>
            <van-tabs v-model="active" class="goods-desc" :class="[showBar ? '': 'no-padding']">
                <van-tab title="商品详情" class="goods-img">
                    <img v-for="(img, key) in imageList" :src="img" :key="key">
                </van-tab>
                <van-tab title="商品参数" class="goods-parameter">
                    <img v-for="(img, key) in parameter" :src="img" :key="key">
                </van-tab>
            </van-tabs>
            <van-goods-action v-if="showBar">
                <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn(1)"></van-goods-action-mini-btn>
                <van-goods-action-big-btn text="加入购物车" @click="onClickMiniBtn(2)"></van-goods-action-big-btn>
                <van-goods-action-big-btn text="立即购买" @click="onClickMiniBtn(3)" primary></van-goods-action-big-btn>
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
            parameter: [
                require('../assets/img/parameter5.png'),
                require('../assets/img/parameter1.png'),
                require('../assets/img/parameter2.png'),
                require('../assets/img/parameter3.png'),
                require('../assets/img/parameter4.png')
            ],
            showBar: true,
            id: '',
            detail: {}
        }
    },
    mounted () {
        if (parseInt(this.$route.params.type) === 1) {
            this.showBar = false
        }
        this.id = this.$route.params.id
        this.getDetail()
    },
    methods: {
        getDetail () {
            this.fn.ajax('get', {action: 'detail', id: this.id}, this.api.home.detail, res => {
                this.detail = res.data
            })
        },
        onClickMiniBtn: function (type) {
            switch (parseInt(type)) {
                case 1:
                    this.$router.push({name: 'shoppingCart', params: {type: 1}})
                    break
                case 2:
                    alert('do something')
                    break
                case 3:
                    this.$router.push({name: 'pay'})
                    break
            }
        }
    }
}
</script>