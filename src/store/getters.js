export default {
    totalCount(state) {
      return state.cartfoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state) {
      return state.cartfoods.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
    },
    positiveSize(state) {
      return state.rating.reduce((preTotal, rat) => preTotal+ (rat.rateType ===0?1:0), 0)
    }
}