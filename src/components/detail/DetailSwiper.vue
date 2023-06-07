<template>
    <div class="swiper" :class="this.name">
                <div class="swiper-wrapper">
                    <slot></slot>
                </div>
                <div class="swiper-pagination"></div>
            </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default {
  props: {
    // 解决同页面多个轮播的冲突
    preview: {
      type: Number,
      default: 3.5
    },
    name: {
      type: String,
      default: 'pp'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.preview,
      spaceBetween: 20,
      freeMode: true
    })
  }

}
</script>
