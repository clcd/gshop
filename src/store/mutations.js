
import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPE,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_RATING,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue';

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
    [INCREMENT_FOOD_COUNT] (state, {food}) {
        if(!food.count) {
            //food.count = 1
            Vue.set(food, 'count', 1) //让新增的属性也有数据绑定
            //将food添加到cartfoods中
            state.cartfoods.push(food)
        }else{
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT] (state, {food}) {
        if(food.count){
            food.count--
            if(food.count === 0){
                //将food从cartfoods中移除
                state.cartfoods.splice(state.cartfoods.indexOf(food), 1)
            }
        }   
    },
    [CLEAR_CART] (state) {
        //清除food中的count
        state.cartfoods.forEach(food => food.count = 0)
        state.cartfoods = []
    },
    [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
        state.searchShops = searchShops
    },
}