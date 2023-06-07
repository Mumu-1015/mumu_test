<template>
    <div>
        <i class="iconfont icon-back" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
div{
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    font-size: 16px;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    i{
         position: absolute;
        left: .5rem;
    }
}
</style>
