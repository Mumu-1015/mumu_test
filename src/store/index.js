import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // state 公共状态
  state: {
    cityId: '320100',
    cityName: '南京',
    cinemaData: [],
    isTabbarShow: true
  },
  mutations: {
    changeCityId (state, cityId) {
      state.cityId = cityId
      console.log('changeId', state.cityId)
    },
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCinemaData (state, list) {
      state.cinemaData = list
    },
    clearCinemaList (state) {
      state.cinemaData = []
    },
    tabbarShow (state) {
      state.isTabbarShow = true
    },
    tabbarHide (state) {
      state.isTabbarShow = false
    }
  },
  actions: {
    getCinemaData (store) {
      // 返回一个promis对象，可以使用.then()
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=5580`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('changeCinemaData', res.data.data.cinemas)
        console.log(res.data.data.cinemas)
      })
    }
  }
})
