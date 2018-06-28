<template>
    <div class="balanceLog-wrapper">
        <div class="container balanceLog">
            <div class="table-heaer van-hairline--bottom">
                <div>时间</div>
                <div>类型</div>
                <div>金额</div>
            </div>
            <div class="table-body">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <div class="table-tr van-hairline--bottom" v-for="(item, index) in list" :key="index">
                        <div class="time" v-html="item.addtime"></div>
                        <div v-html="item.money_name">余额提现</div>
                        <div v-if="item.type == 1" v-html="'￥' + item.money">￥100.00</div>
                        <div v-else v-html="'-￥' + item.money">￥100.00</div>
                    </div>
                </van-list>
                <p class="noMore" v-if="finished">暂无更多...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'balanceLog-wrapper',
    data () {
        return {
            chosenAddressId: '1',
            list: [],
            total: 0,
            page: 1,
            loading: false,
            finished: false,
            type: ''
        }
    },
    mounted () {
        this.type = parseInt(this.$route.params.type)
        if (this.type === 1) {
            document.title = '余额明细'
        } else {
            document.title = '消费明细'
        }
    },
    methods: {
        onLoad: function () {
            var api = ''
            var data = {}
            if (this.type === 1) {
                api = '/mobile/api/bonus.php'
                data = {
                    pageno: this.page
                }
            } else {
                api = '/mobile/api/finance.php'
                data = {
                    action: 'list',
                    pageno: this.page
                }
            }
            this.fn.ajax('get', data, api, res => {
                this.total = parseInt(res.data.total)
                this.list = this.list.concat(res.data.list)
                this.loading = false
                if (this.list.length >= this.total) {
                    this.finished = true
                } else {
                    this.page++
                }
            })
        }
    }
}
</script>

<style type="text/css">
    .balanceLog-wrapper .noMore {
        margin-top: 10%;
    }
</style>