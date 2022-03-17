<template>
  <div class="rank__container w" v-loading.lock="!recommend">
    <div class="rank__box">
      <Recommend :pageSize="50" :more="false"></Recommend>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'rank',
  components: {
    Recommend: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/Recommend')
  },
  computed: {
    ...mapState('djradio', {
      recommend: 'recommend'
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
