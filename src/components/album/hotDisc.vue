<template>
  <div class="hotDisc__container">
    <h2>热门新碟</h2>
    <!-- 专辑 -->
    <div class="hotDisc__box">
      <LargeDisc
        v-for="item in newDisc"
        :key="item.id"
        :picUrl="item.picUrl"
        :authorId="item.artist.id"
        :id="item.id"
        :name="item.name"
        :author="item.artist.name"
        @playClick="$store.dispatch('getAlbumDetails', item.id)"
        lazy
      ></LargeDisc>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'hotDisc',
  computed: {
    ...mapGetters('newdisc', {
      oneNewDisc: 'oneNewDisc',
      twoNewDisc: 'twoNewDisc'
    }),
    newDisc() {
      return [...this.oneNewDisc, ...this.twoNewDisc]
    }
  },
  components: {
    LargeDisc: () =>
      import(/* webpackChunkName: 'album' */ '@/components/common/LargeDisc')
  }
}
</script>
<style lang="less" scoped>
.hotDisc__container {
  h2 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    font-size: 24px;
    font-weight: normal;
  }
  .hotDisc__box {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
