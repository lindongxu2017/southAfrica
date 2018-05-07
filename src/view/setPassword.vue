<template>
    <div class="setPassword-wrapper">
        <div class="container setPassword">
            <p>输入登录密码</p>
            <van-cell-group>
                <van-field v-model="password" type="password" label="密码" icon="clear" placeholder="请输入密码" @click-icon="password = ''"></van-field>
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
            username: '',
            phone: '',
            password: '',
            repassword: ''
        }
    },
    mounted () {
        this.username = localStorage.username
        this.phone = localStorage.userPhone
    },
    methods: {
        login: function () {
            // if (this.password === '') {
            //     alert('请输入密码')
            //     return false
            // }
            // if (this.repassword === '') {
            //     alert('请确认密码')
            //     return false
            // }
            this.fn.ajax('post', {
                username: this.username,
                password: this.password,
                cpassword: this.repassword,
                mobile: this.phone
            }, this.api.admin.register, res => {
                this.fn.ajax('post', {username: this.username, password: this.password}, this.api.admin.login, result => {
                    this.fn.ajax('post', {username: this.username, password: this.password}, this.api.user.info, response => {
                        localStorage.removeItem('username')
                        localStorage.removeItem('userPhone')
                        localStorage.userinfo = JSON.stringify(response.data)
                        this.$router.push({name: 'home'})
                    })
                })
            })
            // location.href = 'index.html'
        }
    }
}
</script>