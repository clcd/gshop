import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS
} from './mutation-types'

import {reqAddress, reqFoodType, reqShops} from '../api'

export default {
    //异步获取地址
    async getAddress ({commit, state}) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if(result.code ===0){
            const address = result.data 
            commit(RECEIVE_ADDRESS, {address})
        }
    },
    async getFoodType ({commit}) {
        const result = await reqFoodType()
        if(result.code ===0){
            const foodtype = result.data 
            commit(RECEIVE_FOODTYPE, {foodtype})
        }
    },
    async getShops ({commit, state}) {
        const {latitude, longitude} = state
        const result = await reqShops(latitude, longitude)
        if(result.code ===0){
            const shops = result.data 
            commit(RECEIVE_SHOPS, {shops})
        }
    },
}