<template>
  <div class="songsList__container">
    <div class="pic__img">
      <router-link :to="`/playlist?id=${id}`">
        <el-image :src="url + '?param=140y140'" lazy></el-image>
      </router-link>

      <div class="img__item">
        <div class="audience">
          <span>{{ audience | number_ch }}</span>
        </div>
        <a href="javascript:;" class="play" @click="$emit('playClick')"></a>
      </div>
    </div>
    <div class="title">
      <router-link :to="`/playlist?id=${id}`"> {{ title }}</router-link>
      <p>{{ tips }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'songsList',
  props: {
    url: {
      type: String,
      default: ''
    },
    audience: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.songsList__container {
  display: inline-block;
  width: 140px;
  height: 234px;
  .pic__img {
    position: relative;
    display: inline-block;
    width: 140px;
    height: 140px;
    .el-image {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    .el-image::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('../../assets/uploads/coverall.png') no-repeat;
    }
    .img__item {
      position: absolute;
      bottom: -1px;
      left: 1px;
      height: 27px;
      width: 100%;
      background: url('../../assets/uploads/coverall.png') no-repeat;
      background-position: 0 -537px;
      line-height: 27px;
      .audience {
        position: relative;
        float: left;
        width: 50px;
        height: 100%;
        span {
          display: inline-block;
          width: 100%;
          margin-left: 30px;
          color: #ccc;
          line-height: 28px;
        }
      }
      .audience::before {
        content: '';
        position: absolute;
        width: 14px;
        height: 11px;
        background: url('../../assets/uploads/iconall.png') no-repeat;
        background-position: 0 -24px;
        top: 8px;
        left: 8px;
      }
      .play {
        float: right;
        width: 16px;
        height: 16px;
        background: url('../../assets/uploads/iconall.png') no-repeat;
        margin: 6px 8px 0 0;
      }
      .play:hover {
        background-position: 0 -60px;
      }
    }
  }
  .title {
    a {
      font-size: 14px;
      color: #000;
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
