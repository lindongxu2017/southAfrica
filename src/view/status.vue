<template>
    <div class="status">
        <div class="noMore">
            <img src="../assets/icon/noMore.png">
            <p v-if="status == 2">审核未通过</p>
            <p v-if="status == 3">正在审核中...</p>
        </div>
        <div v-if="status == 2" class="save-btn">
            <van-button type="default" size="large" @click="reApply">重新申请</van-button>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'status',
    data () {
        return {
            status: ''
        }
    },
    mounted () {
        // console.log(this.$route.params)
        this.status = this.$route.params.type
        if (this.status === 2) {
            document.title = '审核结果'
        }
        if (this.status === 3) {
            document.title = '审核状态'
        }
    },
    methods: {
        reApply () {
            this.$router.push({name: 'pvp', params: {type: 3, id: 4}})
        }
    }
}
</script>

<style type="text/css" scoped>
    .noMore {
        margin-top: 30%;
        text-align: center;
        display: block;
    }
    .noMore img {
        width: 40%;
        opacity: 0.5;
    }
    .noMore p {
        font-size: 14px;
        margin-top: 5%;
        color: #999;
    }
    .status .save-btn {
        margin: 15% 5% 0;
    }
</style>