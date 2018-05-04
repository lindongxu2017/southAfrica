<template>
    <div class="pvp-wrapper">
        <div class="container pvp">
            <div class="notPvp" v-if="!isPvp">
                <p class="cell-label">填写上级名称购买身份</p>
                <van-cell-group>
                    <van-field v-model="value" placeholder="请输入名称" />
                </van-cell-group>
                <van-submit-bar :price="3050" button-text="支付" @submit="onSubmit"/>
            </div>
            <div class="isPvp" v-if="isPvp">
                <van-tabs v-model="active">
                    <van-tab title="已激活">
                        <div class="pvp-list">
                            <div class="pvp-list-item" v-for="(item, key) in activatedList" :key="key">
                                <div><img src="../assets/img/demo.jpg"></div>
                                <div><p>杰克斯派洛</p></div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="未激活">
                        <div class="pvp-list">
                            <div class="pvp-list-item" v-for="(item, key) in notActivatList" :key="key">
                                <div><img src="../assets/img/demo.jpg"></div>
                                <div><p>Steven</p></div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
            <!-- 输入密码 -->
            <van-popup v-model="passwordPopup" position="right" class="password">
                <van-password-input :value="password" info="密码为 6 位数字" @click.native="showKeyboard = true"></van-password-input>
                <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
            </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pvp-wrapper',
    data () {
        return {
            value: '',
            active: 0,
            isPvp: false,
            activatedList: ['', '', ''],
            notActivatList: ['', ''],
            type: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false
        }
    },
    created () {
        this.type = this.$route.params.type
    },
    methods: {
        onSubmit () {
            this.passwordPopup = true
        },
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        }
    },
    watch: {
        password: function () {
            if (this.password.length === 6) {
                console.log('开始验证密码' + this.password)
                this.$toast.success('支付成功')
                setTimeout(function () {
                    window.history.back()
                }, 1000)
            }
        }
    }
}
</script>