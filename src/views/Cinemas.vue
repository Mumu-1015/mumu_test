<template>
  <div>
    <van-nav-bar title="影院" ref="navbar" @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        {{$store.state.cityName}}<van-icon name="arrow-down" color="black" size="10" />
      </template>
      <template #right>
        <van-icon name="search" size="25" color="black" />
      </template>
    </van-nav-bar>

    <div
      class="box"
      :style="{
        height: height,
      }"
    >
      <ul>
        <li v-for="data in $store.state.cinemaData" :key="data.cinemaId">
          <div class="left">
            <div>{{ data.name }}</div>
            <div class="address">{{ data.address }}</div>
          </div>
          <div class="right">￥{{ data.lowPrice / 100 }}起</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import http from '@/util/http.js'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemaslist: [],
      height: '0px'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('/cinemas/search')
    }
  },
  mounted () {
    // 计算高度
    this.height =
      document.documentElement.clientHeight -
      document.querySelector('footer').clientHeight -
      this.$refs.navbar.$el.offsetHeight +
      'px'

    if (this.$store.state.cinemaData.length === 0) {
      this.$store.dispatch('getCinemaData').then(res => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true // 滚动条
          }
        })
      })
    } else {
      new BetterScroll('.box', {
        scrollbar: {
          fade: true // 滚动条
        }
      })
    }
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=5580`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then((res) => {
    //   this.cinemaslist = res.data.data.cinemas
    //   this.$nextTick(() => {
    // new BetterScroll('.box', {
    //   scrollbar: {
    //     fade: true // 滚动条
    //   }
    // })
    // })
    //   //   console.log(this.cinemaslist)
    // })
  }
}
</script>
<style lang="scss" scoped>
.box {
  overflow: hidden;
  position: relative;
}
li {
  border-bottom: 0.3px solid rgb(244, 244, 244);
  height: 7.55rem;
  box-sizing: border-box;
  padding: 15px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    .address {
      font-size: 12px;
      color: gray;
      width: 21.2rem;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
  .right {
    color: orange;
  }
}
</style>
