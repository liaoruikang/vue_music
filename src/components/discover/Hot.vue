<template>
  <div class="hot__container">
    <!-- 头部区域 -->
    <FloorHeader hash="/discover/playlist">
      <template> 热门推荐 </template>
      <template #list>
        <ul>
          <li v-for="(item, index) in hotList" :key="item.id">
            <router-link
              :style="{
                'border-right':
                  index === hotList.length - 1 ? '0' : '1px solid #ccc'
              }"
              :to="`/discover/playlist?cat=${item.name}`"
            >
              {{ item.name }}</router-link
            >
          </li>
        </ul>
      </template>
    </FloorHeader>
    <!-- 主体区域 -->
    <div class="hot__body">
      <!-- 电台列表 -->
      <SongList
        v-for="item in reSongList"
        :key="item.id"
        :url="item.picUrl"
        :audience="item.playCount"
        :id="item.id"
        :title="item.name"
      ></SongList>
    </div>
  </div>
</template>
<script>
import FloorHeader from '@/components/discover/FloorHeader'
import SongList from '@/components/discover/SongList'
import { mapState } from 'vuex'
export default {
  name: 'hot',
  props: {
    hotList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  created() {
    // 获取推荐歌单列表
    this.$store.dispatch('getSongList', 8)
  },
  methods: {},
  components: { FloorHeader, SongList },
  computed: {
    ...mapState(['reSongList'])
  }
}
</script>
<style lang="less" scoped>
.hot__body {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding-top: 20px;
  justify-content: space-between;
}
</style>
