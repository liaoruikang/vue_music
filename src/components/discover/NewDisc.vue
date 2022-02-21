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
        <el-carousel-item>
          <Disc
            v-for="item in oneNewDisc"
            :key="item.id"
            :picUrl="item.picUrl"
            :authorId="item.artist.id"
            :id="item.id"
            :name="item.name"
            :author="item.artist.name"
          ></Disc>
        </el-carousel-item>
        <el-carousel-item>
          <Disc
            v-for="item in twoNewDisc"
            :key="item.id"
            :picUrl="item.picUrl"
            :authorId="item.artist.id"
            :id="item.id"
            :name="item.name"
            :author="item.artist.name"
          ></Disc>
        </el-carousel-item>
        <el-carousel-item>
          <Disc
            v-for="item in oneNewDisc"
            :key="item.id"
            :picUrl="item.picUrl"
            :authorId="item.artist.id"
            :id="item.id"
            :name="item.name"
            :author="item.artist.name"
          ></Disc>
        </el-carousel-item>
        <el-carousel-item>
          <Disc
            v-for="item in twoNewDisc"
            :key="item.id"
            :picUrl="item.picUrl"
            :authorId="item.artist.id"
            :id="item.id"
            :name="item.name"
            :author="item.artist.name"
          ></Disc>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import FloorHeader from './FloorHeader'
import Disc from '@/components/common/Disc'
import { mapGetters } from 'vuex'

export default {
  name: 'newDisc',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getNewDiscList')
    console.log(this.oneNewDisc)
    console.log(this.twoNewDisc)
  },
  methods: {},
  components: { FloorHeader, Disc },
  computed: {
    ...mapGetters(['oneNewDisc', 'twoNewDisc'])
  }
}
</script>
<style lang="less" scoped>
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
  }
  /deep/ .el-carousel__arrow--right {
    right: -18px;
  }
  /deep/ .el-carousel__arrow--left {
    left: -22px;
  }
}
</style>
