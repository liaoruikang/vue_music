<template>
  <div class="banner__container">
    <el-carousel :interval="5000" arrow="always" indicator-position="none">
      <el-carousel-item v-for="item in bannerData" :key="item.encodeId">
        <div
          class="banner__box"
          :style="`background: url('${item.imageUrl}') no-repeat center`"
        >
          <div class="img__box w">
            <img :src="item.imageUrl" />
            <div class="download">
              <router-link to="/download"></router-link>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'banner',
  props: {
    bannerData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.banner__box {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 285px;
  background-size: 6000px !important;
  .img__box {
    position: relative;
    height: 100%;
    img {
      position: absolute;
      left: 0;
      z-index: 2;
      width: 730px;
      height: 100%;
    }
    .download {
      position: absolute;
      right: 0;
      width: 254px;
      height: 100%;
      background: url('../../assets/uploads/download.png') no-repeat;
      background-size: 100%;
      z-index: 2;
      a {
        display: block;
        width: 215px;
        height: 56px;
        margin-top: 185px;
        margin-left: 19px;
      }
      a:hover {
        background: url('../../assets/uploads/download.png') no-repeat -19px -185px;
        filter: brightness(90%);
      }
    }
    .download::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: -20px;
      width: 20px;
      height: 285px;
      background: url('../../assets/uploads/banner.png') no-repeat -1px 0;
    }
    .download::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: -20px;
      width: 20px;
      height: 285px;
      background: url('../../assets/uploads/banner.png') no-repeat -20px 0;
    }
  }
}
.banner__box::before {
  content: '';
  width: 120%;
  height: 120%;
  position: absolute;
  left: -25px;
  top: -25px;
  background: inherit;
  filter: blur(25px) brightness(80%);
}
/deep/ .el-carousel__arrow {
  font-size: 36px;
  width: 60px;
  height: 60px;
  margin-top: -10px;
  line-height: 60px;
}
/deep/ .el-carousel__arrow--right {
  right: 200px;
}
/deep/ .el-carousel__arrow--left {
  left: 200px;
}
</style>
