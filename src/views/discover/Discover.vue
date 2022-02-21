<template>
  <div class="discover__contianer">
    <!-- 轮播图 -->
    <Banner :bannerData="bannerList"></Banner>
    <!-- 主体区域 -->
    <div class="main w clearfix">
      <div class="main__left">
        <!-- 热门推荐 -->
        <Hot :hotList="hotPlaylist"></Hot>
        <!-- 个性化推荐 -->
        <Individuation v-if="isLogin"></Individuation>
        <!-- 新碟上架 -->
        <NewDisc></NewDisc>
      </div>
      <div class="main__right"></div>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/discover/Banner'
import Hot from '@/components/discover/Hot'
import Individuation from '@/components/discover/Individuation'
import NewDisc from '@/components/discover/NewDisc'

// 导入 discoverAPI
import { bannerListAPI, hotPlaylistAPI } from '@/api/discoverAPI'
import { mapState } from 'vuex'
export default {
  name: 'discover',
  data() {
    return {
      // 轮播图列表
      bannerList: [],
      // 热门歌单分类列表
      hotPlaylist: []
    }
  },
  created() {
    this.getBannerList()
    this.getHotPlayList()
  },
  methods: {
    // 获取轮播图列表
    async getBannerList() {
      const { data: result } = await bannerListAPI()
      this.bannerList = result.banners
    },
    async getHotPlayList() {
      const { data: result } = await hotPlaylistAPI()
      result.tags.some((item, index) => {
        if (index > 4) return true
        this.hotPlaylist.push(item)
      })
    }
  },
  components: {
    Banner,
    Hot,
    Individuation,
    NewDisc
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>
<style lang="less" scoped>
.discover__contianer {
  .main {
    background-color: #fff;
    border-style: solid;
    border-color: #d3d3d3;
    border-width: 0 1px;
    .main__left {
      float: left;
      width: 689px;
      height: 5000px;
      padding: 20px 20px 40px;
    }
    .main__right {
      float: right;
      width: 251px;
      height: 5000px;
      border: 1px solid #d3d3d3;
      border-width: 0 1px;
    }
  }
}
</style>
