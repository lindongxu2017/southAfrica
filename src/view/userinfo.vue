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
                <van-cell :title="$t('m.username')" :value="userinfo.username"></van-cell>
                <van-cell :title="$t('m.registerTime')" :value="userinfo.regtime"></van-cell>

                <van-cell :title="'PVP' + $t('m.referrer')" :value="userinfo.tjrname || $t('m.none')"></van-cell>
                <van-cell :title="'PVP' + $t('m.contactPerson')" :value="userinfo.prename || $t('m.none')"></van-cell>

                <van-cell :title="'VIP' + $t('m.referrer')" :value="userinfo.vip_tjrname || $t('m.none')"></van-cell>
                <van-cell :title="'VIP' + $t('m.contactPerson')" :value="userinfo.vip_prename || $t('m.none')"></van-cell>

                <van-cell :title="$t('m.mallReferrer')" :value="userinfo.shop_tjrname || $t('m.none')"></van-cell>

                <van-cell :title="$t('m.location')" :value="address"></van-cell>
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
        document.title = '个人信息'
    }
}
</script>