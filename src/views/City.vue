<template>
  <div class="citybox">
    <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="data in citylist" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="changeCity(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http.js'
import obj from '@/util/mixinObj'
import { Toast } from 'vant'
Toast.setDefaultOptions({ duration: 500 })
export default {
  // 混入
  mixins: [obj],
  data () {
    return {
      citylist: []
    }
  },
  // 计算属性
  computed: {
    computedList () {
      const list = this.citylist.map(item => item.type)
      return list
    }
  },
  mounted () {
    http({
      url: '/gateway?k=6382723',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      this.citylist = res.data.data.cities
      this.citylist = this.renderCity(this.citylist)
      // console.log(this.citylist)
    })
  },
  methods: {
    handleChange (data) {
    //   console.log(data)
      Toast(data)
    },
    renderCity (list) {
      // A-Z字母数组
      var letterList = []
      var CityList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        var newlist = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // console.log(newlist)
        if (newlist.length > 0) {
          //   console.log(newlist.length)
          CityList.push({
            type: letter,
            list: newlist
          })
        }
        //
      })
      return CityList
    },
    changeCity (item) {
      console.log(item)
      this.$store.commit('changeCityId', item.cityId)
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('clearCinemaList')
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.van-toast--html, .van-toast--text{
    min-width: 30px;
}
</style>
