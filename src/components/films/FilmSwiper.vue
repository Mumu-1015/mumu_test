<template>
    <div class="swiper pp">
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
  mounted () {
    new Swiper('.pp', {
      loop: this.loop, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }

}
</script>
