<template>
  <div>
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
    <!-- 路由容器 -->
    <router-view></router-view>

  </div>
</template>
<script>
import tabbar from '@/components/Tabbar'

export default {
  data () {
    return {

    }
  },
  components: {
    tabbar
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
ul,li{
  list-style: none;
}
</style>
