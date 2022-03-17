<template>
  <div class="toplist__container w clearfix" v-loading.lock="!isShow">
    <div class="toplist__left" v-show="isShow">
      <!-- 歌单分类导航 -->
      <NavList></NavList>
    </div>
    <div class="toplist__right">
      <!-- 歌单详情页 -->
      <ListContent></ListContent>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'toplist',
  components: {
    NavList: () =>
      import(/* webpackChunkName: "toplist" */ '@/components/toplist/Navlist'),
    ListContent: () =>
      import(
        /* webpackChunkName: "toplist"  */ '@/components/toplist/ListContent'
      )
  },
  computed: {
    ...mapState('toplist', {
      songsDetails: 'songsDetails',
      featureList: 'featureList',
      globalList: 'globalList'
    }),

    isShow() {
      if (this.featureList.length && this.globalList.length) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.toplist__container {
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url('../../assets/uploads/wrap3.png') repeat-y;
  min-height: 700px;
  .toplist__left {
    float: left;
    width: 240px;
  }
  .toplist__right {
    width: 740px;
    min-width: 700px;
    min-height: 600px;
    float: left;
    /deep/ .el-loading-mask {
      z-index: 0;
    }
  }
}
</style>
