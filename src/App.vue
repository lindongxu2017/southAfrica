<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            langTxt: 'zh_cn'
        }
    },
    computed: {
        lang: function () {
            return localStorage.lang || 'zh_cn'
        }
    },
    watch: {
        lang: function () {
            if (this.lang === 'en-US') {
                this.langTxt = 'zh_en'
            } else {
                this.langTxt = 'zh_cn'
            }
            this.setLang()
        }
    },
    mounted () {
        this.setLang()
    },
    methods: {
        setLang: function () {
            this.fn.ajax('POST', {lang: this.langTxt}, '/mobile/api/setting.php?action=language_switch', res => {
                console.log(res)
            })
        }
    }
}
</script>
