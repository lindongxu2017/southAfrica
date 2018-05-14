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
                <div v-html="userinfo.nicheng || userinfo.username">班长大人</div>
                <div>
                    <van-button size="small" :class="[userinfo.pvp_id == 3 ? 'active' : '']" @click.native="tobe('pvp', 1, userinfo.pvp_id)">PVP</van-button>
                    <van-button size="small" :class="[userinfo.vip_id != 0 ? 'active' : '']" @click.native="tobe('pvp', 2, userinfo.vip_id)">VIP</van-button>
                    <van-button size="small" :class="[userinfo.shop_id != 0 ? 'active' : '']" @click.native="tobe('pvp', 3, userinfo.shop_id)" v-html="$t('m.shopowner')">店长</van-button>
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
                <van-cell class="gray" :title="$t('m.bonus')" :value="$t('m.seeMore')" is-link to="center/bonus"></van-cell>
            </van-cell-group>
            <p class="balance-num" v-html="userinfo.j_price">888.00</p>
            <div class="balance van-hairline--top">
                <div class="van-hairline--right" @click="cash" v-html="$t('m.withdraw')"></div>
                <div @click="router('transfer')">{{$t('m.transfer')}}</div>
            </div>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" :title="$t('m.balance')" :value="$t('m.flowRecords')" is-link to="center/balanceLog" ></van-cell>
            </van-cell-group>
            <div class="balance-num">
                <div v-html="userinfo.price">888.00</div>
                <div class="cash-bth" @click="router('recharge')" v-html="$t('m.recharge')"></div>
            </div>
        </div>
        <div class="section links">
            <van-cell-group>
                <van-cell :title="$t('m.personalInformation')" is-link to="center/userinfo"></van-cell>
                <van-cell :title="$t('m.shippingAddress')" is-link to="center/addressAddorEdit"></van-cell>
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="$t('m.changePassword')" name="2">
                        <van-cell :title="$t('m.loginPassword')" is-link to="center/loginPassword"></van-cell>
                        <van-cell :title="$t('m.operationPassword')" is-link to="center/operationPassword"></van-cell>
                    </van-collapse-item>
                </van-collapse>
                <!-- <van-cell :title="$t('m.operationLog')" is-link class="van-hairline--top" to="center/operationLog"></van-cell> -->
                <!-- <van-cell title="推广链接" label="www.baidu.com">
                    <img slot="right-icon" src="./icon/copy.png" class="van-cell__right-icon" width="20" height="20">
                </van-cell> -->
                <div class="my-van-cell" v-if="userinfo.tghttp">
                    <div class="label">{{$t('m.sponsoredLinks')}}</div>
                    <div class="tips" id="copyTarget" v-html="userinfo.tghttp">www.baidu.com</div>
                    <div class="right-btn" @click="copy">{{$t('m.copy')}}</div>
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
            lang: 'zh-CN'
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
    },
    methods: {
        cash () {
            this.$router.push({name: 'cash'})
        },
        tobe: function (name, type, id) {
            if (type === 1 && parseInt(id) === 2) {
                this.$router.push({name: 'activePvp'})
            } else {
                this.$router.push({name, params: {type, id}})
            }
        },
        router: function (name) {
            this.$router.push({name})
        },
        goOrder: function (type) {
            this.$router.push({name: 'order', params: {type}})
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
            var obj = document.getElementById('copyTarget')
            obj.textContent = this.userinfo.tghttp
            document.execCommand('copy')
            alert('复制成功')
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