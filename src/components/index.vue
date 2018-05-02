<template>
    <div class="root">
        <router-view></router-view>
        <router-view name="footerNav"></router-view>
    </div>
</template>

<script>
export default {
    name: 'root',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
