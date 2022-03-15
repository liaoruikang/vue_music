<template>
  <div class="toplist__container w clearfix">
    <div class="toplist__left">
      <!-- 歌单分类导航 -->
      <NavList></NavList>
    </div>
    <div class="toplist__right" v-loading="!songsDetails.coverImgUrl">
      <div v-show="songsDetails.coverImgUrl">
        <!-- 歌单详情页 -->
        <ListContent></ListContent>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'toplist',
  data() {
    return {}
  },
  created() {},
  methods: {},
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
      songsDetails: 'songsDetails'
    })
  }
}
</script>
<style lang="less" scoped>
.toplist__container {
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url('../../assets/uploads/wrap3.png') repeat-y;
  .toplist__left {
    float: left;
    width: 240px;
    min-height: 1000px;
  }
  .toplist__right {
    min-width: 700px;
    min-height: 600px;
    float: left;
    /deep/ .el-loading-mask {
      z-index: 0;
    }
  }
}
</style>
