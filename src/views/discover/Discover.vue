<template>
  <div class="discover__contianer" v-loading="!isShow">
    <div class="discover__box" v-if="isShow">
      <!-- 轮播图 -->
      <Banner :bannerData="bannerList"></Banner>
      <!-- 主体区域 -->
      <div class="main w clearfix" ref="mainRef">
        <div class="main__left">
          <!-- 热门推荐 -->
          <Hot :hotList="hotPlaylist"></Hot>
          <!-- 个性化推荐 -->
          <Individuation v-if="isLogin"></Individuation>
          <!-- 新碟上架 -->
          <NewDisc></NewDisc>
          <!-- 榜单 -->
          <List></List>
        </div>
        <div class="main__right">
          <!-- 用户信息区域 -->
          <Userinfo></Userinfo>
          <!-- 入驻歌手 -->
          <InSinger></InSinger>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    // 获取推荐歌单列表
    this.$store.dispatch('hot/getSongsList', 8)
    this.$store.dispatch('insinger/getHotSingerList', 10)
    this.$store.dispatch('list/getTopList')
    this.$store.dispatch('newdisc/getNewDiscList')
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
    Banner: () => import('@/components/discover/Banner'),
    Hot: () => import('@/components/discover/Hot'),
    Individuation: () => import('@/components/discover/Individuation'),
    NewDisc: () => import('@/components/discover/NewDisc'),
    List: () => import('@/components/discover/List'),
    Userinfo: () => import('@/components/discover/Userinfo'),
    InSinger: () => import('@/components/discover/InSinger')
  },
  watch: {
    isLogin: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$store.dispatch('individuation/getEverydaySongsList')
          this.$store.dispatch('user/getUserData', this.userId)
          this.$store.dispatch('user/getUserLevel')
        }
      }
    }
  },
  computed: {
    ...mapState('user', {
      userId: 'userId',
      isLogin: 'isLogin'
    }),
    ...mapState('hot', {
      reSongsList: 'reSongsList'
    }),
    ...mapState('list', {
      topThreeListdetail: 'topThreeListdetail'
    }),
    ...mapState('insinger', {
      hotSingerList: 'hotSingerList'
    }),
    ...mapState('newdisc', {
      newDiscList: 'newDiscList'
    }),
    isShow() {
      if (
        this.topThreeListdetail.length &&
        this.reSongsList &&
        this.newDiscList &&
        this.hotSingerList
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.discover__contianer {
  min-width: 982px;
  min-height: 700px;
  .main {
    position: relative;
    background-color: #fff;
    border-style: solid;
    border-color: #d3d3d3;
    border-width: 0 1px;
    .main__left {
      width: 689px;
      padding: 20px 20px 40px;
    }
    .main__right {
      position: absolute;
      top: 0;
      right: 0;
      width: 251px;
      height: 100%;
      border: 1px solid #d3d3d3;
      border-width: 0 0 0 1px;
    }
  }
}
</style>
