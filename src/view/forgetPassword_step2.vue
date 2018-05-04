<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <div class="step-wrapper"><img src="../assets/img/step.png"></div>
            <p>输入新密码</p>
            <van-cell-group>
                <van-field v-model="password" label="新密码" icon="clear" placeholder="请输入新密码" @click-icon="password = ''"></van-field>
                <van-field v-model="repassword" label="确认新密码" icon="clear" placeholder="请确认新密码" @click-icon="repassword = ''"></van-field>
            </van-cell-group>
            <div class="setPassword-btn">
                <van-button size="large" @click="goNext">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'setPassword-wrapper',
    data () {
        return {
            password: '',
            repassword: ''
        }
    },
    methods: {
        goNext: function () {
            this.$router.push({name: 'forgetPassword_step3'})
        }
    }
}
</script>