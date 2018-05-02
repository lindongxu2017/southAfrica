<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <div class="step-wrapper"><img src="../assets/img/step.png"></div>
            <p>输入手机号验证</p>
            <van-cell-group>
                <van-field v-model="phone" label="手机号" type="number" icon="clear" placeholder="请输入手机号" @click-icon="phone = ''"></van-field>
                <van-field v-model="code" label="验证码" icon="clear" placeholder="请输入验证码" @click-icon="code = ''">
                    <div slot="button">获取</div>
                </van-field>
            </van-cell-group>
            <div class="setPassword-btn">
                <van-button size="large" @click="goNext">下一步</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'setPassword-wrapper',
    data () {
        return {
            phone: '',
            code: ''
        }
    },
    methods: {
        goNext: function () {
            this.$router.push({name: 'forgetPassword_step2'})
        }
    }
}
</script>