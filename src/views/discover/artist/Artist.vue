<template>
  <div class="artist__container w clearfix">
    <div class="artist__left">
      <!-- 导航栏 -->
      <ArtistNav></ArtistNav>
    </div>
    <div class="artist__right">
      <div class="artist__box">
        <!-- 热门歌手 -->
        <router-view></router-view>
        <!-- 其他 -->
        <ArtContent
          v-show="!$route.fullPath.includes('hotSinger')"
        ></ArtContent>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'artist',
  data() {
    return {}
  },
  components: {
    ArtistNav: () =>
      import(/* webpackChunkName: "artist"  */ '@/components/artist/ArtistNav'),
    ArtContent: () =>
      import(/* webpackChunkName: "artist"  */ '@/components/artist/ArtContent')
  },
  watch: {
    fullPath(val) {
      if (val === '/discover/artist' || val === '/discover/artist/') {
        this.$router.push('/discover/artist?type=1&area=7&name=华语男歌手')
      }

      if (
        (!this.$route.query.type ||
          !this.$route.query.area ||
          !this.$route.query.name) &&
        !val.includes('hotSinger')
      ) {
        this.$router.push('/discover/artist?type=1&area=7&name=华语男歌手')
      }
    }
  },
  computed: {
    fullPath() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="less" scoped>
.artist__container {
  min-height: 700px;
  background: url('../../../assets/uploads/wrap2.png') repeat-y;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .artist__left {
    float: left;
    width: 180px;
    padding: 51px 10px 40px;
  }
  .artist__box {
    margin-left: 181px;
    padding: 40px;
  }
}
</style>
