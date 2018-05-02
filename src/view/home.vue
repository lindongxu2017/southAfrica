<template>
    <div class="home">
        <div class="main index">
            <div class="search-wrapper" @click="goSearch">
                <van-icon name="search"></van-icon>
                <span>请输入商品名称</span>
            </div>
            <van-swipe :autoplay="3000">
                <van-swipe-item><img src="../assets/img/banner_index.png"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner_index.png"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner_index.png"></van-swipe-item>
                <van-swipe-item><img src="../assets/img/banner_index.png"></van-swipe-item>
            </van-swipe>
            <van-notice-bar
            text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
            left-icon="http://owtoeomqb.bkt.clouddn.com/notice.png" color="#D0021B"></van-notice-bar>
            <van-cell-group class="cell-title"><van-cell value="新品推荐" /></van-cell-group>
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <van-row gutter="10" class="index-row-list">
                    <van-col span="12" v-for="(item, key) in rowlist" @click.native="router(item.id)" :key="key">
                        <img :src="item.imgUrl">
                        <p>商品描述文字商品描述文字商品描述文字</p>
                        <p class="price">￥ 888.00元</p>
                    </van-col>
                </van-row>
            </van-list>
            <p class="noMore" v-if="finished">暂无更多...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            loading: false,
            finished: false,
            rowlist: []
        }
    },
    methods: {
        router: function (id) {
            id = 3
            this.$router.push({name: 'goodsDetail', params: {id: id, type: 0}})
        },
        goSearch: function () {
            this.$router.push({name: 'search'})
        },
        onLoad: function () {
            var self = this
            setTimeout(function () {
                for (let i = 1; i < 4; i++) {
                    self.rowlist.push({imgUrl: require('../assets/img/goods' + i + '.png')})
                }
                self.loading = false
                if (self.rowlist.length >= 18) {
                    self.finished = true
                }
            }, 1000)
        }
    }
}
</script>