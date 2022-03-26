<template>
  <div class="video__container">
    <router-link class="img" :to="isMv ? `/mv?id=${id}` : `/video?id=${id}`">
      <el-image :src="src + '?param=159y90'"></el-image>
      <span class="time">{{ time }}</span>
      <span class="count"><i></i>{{ count }}</span>
    </router-link>
    <div class="title">
      <i v-if="isMv"></i>
      <router-link
        :to="isMv ? `/mv?id=${id}` : `/video?id=${id}`"
        v-highlight="keywords"
      >
        {{ title }}
      </router-link>
    </div>
    <div class="singer">
      <span v-for="(item, index) in singer" :key="item.userId">
        <router-link
          :to="
            isMv
              ? `/artist?id=${item.userId}`
              : `/user/home?id=?id=${item.userId}`
          "
          v-highlight="keywords"
          >{{ item.userName }}</router-link
        >
        {{ index != singer.length - 1 ? '/' : '' }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['src', 'time', 'count', 'title', 'isMv', 'id', 'singer', 'keywords'],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.video__container {
  width: 159px;
  margin-bottom: 30px;
  a:hover {
    text-decoration: underline;
  }
  .img {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 90px;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .time,
    .count {
      position: absolute;
      padding-left: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      text-shadow: -2px 1px rgb(0 0 0 / 40%);
    }
    .time {
      bottom: 0;
      left: 0;
    }
    .count {
      top: 0;
      right: 0;
      padding-right: 5px;
      box-sizing: border-box;
      text-align: right;
      i {
        display: inline-block;
        margin: -2px 2px 0 0;
        width: 15px;
        height: 10px;
        background: url('../../assets/uploads/icon2.png') no-repeat -60px -310px;
      }
    }
  }
  .title {
    width: 100%;
    margin: 7px 0 1px;
    font-size: 14px;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    i {
      display: inline-block;
      margin: -2px 2px auto auto;
      width: 26px;
      height: 18px;
      background: url('../../assets/uploads/icon2.png') no-repeat -270px -478px;
      vertical-align: middle;
    }
  }
  .singer {
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 12px;
  }
}
</style>
