<template>
  <div class="rank__container w" v-loading.lock="!ranking">
    <div class="rank__box">
      <Ranking category :more="false"></Ranking>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'rank',
  components: {
    Ranking: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/Ranking')
  },
  computed: {
    ...mapState('djradio', {
      ranking: 'ranking'
    })
  }
}
</script>
<style lang="less" scoped>
.rank__container {
  min-height: 700px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .rank__box {
    padding: 40px;
  }
}
</style>
