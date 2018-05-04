<template>
    <div class="footerNav">
        <van-tabbar v-model="active" v-if="showBar">
            <van-tabbar-item icon="shop" @click="routeTo('home')">
                <span v-html="$t('m.mall')">商城</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon.active_1 : icon.normal_1" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="shop" @click="routeTo('classify')">
                <span v-html="$t('m.classification')">分类</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon.active_2 : icon.normal_2" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="shop" @click="routeTo('shoppingCart')">
                <span v-html="$t('m.shoppingCart')">购物车</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon.active_3 : icon.normal_3" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="chat" @click="routeTo('center')">
                <span v-html="$t('m.personalCenter')">个人中心</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? icon.active_4 : icon.normal_4" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'footerNav',
    data () {
        return {
            active: 0,
            icon: {
                normal_1: require('../assets/icon/item.png'),
                active_1: require('../assets/icon/item-active.png'),
                normal_2: require('../assets/icon/classify.png'),
                active_2: require('../assets/icon/classify-active.png'),
                normal_3: require('../assets/icon/car.png'),
                active_3: require('../assets/icon/car-active.png'),
                normal_4: require('../assets/icon/center.png'),
                active_4: require('../assets/icon/center-active.png')
            },
            showBar: true
        }
    },
    created () {
        this.redirect()
    },
    methods: {
        routeTo (name) {
            this.$router.push({name})
            if (name === 'shoppingCart') {
                this.$router.push({name: 'shoppingCart', params: {type: 0}})
            }
        },
        redirect () {
            // console.log(this.$route)
            var name = this.$route.name
            var active = NaN
            switch (name) {
                case 'home':
                    active = 0
                    break
                case 'classify':
                    active = 1
                    break
                case 'shoppingCart':
                    active = 2
                    if (parseInt(this.$route.params.type) === 1) {
                        this.showBar = false
                    }
                    break
                case 'center':
                    active = 3
                    break
            }
            this.active = active
        }
    }
}
</script>