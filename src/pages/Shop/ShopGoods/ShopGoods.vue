<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{current: index===currentIndex}"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
            :class="{current: index===currentIndex}"
            @click="clickMenuItem(index)"
          >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(foods, index) in good.foods"
                :key="index"
              >
                <div class="icon">
                  <img width="57" height="57" :src="foods.image">
                </div>
                <div class="content">
                  <h2 class="name">{{foods.name}}</h2>
                  <p class="desc">{{foods.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{foods.sellCount}} 份</span>
                    <span>好评率 {{foods.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{foods.price}}</span>
                    <span class="old" v-if="foods.oldPrice">￥{{foods.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food = "foods"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
import CartControl from '../CartControl/CartControl.vue'
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动条距离顶部的距离
      tops: [],
      menuScrollY: 0,
      topm: []
    };
  },
  methods: {
    _initScroll() {
      this.foodsMenuScroll = new BScroll(".menu-wrapper", {
        probeType: 2,
        click: true
      });
      this.foodsMenuScroll.on("scroll", ({ x, y }) => {
        //console.log(x, y)
        this.menuScrollY = Math.abs(y);
        //console.log('----------'+this.menuScrollY)
        // console.log('ooooooooooooo'+this.foodsMenuIndex)
      });
      this.foodsMenuScroll.on("scrollEnd", ({ x, y }) => {
        //console.log('scrollEnd', x, y)

        this.menuScrollY = Math.abs(y);
      });

      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, // 因为惯性滑动不会触发
        click: true
      });

      // 给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        //console.log(x, y)
        this.scrollY = Math.abs(y);
        this.scrollMenuItem();
      });
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        //console.log('scrollEnd', x, y, document.body.clientHeight)
        
        this.scrollY = Math.abs(y);
        this.scrollMenuItem()
      });
    },
    _initTops() {
      const lis = this.$refs.foodsUl.children;
      const tops = [];
      const topm = [];
      let top = 0;
      let topc = 0;
      tops.push(top);
      topm.push(topc);
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        topc += 54;
        topm.push(topc);
        tops.push(top);
      });
      this.topm = topm;
      this.tops = tops;
      console.log(tops);
    },
    clickMenuItem(index) {
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
    scrollMenuItem() {
      const i = document.body.clientHeight
      const screenGoods = Math.floor(
        (i - 195 - 50) / 54
      );
      console.log(screenGoods);
      const don = this.currentIndex - this.foodsMenuIndex - screenGoods + 1;
      if (don > 0) { //foods下拉逻辑
        if (this.currentIndex >= 8) {//拉到底部判断
          //this.menuScrollY =
          this.foodsMenuScroll.scrollTo(
            0,
            i - this.topm[this.topm.length-1] -244,
            100
          );
          this.menuScrollY = -(i - this.topm[this.topm.length-1] -244)
        } else {
          console.log(this.menuScrollY);
          this.menuScrollY = this.topm[don] + this.menuScrollY;
          this.foodsMenuScroll.scrollTo(0, -this.menuScrollY, 200);
        }
      }

      if (this.currentIndex <= this.foodsMenuIndex) {//foods上拉逻辑
        if (this.currentIndex == 0) { //拉到顶部判断
          this.menuScrollY = 0;
          this.foodsMenuScroll.scrollTo(0, this.menuScrollY, 100);
        } else {
          this.foodsMenuScroll.scrollTo(
            0,
            -this.topm[this.currentIndex],
            200
          );
          this.menuScrollY = this.topm[this.currentIndex - 1];
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      //得到条件数据
      const { scrollY, tops } = this;
      //根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        //scrollY>=top && scrollY <下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return index;
    },
    foodsMenuIndex() {
      const { menuScrollY, topm } = this;
      const index = topm.findIndex((top, index) => {
        return menuScrollY >= top && menuScrollY < topm[index + 1];
      });
      return index;
    }
  },
  components: {
    CartControl
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
