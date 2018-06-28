import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import footerNav from '@/components/footerNav'

import register from '@/view/register'
import setPassword from '@/view/setPassword'
import forgetPasswordStep1 from '@/view/forgetPassword_step1'
import forgetPasswordStep2 from '@/view/forgetPassword_step2'
import forgetPasswordStep3 from '@/view/forgetPassword_step3'

import home from '@/view/home'
import classify from '@/view/classify'
import shoppingCart from '@/view/shoppingCart'
import center from '@/view/center'
import goodsDetail from '@/view/goodsDetail'
import pvp from '@/view/pvp'
import balanceLog from '@/view/balanceLog'
import cash from '@/view/cash'
import recharge from '@/view/recharge'
import transfer from '@/view/transfer'
import bonus from '@/view/bonus'
import userinfo from '@/view/userinfo'
import address from '@/view/address'
import addressAddorEdit from '@/view/addressAddorEdit'
import operationPassword from '@/view/operationPassword'
import loginPassword from '@/view/loginPassword'
import operationLog from '@/view/operationLog'
import order from '@/view/order'
import orderDetail from '@/view/orderDetail'
import pay from '@/view/pay'
import search from '@/view/search'
import activePvp from '@/view/activePvp'
import status from '@/view/status'

Vue.use(Router)

var router = new Router({
    routes: [
        {path: '/register', name: 'register', component: register},
        {path: '/setPassword', name: 'setPassword', component: setPassword},
        {path: '/forgetPassword_step1', name: 'forgetPassword_step1', component: forgetPasswordStep1},
        {path: '/forgetPassword_step2', name: 'forgetPassword_step2', component: forgetPasswordStep2},
        {path: '/forgetPassword_step3', name: 'forgetPassword_step3', component: forgetPasswordStep3},
        {
            path: '/',
            name: 'index',
            component: index,
            redirect: '/home',
            children: [
                { path: '/home', name: 'home', components: { default: home, footerNav } },
                { path: '/center', name: 'center', components: { default: center, footerNav } },
                { path: '/shoppingCart', name: 'shoppingCart', components: { default: shoppingCart, footerNav } },
                { path: '/classify', name: 'classify', components: { default: classify, footerNav } },
                {path: '/goodsDetail/:id/:type', name: 'goodsDetail', components: {default: goodsDetail}},
                {path: '/center/pvp/:type/:id', name: 'pvp', components: {default: pvp}},
                {path: '/center/activePvp', name: 'activePvp', components: {default: activePvp}},
                {path: '/center/status', name: 'status', components: {default: status}},
                {path: '/center/balanceLog/:type', name: 'balanceLog', components: {default: balanceLog}},
                {path: '/center/cash', name: 'cash', components: {default: cash}},
                {path: '/center/recharge', name: 'recharge', components: {default: recharge}},
                {path: '/center/transfer', name: 'transfer', components: {default: transfer}},
                {path: '/center/bonus', name: 'bonus', components: {default: bonus}},
                {path: '/center/userinfo', name: 'userinfo', components: {default: userinfo}},
                {path: '/center/address', name: 'address', components: {default: address}},
                {path: '/center/addressAddorEdit', name: 'addressAddorEdit', components: {default: addressAddorEdit}},
                {path: '/center/operationPassword', name: 'operationPassword', components: {default: operationPassword}},
                {path: '/center/loginPassword', name: 'loginPassword', components: {default: loginPassword}},
                {path: '/center/operationLog', name: 'operationLog', components: {default: operationLog}},
                {path: '/center/order/:type', name: 'order', components: {default: order}},
                {path: '/center/orderDetail/:id', name: 'orderDetail', components: {default: orderDetail}},
                {path: '/pay/:id/:type', name: 'pay', components: {default: pay}},
                {path: '/search', name: 'search', components: {default: search}}
            ]
        }
    ]
})

// var flag = false
// var routeID = [0]
// var num = 1

// router.beforeEach((to, from, next) => {
//     if (to.name === 'order' && from.name === 'pay' && parseInt(from.params.type) === 1) {
//         flag = true
//         localStorage.payed = 0
//     }
//     if (to.name === 'pay' && from.name === 'order' && parseInt(to.params.type) === 2) {
//         routeID[num] = parseInt(to.params.id)
//         num++
//         if (routeID[routeID.length - 1] === routeID[routeID.length - 2]) {
//             next({name: 'center'})
//         }
//         console.log(routeID)
//     }
//     if (to.name === 'pay' && flag && parseInt(to.params.type) === 1) {
//         flag = false
//         next({name: 'center'})
//     } else {
//         next()
//     }
// })

export default router
