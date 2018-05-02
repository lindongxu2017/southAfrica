<template>
    <div class="register-wrapper">
        <div class="container register">
            <div class="tab-wrapper">
                <div class="switch-tab">
                    <div class="tab-item" :class="[active == 1 ? 'active' : '']" @click="active=1">注册</div>
                    <div class="tab-item" :class="[active == 2 ? 'active' : '']" @click="active=2">登录</div>
                </div>
                <div class="tab-content" v-show="active == 1">
                    <div class="field-wrapper">
                        <div class="register-field">
                            <van-cell-group>
                                <van-field v-model="register.phone" :class="[register.phone.length > 0 ? 'length' : '']" type="number" placeholder="请输入手机号" ></van-field>
                                <van-field v-model="register.code" :class="[register.code.length > 0 ? 'length' : '']" placeholder="请输入验证码" >
                                    <div slot="button">获取</div>
                                </van-field>
                            </van-cell-group>
                        </div>
                        <div class="register-btn">
                            <van-button size="large" @click="goSetPassword">下一步</van-button>
                        </div>
                    </div>
                </div>
                <div class="tab-content" v-show="active == 2">
                    <div class="field-wrapper">
                        <div class="register-field">
                            <van-cell-group>
                                <van-field v-model="login.phone" :class="[login.phone.length > 0 ? 'length' : '']" type="number" placeholder="请输入手机号" ></van-field>
                                <van-field v-model="login.password" :class="[login.password.length > 0 ? 'length' : '']" type="password" placeholder="请输入密码" ></van-field>
                                <p class="forgetPassword" @click="goForgetPassword">忘记密码？</p>
                            </van-cell-group>
                        </div>
                        <div class="register-btn">
                            <van-button size="large" @click="signUp">登录</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register-wrapper',
    data () {
        return {
            active: 1,
            register: {
                phone: '',
                code: ''
            },
            login: {
                phone: '',
                password: ''
            }
        }
    },
    methods: {
        goSetPassword () {
            this.$router.push({name: 'setPassword'})
            // location.href = 'setPassword.html'
        },
        signUp () {
            this.$router.replace({name: 'home'})
            // location.href = 'index.html'
        },
        goForgetPassword () {
            this.$router.push({name: 'forgetPassword_step1'})
            // location.href = 'forgetPassword_step1.html'
        }
    }
}
</script>