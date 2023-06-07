<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <ul v-if="value">
        <li v-for="data in computedList" :key="data.cinemaId">
          <div class="left">
            <div>{{ data.name }}</div>
            <div class="address">{{ data.address }}</div>
          </div>
          <div class="right">￥{{ data.lowPrice / 100 }}起</div>
        </li>
      </ul>
  </div>
</template>
<script>
import obj from '@/util/mixinObj'
export default {
  // 混入
  mixins: [obj],
  data () {
    return {
      value: ''
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaData.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    onSearch () {},
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    this.$store.dispatch('getCinemaData')
  }
}
</script>
<style lang="scss" scoped>
li {
  border-bottom: 0.3px solid rgb(244, 244, 244);
  height: 7.55rem;
  box-sizing: border-box;
  padding: 15px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    .address {
      font-size: 12px;
      color: gray;
      width: 21.2rem;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
  .right {
    color: orange;
  }
}
form{
    position: sticky;
    top: 0;
}
</style>
