/* eslint-disable no-new */
var api = {
    admin: {
        register: '/mobile/api/reg_general.php',
        login: '/mobile/api/login_general.php'
    },
    user: {
        info: '/mobile/api/user.php'
    },
    home: {
        list: '/mobile/api/product.php',
        detail: '/mobile/api/product.php'
    },
    order: {
        list: '/mobile/api/orderlist.php',
        detail: '/mobile/api/orderlist.php'
    },
    center: {
        balancelist: '/mobile/api/finance.php',
        bouns: '/mobile/api/bonus.php',
        recharge: '/mobile/api/recharge.php',
        cash: '/mobile/api/txadd.php',
        transfer: '/mobile/api/transmoney.php'
    },
    shopping: {
        joincart: '/mobile/api/productview.php',
        cart: '/mobile/api/cart.php',

    }
}
export {api}