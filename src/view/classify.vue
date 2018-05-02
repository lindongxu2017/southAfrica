<template>
    <div class="classify">
        <div class="search-classify" @click="goSearch">
            <div class="search-input">
                <van-icon name="search"></van-icon>
                <span>请输入商品名称</span>
            </div>
        </div>
        <div class="section">
            <div class="slider-content van-hairline--right">
                <div v-for="(item, index) in classlist" :class="[activeSelect == index ? 'active' : '']" :key="index" @click="switchClassify(index)" v-html="item.title"></div>
            </div>
            <div class="main-content">
                <div class="block">
                    <div class="class-banner">
                        <img src="../assets/img/class_banner.png">
                    </div>
                    <van-list v-model="loading" :finished="finished" @load="onLoad">
                        <div class="class-list-item" v-for="(item, index) in classlist[activeSelect].goodslist" :key="index" @click="router(item.id)">
                            <div class="class-list-item-img">
                                <img :src="item.imgUrl">
                            </div>
                            <div class="class-list-item-info">
                                <div class="goods-name" v-html="item.title">商品名称商品名称商品名称</div>
                                <div class="goods-info">
                                    <div class="goods-price" v-html="'￥' + item.price">￥8000.00</div>
                                    <!-- <div class="goods-buy">
                                        <div class="num-btn">-</div>
                                        <div>2</div>
                                        <div class="num-btn">+</div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </van-list>
                </div>
                <p class="noMore" v-if="finished">暂无更多...</p>
            </div>
        </div>
    </div>
</template>

<script>
var list = [
    {title: '商品1名称商品1名称商品1名称商品1名称商品1名称商品1名称', price: 100.00, imgUrl: require('../assets/img/goods1.png')},
    {title: '商品2名称', price: 300.00, imgUrl: require('../assets/img/goods2.png')},
    {title: '商品3名称', price: 60.00, imgUrl: require('../assets/img/goods3.png')},
    {title: '商品1名称', price: 100.00, imgUrl: require('../assets/img/goods1.png')},
    {title: '商品2名称', price: 300.00, imgUrl: require('../assets/img/goods2.png')},
    {title: '商品3名称', price: 60.00, imgUrl: require('../assets/img/goods3.png')}
]
export default {
    name: 'classify',
    data () {
        return {
            // 分类数据
            classlist: [
                { title: '新鲜水果', goodslist: [] },
                { title: '蔬菜单品', goodslist: [] }
            ],
            activeSelect: 0,
            loading: false,
            finished: false
        }
    },
    methods: {
        router: function (id) {
            id = 5
            this.$router.push({name: 'goodsDetail', params: {id, type: 0}})
            // location.href = './goodsDetail.html?id=' + id;
        },
        goSearch: function () {
            this.$router.push({name: 'search'})
            // location.href = './search.html'
        },
        switchClassify: function (index) {
            this.activeSelect = index
            this.loading = false
            this.finished = false
        },
        onLoad: function () {
            var self = this
            self.loading = true
            setTimeout(function () {
                if (self.classlist[self.activeSelect].goodslist.length >= 18) {
                    self.finished = true
                    self.loading = false
                    return false
                }
                self.classlist[self.activeSelect].goodslist = self.classlist[self.activeSelect].goodslist.concat(list)
                self.loading = false
            }, 1000)
        }
    }
}
</script>