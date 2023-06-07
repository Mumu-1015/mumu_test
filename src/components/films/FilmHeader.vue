<template>
    <div>
        <router-link to="/films/nowplaying" custom v-slot="{navigate,isActive}">
          <li  @click="navigate" :class="isActive?'active':''">
            正在热映
          </li>
        </router-link>
        <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
          <li  @click="navigate" :class="isActive?'active':''">
            即将上映
          </li>
        </router-link>
    </div>
</template>
<style lang="scss" scoped>
.active{
    color: orange;
    border-bottom: 2px solid orange;
}
div{
  z-index: 100;
    display: flex;
    li{
        flex: 1;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
    }
    font-size: 16px;
}
</style>
