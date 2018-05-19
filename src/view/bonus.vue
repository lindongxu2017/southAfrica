<template>
    <div class="bonus-wrapper">
        <div class="container bonus">
            <div class="header">
                <p class="total" v-html="bonus">888.00</p>
                <p class="title">我的积分</p>
                <div class="bonus-class">
                    <div><p class="nums" v-html="bonuslist.dlprice">333.00</p><p class="name">组织奖</p></div>
                    <div><p class="nums" v-html="bonuslist.dpprice">222.00</p><p class="name">领导奖</p></div>
                    <div><p class="nums" v-html="bonuslist.expand_prize">333.00</p><p class="name">拓展奖</p></div>
                </div>
            </div>
            <div class="balanceLog">
                <p class="bonus-logs van-hairline--bottom">积分纪录</p>
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
                            <div v-html="'￥' + item.money">￥100.00</div>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bonus-wrapper',
    data () {
        return {
            bonus: 0,
            bonuslist: {
                dlprice: 0,
                dpprice: 0,
                expand_prize: 0
            },
            list: [],
            page: 1,
            loading: false,
            finished: false,
            total: 0
        }
    },
    mounted () {
        var userinfo = JSON.parse(localStorage.userinfo)
        this.bonus = userinfo.j_price
        // this.getlist()
    },
    methods: {
        getlist () {
            this.fn.ajax('get', {memo: 1, pageno: this.page}, this.api.center.bouns, res => {
                this.total = parseInt(res.data.total)
                this.list = this.list.concat(res.data.list)
                this.bonuslist = res.data.bonus_list
                this.loading = false
                if (this.list.length >= this.total) {
                    this.finished = true
                } else {
                    this.page++
                }
            })
        },
        onLoad () {
            this.getlist()
        }
    }
}
</script>