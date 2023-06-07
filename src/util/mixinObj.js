const obj = {
  mounted () {
    this.$store.commit('tabbarHide')
  },
  destroyed () {
    this.$store.commit('tabbarShow')
  }
}
export default obj
