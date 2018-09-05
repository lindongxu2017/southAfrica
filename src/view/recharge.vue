<template>
    <div class="recharge-wrapper">
        <div class="container cash recharge">
            <!-- <div class="field-control">
                <div><input type="number" v-model="value" placeholder="请输入金额"></div>
                <div>充值金额</div>
            </div> -->
            <van-field v-model="value" :label="$t('m.rechargeAmount')" icon="clear" :placeholder="$t('m.inputTips_11')" @click-icon="value = ''"></van-field>
            <div class="picker van-cell van-hairline--bottom" @change="change">
                <label>{{$t('m.payWay')}}</label>
                <select v-model="bankinfo.type">
                    <option v-for="(item, index, key) in paylist" :value="item.id" :key="key" v-html="item.name"></option>
                </select>
            </div>
            <div class="picker van-cell van-hairline--bottom" v-if="bankinfo.type == 1" @change="change">
                <label>{{$t('m.depositDate')}}</label>
                <div v-html="date" @click="show = true"></div>
            </div>
            <div class="picker van-cell van-hairline--bottom" v-if="bankinfo.type == 1" @change="change">
                <label>{{$t('m.bankName2')}}</label>
                <select v-model="bankinfo.bankId">
                    <option v-for="(item, index, key) in bacnklist" :value="item.id" :key="key" v-html="item.bank"></option>
                </select>
            </div>
            <van-field v-model="bankAccount" :label="$t('m.bankAccount')" icon="clear" :placeholder="$t('m.inputTips_12')" @click-icon="value = ''"></van-field>
            <van-field v-model="mask" :label="$t('m.remarks')" icon="clear" :placeholder="$t('m.inputTips_13')" @click-icon="value = ''"></van-field>
            <div class="cash-btn">
                <van-button type="default" size="large" @click="submit">{{$t('m.recharge')}}</van-button>
            </div>
            <van-popup v-model="show" position="bottom">
                <van-datetime-picker v-model="currentDate" @cancel="onCancel" @confirm="onConfirm" type="date"></van-datetime-picker>
            </van-popup>
        </div>
        <!-- 输入密码 -->
        <van-popup v-model="passwordPopup" position="right" class="password">
            <van-password-input :value="password" info="密码为 6 位数字" @click.native="showKeyboard = true"></van-password-input>
            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
        </van-popup>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'recharge-wrapper',
    data () {
        return {
            value: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false,
            bankinfo: {
                type: 0,
                bankId: 0
            },
            show: false,
            currentDate: new Date(),
            paylist: [],
            bacnklist: [],
            mask: '',
            bankAccount: ''
        }
    },
    mounted () {
        document.title = '充值'
        this.getPayType()
        this.getBankList()
    },
    computed: {
        date: function () {
            var curDate = this.currentDate
            return curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate()
        }
    },
    methods: {
        submit () {
            if (this.value === '') {
                Dialog.alert({ title: '提示', message: '请输入充值金额!' }).then(() => {})
                return false
            }
            if (this.bankAccount === '') {
                Dialog.alert({ title: '提示', message: '请输入银行账号！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {
                price: this.value,
                pay_type: this.bankinfo.type,
                bankid: this.bankinfo.bankId,
                hktime: this.date,
                memo: this.mask,
                bank_zhanghao: this.bankAccount
            }, this.api.center.recharge, res => {
                Dialog.alert({
                    title: '提示',
                    message: res.message
                }).then(() => {
                    this.$router.back()
                })
            })
            // this.passwordPopup = true
        },
        getPayType () {
            this.fn.ajax('post', {action: 'get_pay_type'}, this.api.center.recharge, res => {
                this.paylist = res.data
                this.paylist.map((item, index) => {
                    if (item.type === 1) {
                        this.bankinfo.type = item.id
                    }
                })
            })
        },
        getBankList () {
            this.fn.ajax('get', {action: 'banklist'}, this.api.tobe.pvp, res => {
                this.bacnklist = res.data
                if (this.bacnklist.length > 0) {
                    this.bankinfo.bankId = this.bacnklist[0].id
                }
            })
        },
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        },
        change () {},
        onCancel () {
            this.show = false
        },
        onConfirm (value) {
            this.show = false
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                // this.fn.ajax('post', {price: this.value, pay_password: this.password}, this.api.center.recharge, res => {
                this.fn.ajax('post', {
                    price: this.value,
                    pay_type: this.bankinfo.type,
                    bankid: this.bankinfo.bankId,
                    hktime: this.date,
                    memo: this.mask,
                    bank_zhanghao: this.bankAccount
                }, this.api.center.recharge, res => {
                    this.$toast.success('充值成功')
                    this.$router.back()
                })
            }
        }
    }
}
</script>

<style type="text/css">
    .recharge-wrapper .cash-btn span.van-button__text {
        color: #fff;
    }
</style>

<style type="text/css" scoped>
    .cash-btn .van-button {
        background-color: #D0021B;
        border: 1px solid #D0021B;
    }
    .picker {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
    }
    .picker label {
        max-width: 90px;
        flex: 1;
    }
    .picker select {
        flex: 1;
        width: 100%;
        appearance: none;
        border: 0;
        outline: none;
        font-size: 14px;
    }
</style>