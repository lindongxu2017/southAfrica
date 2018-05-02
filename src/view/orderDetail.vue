<template>
    <div class="orderDetail-wrapper">
        <div class="container orderDetail">
            <div class="pay">
                <div class="address"  @click="goAddress">
                    <van-cell-group>
                        <van-cell title="联系人姓名" label="地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息地址信息" is-link />
                    </van-cell-group>
                </div>
            </div>
            <div class="order">
                <div class="order-info">
                    <div class="order-img"><img src="../assets/img/demo.jpg"></div>
                    <div class="order-desc">
                        <div>商品名称</div>
                        <div class="price-nums">
                            <div>￥ 168.00</div>
                            <div>x2</div>
                        </div>
                    </div>
                </div>
                <van-cell-group>
                    <van-cell title="下单时间" value="10:00:05 2017/4/26"></van-cell>
                    <van-cell title="订单编号" value="4546535789741"></van-cell>
                    <van-cell title="订单状态" value="待付款"></van-cell>
                </van-cell-group>
            </div>
            <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderDetail-wrapper',
    data () {
        return {
        }
    },
    methods: {
        goAddress () {
            this.$router.push({name: 'address'})
            // location.href = './address.html'
        },
        onSubmit: function () {
            this.$router.push({name: 'pay'})
        }
    }
}
</script>