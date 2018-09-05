<template>
    <div class="addressAddorEdit">
        <div class="container addressAdd">
            <van-cell-group class="addressInfo">
                <van-field v-model="addressInfo.name" :label="$t('m.addressee')" icon="clear" :placeholder="$t('m.inputTips_18')" @click-icon="username = ''"></van-field>
                <van-field v-model="addressInfo.phone" :label="$t('m.contactNumber')" icon="clear" :placeholder="$t('m.inputTips_19')" @click-icon="username = ''"></van-field>
                <!-- <van-field v-model="addressInfo.province" label="省份" icon="clear" placeholder="请输入省份名称" @click-icon="username = ''"></van-field> -->
                <!-- <van-field v-model="addressInfo.city" type="" label="城市" icon="clear" placeholder="请输入城市名称" @click-icon="username = ''"></van-field> -->
                <div class="picker van-cell van-hairline--bottom" @change="change">
                    <label>{{$t('m.province')}}</label>
                    <select v-model="addressInfo.province">
                        <option v-for="(item, index, key) in province" :value="item.provinceID" :key="key" v-html="item.province"></option>
                    </select>
                </div>
                <div class="picker van-cell van-hairline--bottom">
                    <label>{{$t('m.city')}}</label>
                    <select v-model="addressInfo.city">
                        <option v-for="(item, index, key) in city" :value="item.cityID" :key="key" v-html="item.city"></option>
                    </select>
                </div>
                <van-field v-model="addressInfo.more" :label="$t('m.detailedAddress')" icon="clear" :placeholder="$t('m.inputTips_20')" @click-icon="username = ''"></van-field>
            </van-cell-group>
            <div class="save-btn">
                <van-button type="default" size="large" @click="submit">{{$t('m.save')}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'addressAddorEdit',
    data () {
        return {
            addressInfo: {
                name: '',
                phone: '',
                province: '北京市',
                city: '市辖区',
                more: ''
            },
            province: [],
            city: []
        }
    },
    mounted () {
        this.getProvince()
        var userinfo = JSON.parse(localStorage.userinfo)
        this.addressInfo.name = userinfo.receiver
        this.addressInfo.phone = userinfo.mobile
        this.addressInfo.province = userinfo.province
        this.addressInfo.city = userinfo.city
        this.addressInfo.more = userinfo.address
        document.title = '收货地址'
    },
    methods: {
        getProvince () {
            this.fn.ajax('post', {action: 'province_list'}, this.api.user.info, res => {
                this.province = res.data
                this.addressInfo.province = this.province[0].provinceID
                this.getCity()
            })
        },
        getCity () {
            this.fn.ajax('post', {action: 'city_list', province_id: this.addressInfo.province}, this.api.user.info, res => {
                this.city = res.data
                this.addressInfo.city = res.data[0].cityID
            })
        },
        submit () {
            if (this.addressInfo.name === '') {
                Dialog.alert({ title: '提示', message: '收件人不能为空！' }).then(() => {})
                return false
            }
            if (this.addressInfo.phone === '') {
                Dialog.alert({ title: '提示', message: '联系电话不能为空！' }).then(() => {})
                return false
            }
            if (this.addressInfo.more === '') {
                Dialog.alert({ title: '提示', message: '详细地址不能为空！' }).then(() => {})
                return false
            }
            this.fn.ajax('post', {
                action: 'edit',
                mobile: this.addressInfo.phone,
                receiver: this.addressInfo.name,
                province: this.addressInfo.province,
                city: this.addressInfo.city,
                address: this.addressInfo.more
            }, this.api.user.info, res => {
                this.$router.back()
            })
        },
        change () {
            this.getCity()
        }
    }
}
</script>

<style type="text/css" scoped>
    .picker {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
    }
    .picker label {
        max-width: 90px;
        flex: 1;
    }
    .picker select {
        flex: 1;
        width: 100%;
        appearance: none;
        border: 0;
        outline: none;
        font-size: 14px;
    }
</style>