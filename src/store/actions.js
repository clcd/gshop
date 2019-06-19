import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_GOODS,
    RECEIVE_RATING,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
    reqAddress,
    reqFoodType,
    reqShops,
    reqUserInfo,
    reqLoginOut,
    reqShopGoods,
    reqShopRating,
    reqShopInfo,
    reqSearchShops} from '../api'

export default {
    //异步获取地址
    async getAddress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },
    async getFoodType({ commit }) {
        const result = await reqFoodType()
        if (result.code === 0) {
            const foodtype = result.data
            commit(RECEIVE_FOODTYPE, { foodtype })
        }
    },
    async getShops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops(latitude, longitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    //同步记录用户信息
    recordUser({ commit }, userinfo) {
        commit(RECEIVE_USERINFO, { userinfo })
    },
    //异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userinfo = result.data
            commit(RECEIVE_USERINFO, { userinfo })
        }
    },
    //异步登出
    async logout({ commit }) {
        const result = await reqLoginOut()
        if (result.code === 0) {
            commit(RESET_USERINFO)
        }

    },
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(RECEIVE_INFO, { info })
        }
    },
    // 异步获取商家评价列表
    async getShopRating({ commit }, callback) {
        const result = await reqShopRating()
        if (result.code === 0) {
            const rating = result.data
            commit(RECEIVE_RATING, { rating })
            callback && callback()
        }
    },
    // 异步获取商家商品列表
    async getShopGoods({ commit }, callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            callback && callback()
        }
    },
    //同步更新food中的count值
    updataFoodCount({commit}, {isAdd, food}) {
        if(isAdd) {
            commit(INCREMENT_FOOD_COUNT, {food})
        }else{
            commit(DECREMENT_FOOD_COUNT, {food})
        }
    },
    //同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },

    async searchShops({commit, state}, keyword) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShops(geohash, keyword)
        if (result.code === 0) {
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS, { searchShops })
        }
    },
}