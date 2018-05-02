<template>
    <div class="searchPage-wrapper">
        <div class="container searchPage">
            <!-- 搜索记录 -->
            <div class="search-mask" v-if="logPopup">
                <div class="search-log">
                    <div class="clear-logs">
                        <div>最近搜索</div>
                        <div @click="clearLogs">清除</div>
                    </div>
                    <van-cell-swipe :right-width="42" v-for="(item, index) in loglist" :key="index" @click.native="logQuery(item.title)">
                        <van-cell-group>
                            <van-cell :title="item.title"></van-cell>
                        </van-cell-group>
                        <span slot="right" @click="deleteLogs(index)">删除</span>
                    </van-cell-swipe>
                </div>
            </div>
            <!-- 搜索结果 -->
            <div class="search-result pay" v-if="result">
                <div class="order-cell" v-for="(item, index) in searchResult" :key="index" @click="router(item.id)">
                    <div class="order-cell-img"><img src="../assets/img/sample7.jpg"></div>
                    <div class="order-cell-info">
                        <p class="goods-name">商品名称商品名称商品名称</p>
                        <p class="goods-price">￥8000.00</p>
                        <p class="goods-tips">提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息</p>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <van-search v-model="value" placeholder="请输入商品名称" autofocus :show-action="logPopup || result" @focus="focus" @keyup.13="query">
                <div slot="action" v-if="value!= ''" @click="query">搜索</div>
                <div slot="action" v-if="value== ''" @click="cancel">取消</div>
            </van-search>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchPage-wrapper',
    data () {
        return {
            result: false,
            logPopup: false,
            value: '',
            loglist: [],
            searchResult: ['', '', '', '', '', '', '', '']
        }
    },
    methods: {
        router (id) {
            this.$router.push({name: 'goodsDetail', params: {id}})
        },
        logQuery (value) {
            this.value = value
            this.query()
        },
        query () {
            var self = this
            if (this.value === '') {
                return false
            } else {
                if (this.loglist.length === 0) {
                    self.loglist.push({title: self.value})
                    localStorage.searchLogs = JSON.stringify(self.loglist)
                } else {
                    var num = 0
                    this.loglist.map(function (obj) {
                        if (obj.title === self.value) {
                            num++
                        }
                    })
                    if (num === 0) {
                        self.loglist.push({title: self.value})
                        localStorage.searchLogs = JSON.stringify(self.loglist)
                    }
                }
                this.value = ''
                this.logPopup = false
                this.result = true
            }
        },
        cancel () {
            this.logPopup = false
            this.result = false
        },
        focus () {
            if (!this.result) {
                this.logPopup = true
                if (localStorage.searchLogs) {
                    this.loglist = JSON.parse(localStorage.searchLogs)
                }
            }
        },
        searchLogHandle () {
            console.log('todo')
        },
        clearLogs () {
            localStorage.removeItem('searchLogs')
            this.loglist = []
        },
        deleteLogs (index) {
            this.loglist.splice(index, 1)
            localStorage.searchLogs = JSON.stringify(this.loglist)
        }
    }
}
</script>

<style type="text/css">
    .searchPage-wrapper .van-search__wrap {
        background-color: rgb(242, 242, 242);
        border: 0;
    }
    .searchPage-wrapper .index .search-mask {
        top: 54px;
    }
</style>