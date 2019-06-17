import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_GOODS,
    RECEIVE_RATING,
    RECEIVE_INFO
} from './mutation-types'

import { reqAddress, reqFoodType, reqShops, reqUserInfo, reqLoginOut, reqShopGoods, reqShopRating, reqShopInfo } from '../api'

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
    async getShopRating({ commit }) {
        const result = await reqShopRating()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
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


}