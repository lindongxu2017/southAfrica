<template>
    <div class="center">
        <div class="header">
            <div class="avatar"><img src="../assets/img/demo.jpg"></div>
            <div class="name">
                <div>班长大人</div>
                <div>
                    <van-button size="small" class="active" @click.native="tobe('pvp', 1)">PVP</van-button>
                    <van-button size="small" @click.native="tobe('pvp', 2)">VIP</van-button>
                    <van-button size="small" @click.native="tobe('pvp', 3)">店长</van-button>
                </div>
            </div>
        </div>
        <div class="section">
            <!-- <van-cell-group>
                <van-cell title="我的订单" ></van-cell>
            </van-cell-group> -->
            <div class="order-classify">
                <div><img src="../assets/icon/all.png" @click="goOrder(0)"><p>全部订单</p></div>
                <div><img src="../assets/icon/pending.png" @click="goOrder(1)"><p>待付款</p></div>
                <div><img src="../assets/icon/recevied.png" @click="goOrder(2)"><p>待收货</p></div>
                <div><img src="../assets/icon/finish.png" @click="goOrder(3)"><p>已完成</p></div>
            </div>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" title="余额" value="流水记录" is-link to="center/balanceLog" ></van-cell>
            </van-cell-group>
            <p class="balance-num">888.00</p>
            <div class="balance van-hairline--top">
                <div class="van-hairline--right" @click="router('cash')">提现</div>
                <div class="van-hairline--right" @click="router('recharge')">充值</div>
                <div @click="router('transfer')">转账</div>
            </div>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell class="gray" title="奖金" value="查看更多" is-link to="center/bonus"></van-cell>
            </van-cell-group>
            <p class="balance-num">888.00</p>
        </div>
        <div class="section">
            <van-cell-group>
                <van-cell title="我的信息" is-link to="center/userinfo"></van-cell>
                <van-cell title="收货地址" is-link to="center/address"></van-cell>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="密码修改" name="2">
                        <van-cell title="登录密码" is-link to="center/loginPassword"></van-cell>
                        <van-cell title="操作密码" is-link to="center/operationPassword"></van-cell>
                    </van-collapse-item>
                </van-collapse>
                <van-cell title="操作日志" is-link class="van-hairline--top" to="center/operationLog"></van-cell>
                <!-- <van-cell title="推广链接" label="www.baidu.com">
                    <img slot="right-icon" src="./icon/copy.png" class="van-cell__right-icon" width="20" height="20">
                </van-cell> -->
                <div class="my-van-cell">
                    <div class="label">推广链接</div>
                    <div class="tips">www.baidu.com</div>
                    <div class="right-btn">复制</div>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'center',
    data () {
        return {
            activeNames: ['1']
        }
    },
    methods: {
        tobe: function (name, type) {
            this.$router.push({name, params: {type}})
            // location.href = name + '.html?type=' + type
        },
        router: function (name) {
            this.$router.push({name})
            // location.href = name + '.html'
        },
        goOrder: function (type) {
            this.$router.push({name: 'order', params: {type}})
            // location.href = 'order.html?type=' + type
        }
    }
}
</script>