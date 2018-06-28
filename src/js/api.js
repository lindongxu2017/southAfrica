/* eslint-disable no-new */
var api = {
    admin: {
        register: '/mobile/api/reg_general.php',
        login: '/mobile/api/login_general.php'
    },
    user: {
        info: '/mobile/api/user.php',
        loginPwd: '/mobile/api/pwdedit.php',
        opareatPwd: '/mobile/api/pwdedit.php'
    },
    home: {
        list: '/mobile/api/product.php',
        detail: '/mobile/api/product.php',
        carousel: '/mobile/api/carousel.php'
    },
    order: {
        list: '/mobile/api/orderlist.php',
        create: '/mobile/api/cart.php'
    },
    center: {
        balancelist: '/mobile/api/finance.php',
        bouns: '/mobile/api/bonus.php',
        recharge: '/mobile/api/recharge.php',
        cash: '/mobile/api/txadd.php',
        cashRatio: '/mobile/api/txadd.php',
        transfer: '/mobile/api/transmoney.php',
        userModify: '/mobile/api/user.php'
    },
    shopping: {
        joincart: '/mobile/api/productview.php',
        cart: '/mobile/api/cart.php',
        class: '/mobile/api/product.php',
        ratio: '/mobile/api/cart.php'
    },
    tobe: {
        pvp: '/mobile/api/pvpbuy.php',
        vip: '/mobile/api/vipbuy.php',
        store: '/mobile/api/shopbuy.php',
        ranklist: '/mobile/api/ranklist.php',
        memberlist: '/mobile/api/mysubed.php',
        levelup: '/mobile/api/shopbuy.php',
        agent: '/mobile/api/cart.php'
    },
    notice: {
        item: '/mobile/api/notice.php'
    }
}
export {api}