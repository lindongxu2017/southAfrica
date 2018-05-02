<template>
    <div class="pay-wrapper">
        <div class="container pay">
            <div class="address" @click="goAddress">
                <van-cell-group>
                    <van-cell title="联系人姓名" label="地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息" is-link />
                </van-cell-group>
            </div>
            <div class="order-cell van-hairline--bottom" @click="router">
                <div class="order-cell-img"><img src="../assets/img/sample7.jpg"></div>
                <div class="order-cell-info">
                    <p class="goods-name">商品名称商品名称商品名称</p>
                    <p class="goods-price">￥8000.00</p>
                    <p class="goods-tips">提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息提示信息</p>
                </div>
            </div>
            <van-cell-group class="goods-info">
                <van-cell title="商品价格" value="￥8000.00" :border="bool"></van-cell>
                <van-cell title="返回金额" value="￥80.00" :border="bool"></van-cell>
                <van-cell value="总价：￥7920元" :border="bool"></van-cell>
            </van-cell-group>
            <div class="pay-btn">
                <van-button type="primary" size="large" @click.native="onSubmit">支付</van-button>
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
    name: 'pay-wrapper',
    data () {
        return {
            bool: false,
            id: '',
            password: '',
            showKeyboard: true,
            passwordPopup: false
        }
    },
    methods: {
        router () {
            this.id = 2
            this.$router.push({name: 'goodsDetail', params: {id: this.id}})
            // location.href = './goodsDetail.html?id=' + this.id
        },
        goAddress () {
            this.$router.push({name: 'address'})
            // location.href = './address.html'
        },
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
                setTimeout(() => {
                    this.$router.push({name: 'order', params: {type: 2}})
                }, 1000)
            }
        }
    }
}
</script>