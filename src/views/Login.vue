<template>
    <div>
        Login
        <button @click='handleLogin'>登录</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的token字段')
        // 1.获取query字段
        // 2.跳转到想要跳转的页面
        this.$router.push(this.$route.query.redirect)
        // this.$router.push('/mine')
      }, 500)
    }
  }
}
</script>
