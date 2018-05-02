<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <div class="step-wrapper"><img src="../assets/img/step.png"></div>
            <img class="success-img" src="../assets/img/success.png">
            <p class="tips">已成功设置新密码</p>
            <div class="setPassword-btn">
                <van-button size="large" @click="goNext">登录</van-button>
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
            this.$router.push({name: 'home'})
        }
    }
}
</script>