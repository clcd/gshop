import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_RATING,
    RECEIVE_GOODS,
    RECEIVE_INFO
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS] (state, {address}) {
        state.address = address
    },
    [RECEIVE_FOODTYPE] (state, {foodtype}) {
        state.foodtype = foodtype
    },
    [RECEIVE_SHOPS] (state, {shops}) {
        state.shops = shops
    },
    [RECEIVE_USERINFO] (state, {userinfo}) {
        state.userinfo = userinfo
    },
    [RESET_USERINFO] (state) {
        state.userinfo = {}
    },
    [RECEIVE_RATING] (state, {rating}) {
        state.rating = rating
    },
    [RECEIVE_GOODS] (state, {goods}) {
        state.goods = goods
    },
    [RECEIVE_INFO] (state, {info}) {
        state.info = info
    },
}