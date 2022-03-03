<template>
  <div class="newDisc__container">
    <!-- 头部区域 -->
    <FloorHeader hash="/discover/album">新碟上架</FloorHeader>
    <!-- 主体区域 -->
    <div class="newDisc__body">
      <!-- 轮播图区域 -->
      <el-carousel
        indicator-position="none"
        :loop="true"
        :autoplay="false"
        height="186px"
        arrow="always"
      >
        <el-carousel-item v-for="(val, index) in newDisc" :key="index">
          <Disc
            v-for="item in val"
            :key="item.id"
            :picUrl="item.picUrl"
            :authorId="item.artist.id"
            :id="item.id"
            :name="item.name"
            :author="item.artist.name"
            @playClick="$store.dispatch('getAlbumDetails', item.id)"
          ></Disc>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'newDisc',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getNewDiscList')
  },
  methods: {},
  components: {
    FloorHeader: () => import('./FloorHeader.vue'),
    Disc: () => import('@/components/common/Disc')
  },
  computed: {
    ...mapGetters(['oneNewDisc', 'twoNewDisc']),
    newDisc() {
      return [this.oneNewDisc, this.twoNewDisc]
    }
  }
}
</script>
<style lang="less" scoped>
.newDisc__container {
  margin-bottom: 30px;
}
.newDisc__body {
  height: 186px;
  border: 1px solid #d3d3d3;
  .el-carousel {
    overflow: hidden;
    padding: 0 20px;
    background: #f5f5f5;
  }
  .el-carousel__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }
  /deep/ .el-carousel__arrow {
    background-color: transparent !important;
    color: #333;
    font-size: 20px;
    z-index: 3;
  }
  /deep/ .el-carousel__arrow--right {
    right: -18px;
  }
  /deep/ .el-carousel__arrow--left {
    left: -22px;
  }
}
</style>
