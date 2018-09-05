<template>
    <div class="activePvp">
        <img src="../assets/icon/noMore.png">
        <p>{{$t('m.textTips_6')}}：<span>￥50.00</span></p>
        <div class="addressAdd">
            <div class="save-btn">
                <van-button type="default" size="large" @click="passwordPopup = true">{{$t('m.activateMember')}}</van-button>
            </div>
        </div>
        <!-- 输入密码 -->
        <van-popup v-model="passwordPopup" position="right" class="password">
            <van-password-input :value="password" :info="$t('m.textTips_2')" @click.native="showKeyboard = true"></van-password-input>
            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
        </van-popup>
    </div>
</template>

<script type="text/javascript">
import { Dialog } from 'vant'
export default {
    name: 'activePvp',
    data () {
        return {
            password: '',
            showKeyboard: true,
            passwordPopup: false
        }
    },
    mounted () {
        var userinfo = JSON.parse(localStorage.userinfo)
        if (parseInt(userinfo.pvp_id) === 3) {
            this.$router.back()
        }
    },
    methods: {
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        },
        pay () {
            var self = this
            this.fn.ajax('POST', {action: 'pay', pwd1: this.password}, this.api.tobe.pvp, res => {
                if (res === 'error') {
                    this.password = ''
                    this.passwordPopup = false
                } else {
                    this.fn.getUserInfo()
                    Dialog.alert({
                        title: self.$t('m.tip'),
                        message: self.$t('m.popupTips_3')
                    }).then(() => {
                        this.passwordPopup = false
                        this.$router.push({name: 'pvp', params: {type: 1, id: 3}})
                    })
                }
            })
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                this.pay()
            }
        }
    }
}
</script>

<style type="text/css" scoped>
    .activePvp {
        text-align: center;
    }
    .activePvp img {
        margin-top: 25%;
        margin-bottom: 5%;
        width: 35%;
    }
    .activePvp p {
        font-size: 14px;
    }
</style>