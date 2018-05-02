<template>
    <div class="loginPassword-wrapper">
        <div class="container loginPassword">
            <van-cell-group>
                <van-field v-model="phone" label="手机号" required placeholder="请输入手机号码"></van-field>
                <van-field center v-model="code" required label="验证码" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''">
                    <div slot="button">获取</div>
                </van-field>
                <van-field v-model="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <div class="addressAdd">
                <div class="save-btn">
                    <van-button type="default" size="large">保存</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    methods: {
    }
}
</script>