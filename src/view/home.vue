<template>
    <div class="home">
        <div class="main index">
            <div class="search-wrapper" @click="goSearch">
                <van-icon name="search"></van-icon>
                <span>请输入商品名称</span>
            </div>
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index, key) in swiperlist" :key="key"><img :src="item.proimg"></van-swipe-item>
            </van-swipe>
            <van-notice-bar :text="notice.content" left-icon="http://owtoeomqb.bkt.clouddn.com/notice.png" color="#D0021B"></van-notice-bar>
            <van-cell-group class="cell-title"><van-cell value="新品推荐" /></van-cell-group>
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <van-row gutter="10" class="index-row-list">
                    <van-col span="12" v-for="(item, key) in rowlist" @click.native="router(item.id)" :key="key">
                        <img :src="item.proimg">
                        <div class="product-info">
                            <p v-html="item.productname"></p>
                            <p class="price" v-html="'￥' + item.price"></p>
                        </div>
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
            rowlist: [],
            total: 0,
            page: 1,
            notice: {},
            swiperlist: []
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.carousel()
        })
    },
    mounted () {
        this.getNotice()
    },
    methods: {
        getNotice () {
            this.fn.ajax('get', {}, this.api.notice.item, res => {
                this.notice = res.data
            })
        },
        getlist () {
            this.fn.ajax('get', {action: 'list', pageno: this.page}, this.api.home.list, res => {
                this.total = res.data.total
                this.rowlist = this.rowlist.concat(res.data.list)
                this.loading = false
                if (this.rowlist.length >= this.total) {
                    this.finished = true
                } else {
                    this.page++
                }
            })
        },
        carousel: function () {
            this.fn.ajax('get', {}, this.api.home.carousel, res => {
                this.swiperlist = res.data
            })
        },
        router: function (id) {
            this.$router.push({name: 'goodsDetail', params: {id: id, type: 0}})
        },
        goSearch: function () {
            this.$router.push({name: 'search'})
        },
        onLoad: function () {
            this.getlist()
        }
    }
}
</script>
<style type="text/css">
    .home .van-swipe__track {
        min-height: 180px;
    }
</style>
<style type="text/css" scoped>
    .product-info {
        display: flex;
        flex-wrap: wrap;
        min-height: 70px;
        align-content: space-between;
    }
    .product-info p {
        width: 100%;
    }
</style>