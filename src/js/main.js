/* eslint-disable no-new */
import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'
var fn = {
    ajax (type, data, url, fn) {
        if (type === 'get') {
            axios(url, {
                methods: type,
                params: data
            }).then(response => {
                this.statusCode(response, fn)
            }).catch(res => {
                console.log(res)
                alert('网络错误')
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
                console.log(res)
                alert('网络错误')
            })
        }
    },
    // 服务器返回状态
    statusCode (response, fn) {
        switch (parseInt(response.data.code)) {
            case 200:
                fn(response.data)
                break
            // 未登录
            case 99999:
                Dialog.alert({
                    title: '提示',
                    message: '登录信息过期，请重新登录。'
                }).then(() => {
                    localStorage.removeItem('userinfo')
                    window.vm.$router.push({name: 'register'})
                })
                break
            case 99984:
                Dialog.alert({
                    title: '提示',
                    message: '暂未设置收货地址,是否前往设置？'
                }).then(() => {
                    window.vm.$router.push({name: 'addressAddorEdit'})
                }).catch(() => {
                    // todo
                })
                break
            case 99985:
                this.serverError(response.data.message, fn)
                break
            // 购买身份
            case 99986:
                this.serverError(response.data.message, fn)
                break
            // 余额不足
            case 99987:
                this.serverError(response.data.message, fn)
                break
            case 99988:
                this.serverError(response.data.message, fn)
                break
            default:
                Dialog.alert({
                    title: '提示',
                    message: response.data.message
                }).then(() => {
                    // todo
                })
                break
        }
    },
    serverError (message, fn) {
        Dialog.alert({ title: '提示', message }).then(() => { fn('error') })
    },
    getUserInfo () {
        fn.ajax('get', {}, window.api.user.info, response => {
            localStorage.userinfo = JSON.stringify(response.data)
        })
    },
    GetQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]); return ''
    }
}
export {fn}