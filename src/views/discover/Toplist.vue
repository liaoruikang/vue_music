<template>
  <div class="toplist__container w clearfix">
    <div class="toplist__left">
      <!-- 歌单分类导航 -->
      <NavList></NavList>
    </div>
    <div class="toplist__right">
      <!-- 歌单详情页 -->
      <ListContent></ListContent>
      <!-- 评论 -->
      <Comment :count="1738"></Comment>
    </div>
  </div>
</template>
<script>
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
      ),
    Comment: () =>
      import(/* webpackChunkName: "comment"  */ '@/components/common/Comment')
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
    float: left;
  }
}
</style>
