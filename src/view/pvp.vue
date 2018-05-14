<template>
    <div class="pvp-wrapper">
        <div class="container pvp">
            <div class="notPvp" v-if="!isPvp">
                <!-- <p class="cell-label">填写上级名称购买身份</p> -->
                <van-cell-group>
                    <van-field v-model="form.vip_tjrname" label="推荐人" placeholder=""></van-field>
                    <van-field v-if="type == 1 || type == 2" v-model="form.vip_prename" label="接点人" placeholder=""></van-field>

                    <div v-if="type == 1" class="picker van-cell van-hairline--bottom">
                        <label>性别</label>
                        <select v-model="pvp.sex">
                            <option value="男" v-html="'男'"></option>
                            <option value="女" v-html="'女'"></option>
                        </select>
                    </div>
                    <van-field v-if="type == 1" v-model="pvp.mobile" label="手机号" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.postcode" label="邮政编码" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.email" label="邮箱" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.qq" label="QQ" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.idcard" label="身份证号" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.bank" label="开户银行名称" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.zhanghao" label="银行账号" placeholder=""></van-field>
                    <van-field v-if="type == 1" v-model="pvp.huzhu" label="户主" placeholder=""></van-field>

                    <div class="picker van-cell van-hairline--bottom">
                        <label>购买等级</label>
                        <select v-model="form.rank" @change="getRankPrice">
                            <option v-for="(item, index, key) in rankList" :value="item.id" :key="key" v-html="item.rank_name"></option>
                        </select>
                    </div>
                </van-cell-group>
                <van-submit-bar v-if="type != 1" :price="form.rankPrice" button-text="支付" @submit="onSubmit"/>
                <div class="addressAdd" v-if="type == 1">
                    <div class="save-btn">
                        <van-button type="default" size="large" @click="save">注册会员</van-button>
                    </div>
                </div>
            </div>
            <div class="isPvp" v-if="isPvp">
                <van-tabs v-model="active">
                    <van-tab title="已激活">
                        <div class="pvp-list" v-if="active == 0">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="pvp-list-item" v-for="(item, key) in memberlist[0]" :key="key">
                                    <div><img src="../assets/img/demo.jpg"></div>
                                    <div><p v-html="item.username">杰克斯派洛</p></div>
                                </div>
                            </van-list>
                            <div class="noMore" v-if="total[0] == 0">
                                <img src="../assets/icon/noMore.png">
                                <p>暂无数据...</p>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="未激活" v-if="type == 1">
                        <div class="pvp-list" v-if="active == 1">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="pvp-list-item" v-for="(item, key) in memberlist[1]" :key="key">
                                    <div><img src="../assets/img/demo.jpg"></div>
                                    <div><p v-html="item.username">Steven</p></div>
                                </div>
                            </van-list>
                            <div class="noMore" v-if="total[1] == 0">
                                <img src="../assets/icon/noMore.png">
                                <p>暂无数据...</p>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
            <!-- 输入密码 -->
            <van-popup v-model="passwordPopup" position="right" class="password">
                <van-password-input :value="password" info="密码为 6 位数字" @click.native="showKeyboard = true"></van-password-input>
                <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    name: 'pvp-wrapper',
    data () {
        return {
            // vip、store会员表单
            form: {
                vip_tjrname: '',
                vip_prename: '',
                rank: '',
                rankPrice: 0
            },
            // pvp会员表单
            pvp: {
                mobile: '',
                sex: '男',
                postcode: '',
                email: '',
                qq: '',
                idcard: '',
                bank: '',
                zhanghao: '',
                huzhu: ''
            },
            // 会员类型
            type: '',
            // 是否会员
            isPvp: false,
            // 会员等级列表
            rankList: [],
            // 下级列表
            active: 0,
            memberlist: [[], []],
            // 密码操作
            password: '',
            showKeyboard: true,
            passwordPopup: false,
            // 下拉加载
            loading: false,
            finished: false,
            total: [1, 1],
            page: [1, 1]
        }
    },
    mounted () {
        this.type = parseInt(this.$route.params.type)
        var routeID = parseInt(this.$route.params.id)
        if (routeID !== 0 && (this.type === 2 || this.type === 3)) {
            this.isPvp = true
        }
        if (this.type === 1 && routeID === 3) {
            this.isPvp = true
        }
        this.getRankList()
    },
    methods: {
        onLoad: function () {
            var index = this.active
            this.fn.ajax('get', {cate: this.type, type: index, pageno: this.page[index]}, this.api.tobe.memberlist, res => {
                this.total[index] = res.data.total
                this.loading = false
                if (this.memberlist[index].length >= this.total[index]) {
                    this.finished = true
                } else {
                    this.page[index]++
                    this.memberlist[index] = this.memberlist[index].concat(res.data.list)
                }
            })
        },
        onSubmit () {
            this.passwordPopup = true
        },
        onInput (key) {
            this.password = (this.password + key).slice(0, 6)
        },
        onDelete () {
            this.password = this.password.slice(0, this.password.length - 1)
        },
        save () {
            var data = this.pvp
            data.tjrname = this.form.vip_tjrname
            data.prename = this.form.vip_prename
            data.rank = this.form.rank
            data.action = 'reg'
            this.fn.ajax('post', data, this.api.tobe.pvp, res => {
                this.fn.getUserInfo()
                this.$router.replace({name: 'activePvp'})
            })
        },
        getRankList () {
            var rankType = ''
            switch (this.type) {
                case 1:
                    rankType = 'pvplist'
                    break
                case 2:
                    rankType = 'viplist'
                    break
                case 3:
                    rankType = 'shoplist'
                    break
            }
            this.fn.ajax('get', {action: rankType}, this.api.tobe.ranklist, res => {
                this.rankList = res.data
                this.form.rank = this.rankList[0].id
                if (this.type === 1) return
                this.getRankPrice()
            })
        },
        getRankPrice () {
            var action = ''
            switch (this.type) {
                case 2:
                    action = 'vip_rank_money'
                    break
                case 3:
                    action = 'shop_rank_money'
                    break
            }
            this.fn.ajax('get', {action, id: this.form.rank}, this.api.tobe.ranklist, res => {
                this.form.rankPrice = res.data.price * 100
            })
        }
    },
    watch: {
        active: function () {
            this.loading = false
            this.finished = false
        },
        password: function () {
            var data = {}
            var api = ''
            switch (this.type) {
                case 2:
                    data = {
                        vip_tjrname: this.form.vip_tjrname,
                        vip_prename: this.form.vip_tjrname,
                        vip_rank: this.form.rank,
                        pwd1: this.password
                    }
                    api = this.api.tobe.vip
                    break
                case 3:
                    data = {
                        shop_tjrname: this.form.vip_tjrname,
                        shop_rank: this.form.rank,
                        pwd1: this.password
                    }
                    api = this.api.tobe.store
                    break
            }
            if (this.password.length === 6) {
                this.fn.ajax('POST', data, api, res => {
                    if (res === 'error') {
                        this.password = ''
                        this.passwordPopup = false
                    } else {
                        Dialog.alert({
                            title: '提示',
                            message: '支付成功！'
                        }).then(() => {
                            this.isPvp = true
                            this.passwordPopup = false
                            this.fn.getUserInfo()
                        })
                    }
                })
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.passwordPopup) {
            this.passwordPopup = false
            this.password = ''
            next(false)
        } else {
            next()
        }
    }
}
</script>

<style type="text/css">
    .pvp-wrapper input.van-field__control {
        padding-left: 10px;
    }
    .pvp-wrapper .van-hairline--top-bottom::after {
        border-top: 0;
    }
    .pvp-wrapper .addressAdd .save-btn {
        position: static;
        padding: 10% 25px;
    }
</style>

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
        padding-left: 10px;
    }
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
</style>