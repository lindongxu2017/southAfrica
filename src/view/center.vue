<template>
    <div class="center">
        <!-- <div>{{$t("m.music")}}</div> -->
        <div class="lan-swith">
            <div :class="[lanActive == 0 ? 'active' : '' ]" @click="switchLan(0)">EN</div>
            <div :class="[lanActive == 1 ? 'active' : '' ]" @click="switchLan(1)">中文</div>
        </div>
        <div class="header">
            <!-- <div class="avatar"><img src="../assets/img/demo.jpg"></div> -->
            <div class="name">
                <div v-html="userinfo.nicheng || userinfo.username">班长大人</div>
                <div>
                    <van-button size="small" :class="[userinfo.pvp_id == 3 ? 'active' : '']" @click.native="tobe('pvp', 1, userinfo.pvp_id)">PVP</van-button>
                    <van-button size="small" :class="[userinfo.vip_id != 0 ? 'active' : '']" @click.native="tobe('pvp', 2, userinfo.vip_id)">VIP</van-button>
                    <van-button size="small" :class="[userinfo.shop_status_id == 1 ? 'active' : '']" @click.native="tobe('pvp', 3, userinfo.shop_status_id)" v-html="$t('m.mallMember')">商城会员</van-button>
                </div>
            </div>
        </div>
        <div class="section">
            <!-- <van-cell-group>
                <van-cell title="我的订单" ></van-cell>
            </van-cell-group> -->
            <div class="order-classify">
                <div @click="goOrder('')"><img src="../assets/icon/all.png"><p v-html="$t('m.allOrder')">全部订单</p></div>
                <div @click="goOrder(0)"><img src="../assets/icon/pending.png">
                    <van-badge-group v-if="parseInt(nums.weizhifu) > 0">
                        <van-badge :title="$t('m.pendingPayment')" :info="parseInt(nums.weizhifu)"></van-badge>
                    </van-badge-group>
                    <p v-else v-html="$t('m.pendingPayment')" info="10">待付款</p>
                </div>
                <div @click="goOrder(1)"><img src="../assets/icon/pendingsend.png">
                    <van-badge-group v-if="parseInt(nums.yizhifu) > 0">
                        <van-badge :title="$t('m.pendingDelivery')" :info="parseInt(nums.yizhifu)"></van-badge>
                    </van-badge-group>
                    <p v-else v-html="$t('m.pendingDelivery')">待发货</p>
                </div>
                <div @click="goOrder(2)"><img src="../assets/icon/recevied.png">
                    <van-badge-group v-if="parseInt(nums.yifahuo) > 0">
                        <van-badge :title="$t('m.toReceive')" :info="parseInt(nums.yifahuo)"></van-badge>
                    </van-badge-group>
                    <p v-else v-html="$t('m.pendingReceived')">待收货</p>
                </div>
                <div @click="goOrder(3)"><img src="../assets/icon/finish.png"><p v-html="$t('m.finished')">已完成</p></div>
            </div>
        </div>
        <!-- <div class="section">
            <van-cell-group>
                <van-cell class="gray" :title="$t('m.bonus')" :value="$t('m.seeMore')" is-link @click="golog(1)"></van-cell>
            </van-cell-group>
            <p class="balance-num" v-html="userinfo.j_price">888.00</p>
        </div> -->
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" :title="$t('m.balance')" :value="$t('m.flowRecord')" is-link @click="golog(2)"></van-cell>
            </van-cell-group>
            <div class="balance-num">
                <div v-html="userinfo.j_price">888.00</div>
                <div class="cash-bth" @click="router('recharge')" v-html="$t('m.recharge')"></div>
            </div>
            <div class="balance van-hairline--top">
                <div class="van-hairline--right" @click="cash" v-html="$t('m.withdraw')"></div>
                <div @click="router('transfer')">{{$t('m.transfer')}}</div>
            </div>
        </div>
        <div class="section links">
            <van-cell-group>
                <van-cell :title="$t('m.personalInfo')" is-link to="center/userinfo"></van-cell>
                <van-cell :title="$t('m.shippingAddress')" is-link to="center/addressAddorEdit"></van-cell>
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="$t('m.setPassword')" name="2">
                        <van-cell :title="$t('m.loginPassword')" is-link to="center/loginPassword"></van-cell>
                        <van-cell :title="$t('m.payPassword')" is-link to="center/operationPassword"></van-cell>
                    </van-collapse-item>
                </van-collapse>
                <!-- <van-cell :title="$t('m.operationLog')" is-link class="van-hairline--top" to="center/operationLog"></van-cell> -->
                <!-- <van-cell title="推广链接" label="www.baidu.com">
                    <img slot="right-icon" src="./icon/copy.png" class="van-cell__right-icon" width="20" height="20">
                </van-cell> -->
                <div class="my-van-cell" v-if="userinfo.tghttp">
                    <div class="label">{{$t('m.sponsoredLinks')}}</div>
                    <div class="tips" id="copyTarget">
                        <!-- <img class="task-key-img" :alt="userinfo.tghttp" src="">
                        <div class="task-key-shadow"></div> -->
                        <p v-html="userinfo.tghttp"></p>
                    </div>
                    <!-- <div class="right-btn" @click="copy">{{$t('m.copy')}}</div> -->
                </div>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
// UI框架组件国际化
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'

export default {
    name: 'center',
    data () {
        return {
            userinfo: {},
            activeNames: ['1'],
            lanActive: 1,
            lang: 'zh-CN',
            nums: {}
        }
    },
    mounted () {
        localStorage.routeSave = 0
        this.fn.getUserInfo()
        this.userinfo = JSON.parse(localStorage.userinfo)
        this.lang = this.$i18n.locale
        if (this.$i18n.locale === 'en-US') {
            this.lanActive = 0
        }
        if (localStorage.lang === 'en-US') {
            this.lanActive = 0
            this.lang = 'en-Us'
            this.switchLan(0)
        }
        this.getNums()
        document.title = '个人中心'
    },
    methods: {
        getNums () {
            this.fn.ajax('get', {action: 'getnum'}, this.api.order.list, res => {
                this.nums = res.data
                // console.log(this.nums)
            })
        },
        cash () {
            this.$router.push({name: 'cash'})
        },
        tobe: function (name, type, id) {
            if (type === 1 && parseInt(id) === 2) {
                this.$router.push({name: 'activePvp'})
            } else if (type === 3) {
                if (id === 2 || id === 3) {
                    this.$router.push({name: 'status', params: {type, id}})
                } else {
                    this.$router.push({name, params: {type, id}})
                }
            } else {
                this.$router.push({name, params: {type, id}})
            }
        },
        router: function (name) {
            this.$router.push({name})
        },
        golog (type) {
            this.$router.push({name: 'balanceLog', params: {type}})
        },
        goOrder: function (type) {
            var state = type
            if (type === '') {
                state = NaN
            }
            this.$router.push({name: 'order', params: {type: state}})
        },
        switchLan (type) {
            this.lanActive = type
            if (this.lang === 'en-US' && parseInt(type) === 1) {
                this.lang = 'zh-CN'
                // UI框架组件国际化
                Locale.use('zh-CN', zhCN)
                // 存储语言设置
                localStorage.lang = 'zh-CN'
            } else if (parseInt(type) === 0) {
                this.lang = 'en-US'
                // UI框架组件国际化
                Locale.use('en-US', enUS)
                // 存储语言设置
                localStorage.lang = 'en-US'
            }
            // i18n 国际化
            this.$i18n.locale = this.lang
        },
        copy () {
            if (window.clipboardData) {
                window.clipboardData.setData('Text', this.userinfo.tghttp)
                alert('复制成功')
            } else {
                alert('您的设备暂不支持该功能！')
            }
        }
    }
}
</script>

<style type="text/css">
    .center .van-badge--select, .van-badge--select:active {
        background-color: transparent;
        font-weight: 500;
        border: 0;
        color: #606266;
        font-size: 12px;
        line-height: 1.2;
        overflow: visible;
    }
    .center .van-badge--select::after {
        border: 0;
    }
    .center .van-badge__info {
        top: -10px
    }
    .center .van-badge {
        padding: 0
    }
    .center .van-badge-group {
        width: auto;
    }
</style>

<style type="text/css" scoped>
    .lan-swith {
        display: flex;
        border: 1px solid #D0021B;
        position: absolute;
        top: 38px;
        right: 15px;
        border-radius: 3px;
    }
    .lan-swith > div {
        padding: 0 2px;
        color: #D0021B;
        font-size: 12px;
        line-height: 16px;
    }
    .lan-swith > div.active {
        background-color: #D0021B;
        color: #fff;
    }
    .bouns {
        padding: 10px 15px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    .bouns .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .bouns .select-wrapper > div:first-child {
        color: #B0AEB0;
        margin-right: 15px;
    }
    .bouns .select-wrapper > div:last-child {
        position: relative;
        min-width: 52px;
        min-height: 15px;
    }
    .bouns .select-wrapper > div:last-child select {
        appearance: none;
        --webkit-appearance: none;
        border: 0;
        outline: none;
        padding-right: 25px;
        position: absolute;
        top: 0;
        z-index: 1;
        background-color: transparent;
        line-height: 15px;
    }
    .bouns .select-wrapper > div:last-child img {
        position: absolute;
        width: 20px;
        top: -3px;
        right: 0;
        z-index: 0;
    }
    .bouns .seeMore {
        display: flex;
        align-items: center;
    }
    .bouns .seeMore i {
        margin-left: 5px;
        color: #D0021B;
        font-size: 12px;
    }
    .section {
        padding-top: 10px;
    }
    .balance-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .balance-num .cash-bth {
        font-size: 12px;
        padding: 3px 10px;
        border: 1px solid #D0021B;
        color: #D0021B;
        border-radius: 25px;
    }
    .links .van-hairline--top::after {
        border-top-width: 0;
    }
</style>