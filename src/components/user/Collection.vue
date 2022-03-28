<template>
  <div class="collection__container" v-if="list && list.length">
    <h3>{{ name }}收藏的歌单（{{ count }}）</h3>
    <div class="collection__box">
      <SongsList
        v-for="item in list"
        :key="item.id"
        :url="item.coverImgUrl"
        :audience="item.playCount"
        :id="item.id"
        :title="item.name"
        @playClick="$store.dispatch('getsongsDetails', item.id)"
      ></SongsList>
    </div>
  </div>
</template>
<script>
import SongsList from '@/components/common/SongsList'
export default {
  name: 'collection',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    count() {
      if (!this.list) return 0
      return this.list.length
    }
  },
  components: {
    SongsList
  }
}
</script>
<style lang="less" scoped>
.collection__container {
  margin-top: 30px;
  h3 {
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: normal;
  }
  .collection__box {
    width: calc(100% + 50px);
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    /deep/ .songsList__container {
      margin-right: 50px;
      height: 200px;
    }
  }
}
</style>
