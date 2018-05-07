/* eslint-disable no-new */
import axios from 'axios'
import qs from 'qs'
var fn = {
    ajax (type, data, url, fn) {
        if (type === 'get') {
            axios(url, {
                methods: type,
                params: data
            }).then(response => {
                this.statusCode(response, fn)
            }).catch(res => {
                console.log('网络错误')
            })
        } else {
            axios({
                method: 'post',
                url,
                data: qs.stringify(data),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                this.statusCode(response, fn)
            }).catch(res => {
                console.log('网络错误')
            })
        }
    },
    // 服务器返回状态
    statusCode (response, fn) {
        switch (parseInt(response.data.code)) {
            case 200:
                fn(response.data)
                break
            default:
                console.log(response.data.message)
                break
        }
    },
    GetQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]); return ''
    }
}
export {fn}