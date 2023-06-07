<template>
    <div>
        <film-swiper v-if="datalist.length" :loop="false">
            <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
                <img :src="data.imgUrl">
            </film-swiper-item>
        </film-swiper>
        <film-header class="stick"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
import axios from 'axios'
import FilmSwiper from '../components/films/FilmSwiper.vue'
import FilmSwiperItem from '../components/films/FilmSwiperItem.vue'
import FilmHeader from '../components/films/FilmHeader'

export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/banner.json').then(res => {
      this.datalist = res.data.banner
    })
  },
  components: {
    FilmSwiper,
    FilmSwiperItem,
    FilmHeader
  }
}

</script>
<style lang="scss" scoped>
.filmswiperitem{
    img{
        width: 100%;
    }
}
.stick{
  position: sticky;
  top: 0;
  background: white;
}
</style>
