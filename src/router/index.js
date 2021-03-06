import Vue from 'vue'
import VueRouter from 'vue-router'
// import MSite from '../pages/MSite/MSite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopHeader from '../pages/Shop/ShopHeader/ShopHeader.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/msite',
            component: MSite,
            meta: {
                showFoot: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFoot: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                showFoot: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                showFoot: true
            }
        },
        {
            path: '/',
            redirect: '/msite'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: ShopGoods
                },
                {
                    path: '/shop/rating',
                    component: ShopRatings
                },
                {
                    path: '/shop/info',
                    component: ShopInfo
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                },
            ]
        },
    ]
})