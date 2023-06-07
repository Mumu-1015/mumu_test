<template>
    <footer>
        <ul>
        <router-link to="/films" custom v-slot="{navigate,isActive}">
          <li  @click="navigate" :class="isActive?'active':''">
            <i class="iconfont icon-video"></i>
            <span>电影</span>
          </li>
        </router-link>
        <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
          <li  @click="navigate" :class="isActive?'active':''">
            <i class="iconfont icon-logistic"></i>
            <span>影院</span>
            </li>
        </router-link>
        <router-link to="/mine" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive?'active':''">
            <i class="iconfont icon-account"></i>
            <span>我的</span>
            </li>
        </router-link>
        <router-link to="/order" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive?'active':''">
            <i class="iconfont icon-cart"></i>
            <span>订单</span>
            </li>
        </router-link>
    </ul>
    </footer>
</template>
<script>
import '../assets/iconfont/iconfont.css'
export default {
}
</script>
<style lang="scss" scoped>
footer{
  position: fixed;
  bottom: 0;
  background: white;
  z-index: 100;
  ul{
    display: flex;
    width: 37.5rem;
    li{
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-content: center;
      height: 4rem;
      line-height:2rem;
      color: gray;
      padding-top: 10px;
      border-top: .2px solid rgb(245, 245, 245);
      span{
        font-size: 12px;
      }
      i{
        font-size: 18px;
      }
    }
  }
}
.active{
  color: orange;
}
</style>
