<template>
    <div class="addressAddorEdit">
        <div class="container addressAdd">
            <van-cell-group class="addressInfo">
                <van-field v-model="addressInfo.name" label="收件人" icon="clear" placeholder="请输入收件人姓名" required @click-icon="username = ''"></van-field>
                <van-field v-model="addressInfo.phone" label="联系电话" icon="clear" placeholder="请输入收件人联系电话" required @click-icon="username = ''"></van-field>
                <van-field v-model="addressInfo.province" label="省份" icon="clear" placeholder="请输入省份名称" required @click-icon="username = ''"></van-field>
                <van-field v-model="addressInfo.city" label="城市" icon="clear" placeholder="请输入城市名称" required @click-icon="username = ''"></van-field>
                <van-field v-model="addressInfo.more" label="详细地址" icon="clear" placeholder="请输入详细地址" required @click-icon="username = ''"></van-field>
            </van-cell-group>
            <div class="save-btn">
                <van-button type="default" size="large">保存</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addressAddorEdit',
    data () {
        return {
            addressInfo: {
                name: '',
                phone: '',
                province: '',
                city: '',
                more: ''
            }
        }
    },
    methods: {
        address: function (type) {
            this.$router.push({name: 'addressAddorEdit', params: {type}})
        }
    }
}
</script>