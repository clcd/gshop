<template>
  <div class="cartcontrol">
    <transition name="move">
          <div class="iconfont icon-remove_circle_outline" v-show="food.count" @click.stop="updataFoodCount(false)"></div>

    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updataFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    updataFoodCount(isAdd) {
      this.$store.dispatch('updataFoodCount', {isAdd, food: this.food})
    }
  },
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixins.styl';
.cartcontrol
  display flex
  justify-content space-between
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(270deg)
  .cart-count
    vertical-align top
    width 15px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    padding 6px
    line-height 24px
    font-size 24px
    color $green

</style>
