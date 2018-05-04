<template>
    <div class="center">
        <!-- <div>{{$t("m.music")}}</div> -->
        <div class="lan-swith">
            <div :class="[lanActive == 0 ? 'active' : '' ]" @click="switchLan(0)">EN</div>
            <div :class="[lanActive == 1 ? 'active' : '' ]" @click="switchLan(1)">中文</div>
        </div>
        <div class="header">
            <div class="avatar"><img src="../assets/img/demo.jpg"></div>
            <div class="name">
                <div>班长大人</div>
                <div>
                    <van-button size="small" class="active" @click.native="tobe('pvp', 1)">PVP</van-button>
                    <van-button size="small" @click.native="tobe('pvp', 2)">VIP</van-button>
                    <van-button size="small" @click.native="tobe('pvp', 3)" v-html="$t('m.shopowner')">店长</van-button>
                </div>
            </div>
        </div>
        <div class="section">
            <!-- <van-cell-group>
                <van-cell title="我的订单" ></van-cell>
            </van-cell-group> -->
            <div class="order-classify">
                <div><img src="../assets/icon/all.png" @click="goOrder(0)"><p v-html="$t('m.all')">全部订单</p></div>
                <div><img src="../assets/icon/pending.png" @click="goOrder(1)"><p v-html="$t('m.pendingPay')">待付款</p></div>
                <div><img src="../assets/icon/recevied.png" @click="goOrder(2)"><p v-html="$t('m.toReceive')">待收货</p></div>
                <div><img src="../assets/icon/finish.png" @click="goOrder(3)"><p v-html="$t('m.completed')">已完成</p></div>
            </div>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" :title="$t('m.balance')" :value="$t('m.flowRecords')" is-link to="center/balanceLog" ></van-cell>
            </van-cell-group>
            <p class="balance-num">888.00</p>
            <div class="balance van-hairline--top">
                <div class="van-hairline--right" @click="router('cash')">{{$t('m.withdraw')}}</div>
                <div class="van-hairline--right" @click="router('recharge')">{{$t('m.recharge')}}</div>
                <div @click="router('transfer')">{{$t('m.transfer')}}</div>
            </div>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" :title="$t('m.bonus')" :value="$t('m.seeMore')" is-link to="center/bonus"></van-cell>
            </van-cell-group>
            <p class="balance-num">888.00</p>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell :title="$t('m.personalInformation')" is-link to="center/userinfo"></van-cell>
                <van-cell :title="$t('m.shippingAddress')" is-link to="center/address"></van-cell>
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="$t('m.changePassword')" name="2">
                        <van-cell :title="$t('m.loginPassword')" is-link to="center/loginPassword"></van-cell>
                        <van-cell :title="$t('m.operationPassword')" is-link to="center/operationPassword"></van-cell>
                    </van-collapse-item>
                </van-collapse>
                <van-cell :title="$t('m.operationLog')" is-link class="van-hairline--top" to="center/operationLog"></van-cell>
                <!-- <van-cell title="推广链接" label="www.baidu.com">
                    <img slot="right-icon" src="./icon/copy.png" class="van-cell__right-icon" width="20" height="20">
                </van-cell> -->
                <div class="my-van-cell">
                    <div class="label">{{$t('m.sponsoredLinks')}}</div>
                    <div class="tips">www.baidu.com</div>
                    <div class="right-btn">{{$t('m.copy')}}</div>
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
            activeNames: ['1'],
            lanActive: 1,
            lang: 'zh-CN'
        }
    },
    mounted () {
        this.lang = this.$i18n.locale
        if (this.$i18n.locale === 'en-US') {
            this.lanActive = 0
        }
        if (localStorage.lang === 'en-US') {
            this.lanActive = 0
            this.lang = 'en-Us'
            this.switchLan(0)
        }
    },
    methods: {
        tobe: function (name, type) {
            this.$router.push({name, params: {type}})
            // location.href = name + '.html?type=' + type
        },
        router: function (name) {
            this.$router.push({name})
            // location.href = name + '.html'
        },
        goOrder: function (type) {
            this.$router.push({name: 'order', params: {type}})
            // location.href = 'order.html?type=' + type
        },
        switchLan (type) {
            this.lanActive = type
            if (this.lang === 'en-US') {
                this.lang = 'zh-CN'
                // UI框架组件国际化
                Locale.use('zh-CN', zhCN)
                // 存储语言设置
                localStorage.lang = 'zh-CN'
            } else {
                this.lang = 'en-US'
                // UI框架组件国际化
                Locale.use('en-US', enUS)
                // 存储语言设置
                localStorage.lang = 'en-US'
            }
            // i18n 国际化
            this.$i18n.locale = this.lang
        }
    }
}
</script>

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
    }
    .lan-swith > div.active {
        background-color: #D0021B;
        color: #fff;
    }
</style>