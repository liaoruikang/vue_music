<template>
  <div class="category__container">
    <!-- 优秀新电台 -->
    <NewDj :data="recommendDjList" v-show="recommendDjList.length"></NewDj>
    <!-- 排行榜 -->
    <Radio
      :id="parseInt($route.query.id)"
      title="电台排行榜"
      request="hot"
      isPage
      au
      v-show="recommendDjList.length"
    ></Radio>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'category',
  computed: {
    catName() {
      if (!this.$route.query.name) return null
      return this.$route.query.name
    },
    cateId() {
      if (!this.$route.query.id) return null
      return this.$route.query.id
    },
    ...mapState('djradio', {
      recommendDjList: 'recommendDjList'
    })
  },
  watch: {
    catName: {
      immediate: true,
      handler(val) {
        // 更改标题
        this.updateTitle(this.$route.meta, val, 3)
      }
    },
    cateId: {
      immediate: true,
      handler(val) {
        this.$store.commit('djradio/setRecommendDjList', [])
        if (val) {
          this.$store.dispatch('djradio/getRecommendDjList', val)
        }
      }
    }
  },
  components: {
    Radio: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/Radio'),
    NewDj: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/NewDj')
  }
}
</script>
