<template>
    <div class="bonus-wrapper">
        <div class="container userinfo">
            <div class="center">
                <div class="header">
                    <div class="avatar"><img src="../assets/img/demo.jpg"></div>
                    <div class="name">
                        <div>班长大人</div>
                        <div><span>18866666666</span><span style="margin-left: 15px;">男</span></div>
                    </div>
                </div>
            </div>
            <van-cell-group>
                <van-cell title="用户名" :value="userinfo.username"></van-cell>
                <van-cell title="注册时间" :value="userinfo.regtime"></van-cell>
                <van-cell title="推荐人" :value="userinfo.tjrname || '无'"></van-cell>
                <van-cell title="接点人" :value="userinfo.prename || '无'"></van-cell>
                <van-cell title="位置" :value="address"></van-cell>
                <!-- <van-cell title="报单中心" value="xxx中心"></van-cell> -->
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bonus-wrapper',
    data () {
        return {
            userinfo: {},
            address: ''
        }
    },
    mounted () {
        this.userinfo = JSON.parse(localStorage.userinfo)
        this.address = this.userinfo.province_name + this.userinfo.city_name + this.userinfo.address
    }
}
</script>