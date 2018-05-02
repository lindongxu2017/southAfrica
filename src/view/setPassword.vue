<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <p>输入登录密码</p>
            <van-cell-group>
                <van-field v-model="password" label="密码" icon="clear" placeholder="请输入密码" @click-icon="password = ''"></van-field>
                <van-field v-model="repassword" type="password" label="确认密码" icon="clear" placeholder="请确认密码" @click-icon="repassword = ''"></van-field>
            </van-cell-group>
            <div class="setPassword-btn">
                <van-button size="large" @click="login">登录</van-button>
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
        login: function () {
            this.$router.replace({name: 'home'})
            // location.href = 'index.html'
        }
    }
}
</script>