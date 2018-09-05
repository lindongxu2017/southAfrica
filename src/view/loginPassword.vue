<template>
    <div class="loginPassword-wrapper">
        <div class="container loginPassword">
            <van-cell-group>
                <!-- <van-field v-model="phone" label="手机号" required placeholder="请输入手机号"></van-field>
                <van-field center v-model="code" required label="验证码" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''">
                    <div slot="button">获取</div>
                </van-field> -->
                <van-field v-model="password" type="password" :label="$t('m.newPassword')" required :placeholder="$t('m.inputTips_15')"></van-field>
                <van-field v-model="repassword" type="password" :label="$t('m.newPassword')" required :placeholder="$t('m.inputTips_16')"></van-field>
            </van-cell-group>
            <div class="addressAdd">
                <div class="save-btn">
                    <van-button type="default" size="large" @click="setPassword">{{$t('m.save')}}</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'loginPassword-wrapper',
    data () {
        return {
            phone: '',
            code: '',
            password: '',
            repassword: ''
        }
    },
    mounted () {
        // this.password = this.repassword = JSON.parse(localStorage.userinfo).pwd
        document.title = '设置密码'
    },
    methods: {
        setPassword () {
            var self = this
            if (this.password === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.inputTips_15') }).then(() => {})
                return false
            }
            if (this.repassword === '') {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.inputTips_17') }).then(() => {})
                return false
            }
            if (this.password !== this.repassword) {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.popupTips_8') }).then(() => {})
                return false
            }
            this.fn.ajax('post', {action: 'pwd', pwd: this.password, repwd: this.repassword}, this.api.user.loginPwd, res => {
                Dialog.alert({ title: self.$t('m.tip'), message: self.$t('m.popupTips_9') }).then(() => {
                    this.$router.back()
                })
            })
        }
    }
}
</script>