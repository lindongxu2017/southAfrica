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
                <van-cell title="会员编号" value="54676415454"></van-cell>
                <van-cell title="注册时间" value="2018/04/26"></van-cell>
                <van-cell title="推荐人" value="Steven"></van-cell>
                <van-cell title="接点人" value="Jack"></van-cell>
                <van-cell title="位置" value="深圳市"></van-cell>
                <van-cell title="报单中心" value="xxx中心"></van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bonus-wrapper',
    data () {
        return {
            list: ['', '', '']
        }
    },
    methods: {
    }
}
</script>