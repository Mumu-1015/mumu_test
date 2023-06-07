<template>
  <div>
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmsId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        <div class="right">
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div :class="data.grade ? '' : 'hidden'">
              观众评分：<span>{{ data.grade }}</span>
            </div>
            <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) {
    return '暂无主演'
  }
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      pageNum: 1,
      total: -1
    }
  },
  methods: {
    handleChangePage (id) {
      //   this.$router.push(`/detail/${id}`)
      this.$router.push({
        name: 'myDetail',
        params: {
          id
        }
      })
    },
    onLoad () {
      // console.log('到底了')
      // console.log(this.total)
      // console.log(this.datalist)
      if (this.datalist.length === this.total) {
        this.finished = true
        return
      }
      this.pageNum++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=4790430`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        // console.log(res.data.data.films)
        this.loading = false
        this.total = res.data.data.total
      })
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=320100&pageNum=1&pageSize=10&type=1&k=4790430',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      this.datalist = res.data.data.films
      console.log(this.datalist)
    })
  }
}
</script>
<style lang="scss" scoped>
.van-list {
  padding-bottom: 5rem;
  .van-cell {
    padding: 0.75rem;
    overflow: hidden;
    img {
      float: left;
      width: 6.6rem;
      margin-right: 10px;
    }
    .title {
      font-size: 16px;
    }
    .content {
      font-size: 12px;
      color: gray;
      span {
        color: orange;
        font-size: 14px;
      }
      .actors {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 20rem;
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
}
</style>
