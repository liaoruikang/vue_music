<template>
  <div class="discList__container">
    <!-- 头部 -->
    <FloorHeader :isMore="false">
      <template> 全部新碟 </template>
      <template #list>
        <ul>
          <li v-for="(item, index) in cat" :key="index">
            <router-link :to="`${$route.path}?area=${item.area}`">
              {{ item.name }}</router-link
            >
          </li>
        </ul>
      </template>
    </FloorHeader>
    <!-- 专辑列表 -->
    <div class="discList__box" v-loading.lock="!isShow">
      <div class="disc" v-if="isShow">
        <LargeDisc
          v-for="item in discList.albums"
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'discList',
  data() {
    return {
      cat: [
        { name: '全部', area: 'ALL' },
        { name: '华语', area: 'ZH' },
        { name: '欧美', area: 'EA' },
        { name: '韩国', area: 'KR' },
        { name: '日本', area: 'JP' }
      ]
    }
  },
  components: {
    FloorHeader: () =>
      import(/* webpackChunkName: 'album' */ '@/components/album/FloorHeader'),
    LargeDisc: () =>
      import(/* webpackChunkName: 'album' */ '@/components/common/LargeDisc')
  },
  computed: {
    ...mapState('album', {
      discList: 'discList'
    }),
    isShow() {
      if (this.discList) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.discList__box {
  min-height: 500px;
  .disc {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
