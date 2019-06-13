import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS
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

}