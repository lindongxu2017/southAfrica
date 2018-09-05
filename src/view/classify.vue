<template>
    <div class="classify">
        <div class="search-classify" @click="goSearch">
            <div class="search-input">
                <van-icon name="search"></van-icon>
                <span>{{$t('m.inputTips_1')}}</span>
            </div>
        </div>
        <div class="section">
            <div class="slider-content van-hairline--right">
                <div v-for="(item, index) in classlist" :class="[activeSelect == index ? 'active' : '']" :key="index" @click="switchClassify(index)" v-html="item.name"></div>
            </div>
            <div class="main-content">
                <div class="block">
                    <div class="class-banner">
                        <img src="../assets/img/class_banner.png">
                    </div>
                    <van-list v-model="loading" :finished="finished" @load="onLoad">
                        <div class="class-list-item" v-for="(item, index) in list" :key="index" @click="router(item.id)">
                            <div class="class-list-item-img">
                                <img :src="item.proimg">
                            </div>
                            <div class="class-list-item-info">
                                <div class="goods-name" v-html="item.productname">商品名称商品名称商品名称</div>
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
export default {
    name: 'classify',
    data () {
        return {
            // 分类数据
            classlist: [],
            list: [],
            activeSelect: 0,
            loading: false,
            finished: false,
            page: 1,
            total: 0
        }
    },
    mounted () {
        this.getClass()
        document.title = '商品分类'
    },
    methods: {
        getClass () {
            this.fn.ajax('get', {action: 'category'}, this.api.shopping.class, res => {
                this.classlist = res.data
                this.getlist()
            })
        },
        getlist () {
            this.fn.ajax('get', {action: 'list', pageno: this.page, cat: this.classlist[this.activeSelect].id}, this.api.home.list, res => {
                this.total = res.data.total
                this.list = this.list.concat(res.data.list)
                this.loading = false
                if (this.list.length >= this.total) {
                    this.finished = true
                } else {
                    this.page++
                }
            })
        },
        router: function (id) {
            this.$router.push({name: 'goodsDetail', params: {id, type: 0}})
        },
        goSearch: function () {
            this.$router.push({name: 'search'})
        },
        switchClassify: function (index) {
            this.activeSelect = index
            this.loading = false
            this.finished = false
            this.total = 0
            this.page = 1
            this.list = []
        },
        onLoad: function () {
            if (this.classlist.length > 0) {
                this.getlist()
            }
        }
    }
}
</script>