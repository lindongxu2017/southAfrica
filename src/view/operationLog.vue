<template>
    <div class="operationLog-wrapper">
        <div class="container balanceLog operationLog">
            <div class="table-heaer van-hairline--bottom">
                <div>时间</div>
                <div>操作</div>
                <div>IP</div>
            </div>
            <div class="table-body">
                <div class="table-tr van-hairline--bottom" v-for="(item, index) in list" :key="index">
                    <div class="time">
                        <p>2018/4/26</p>&nbsp;
                        <p>13:00:00</p>
                    </div>
                    <div>修改密码</div>
                    <div>192.168.1.187</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'operationLog-wrapper',
    data () {
        return {
            list: ['', '', '', '']
        }
    },
    methods: {
    }
}
</script>