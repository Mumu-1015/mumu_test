<template>
  <div v-if="filmdata" class="bg">
    <detail-header v-scroll="30" class="header">{{
      filmdata.name
    }}</detail-header>
    <div
      class="pic"
      :style="{
        backgroundImage: 'url(' + filmdata.poster + ')',
      }"
    ></div>
    <div class="content top">
      <div>{{ filmdata.name }}</div>
      <div class="content-bottom">
        <div>{{ filmdata.category }}</div>
        <div>{{ filmdata.premiereAt | dateFilter }} 上映</div>
        <div>{{ filmdata.nation }} | {{ filmdata.runtime }} 分钟</div>
        <div class="detail-text" :class="isHidden ? 'hidden' : ''">
          {{ filmdata.synopsis }}
        </div>
        <div class="text-icon">
          <i
            @click="isHidden = !isHidden"
            class="iconfont"
            :class="isHidden ? 'icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>
    </div>
    <div class="content middle">
      <div style="font-size: 16px">演职人员</div>
      <div class="actors">
        <detail-swiper>
          <detail-swiper-item
            v-for="(data, index) in filmdata.actors"
            :key="index"
          >
            <div class="actorPic">
              <img :src="data.avatarAddress" />
            </div>
            <div class="name">{{ data.name }}</div>
            <div class="role">{{ data.role }}</div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
    <div class="content bottom">
      <div style="font-size: 16px">剧照</div>
      <detail-swiper name="photos" :preview="2.2">
        <detail-swiper-item
          v-for="(photo, index) in filmdata.photos"
          :key="index"
        >
          <div
            @click="handlePreview(index)"
            :style="{ backgroundImage: 'url(' + photo + ')' }"
            class="photo"
          ></div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
  </div>
</template>
<script>
import http from '@/util/http'
import obj from '@/util/mixinObj'
import Vue from 'vue'
import moment from 'moment'
import DetailSwiper from '../components/detail/DetailSwiper.vue'
import DetailSwiperItem from '../components/detail/DetailSwiperItem.vue'
import DetailHeader from '../components/detail/DetailHeader'
import { ImagePreview } from 'vant'
// 将时间戳过滤转化为xxxx-xx-xx的日期
Vue.filter('dateFilter', (date) => {
  // 格式转化
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  // inserted指令的回调函数
  inserted (el, binding) {
    // el是绑定的dom节点
    // binding传进来的参数，binding.value
    el.style.display = 'none'
    window.onscroll = () => {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁执行
  unbind () {
    // 组件销毁时，将监听取消
    window.onscroll = null
  }
})
export default {
  // 混入
  mixins: [obj],
  components: { DetailSwiper, DetailSwiperItem, DetailHeader },
  data () {
    return {
      filmdata: null,
      isHidden: true
    }
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmdata.photos,
        startPosition: index,
        closeable: true
      })
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=3884981`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      this.filmdata = res.data.data.film
      console.log(this.filmdata)
    })
  }
}
</script>
<style lang="scss" scoped>
.bg {
  background: rgb(240, 240, 240);
  padding-bottom: 4rem;
}
.pic {
  // background-image: url(filmdata.poster);
  height: 20rem;
  background-position: center;
  background-size: cover;
}
.content {
  background: white;
  padding: 1.5rem;
  font-size: 18px;
  .content-bottom {
    font-size: 13px;
    color: gray;
    div {
      margin-top: 4px;
    }
  }

  .text-icon {
    text-align: center;
  }
}
.hidden {
  overflow: hidden;
  height: 35px;
}
.middle {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0;
  .actors {
    text-align: center;
    font-size: 12px;
    .actorPic {
      height: 8rem;
      background-size: cover;
      padding: 0.5rem;
      overflow: hidden;
      img {
        width: 100%;
        padding-top: 0.8rem;
      }
    }
    .name {
      margin-top: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .role {
      color: gray;
    }
  }
}
.photo {
  height: 9rem;
  background-position: center;
  background-size: cover;
  margin-top: 0.8rem;
}

</style>
