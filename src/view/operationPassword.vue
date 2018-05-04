<template>
    <div class="operationPassword-wrapper">
        <div class="container operationPassword">
            <van-cell-group v-if="!isSet">
                <van-field v-model="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <van-cell-group v-if="isSet">
                <van-field v-model="oldpassword" label="旧密码" required placeholder="请输入旧密码"></van-field>
                <van-field v-model="password" label="新密码" required placeholder="请输入新密码"></van-field>
                <van-field v-model="repassword" label="确认新密码" required placeholder="请确认新密码"></van-field>
            </van-cell-group>
            <div class="addressAdd">
                <div class="save-btn">
                    <van-button type="default" size="large">保存</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'operationPassword-wrapper',
    data () {
        return {
            isSet: false,
            oldpassword: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
    }
}
</script>