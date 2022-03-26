<template>
  <div class="mySinger__container">
    <h2>我的歌手（{{ mySinger.count }}）</h2>
    <div class="mySinger__list" v-for="item in mySinger.data" :key="item.id">
      <router-link :to="`artist?id=${item.id}`">
        <el-image :src="item.picUrl + '?param=80y80'" lazy> </el-image>
      </router-link>
      <div class="text">
        <h4>
          <router-link :to="`artist?id=${item.id}`">{{
            item.name
          }}</router-link>
        </h4>
        <p>
          {{ item.albumSize ? item.albumSize + '个专辑&nbsp;&nbsp;' : '' }}
          {{ item.mvSize ? item.mvSize + '个MV' : '' }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'mySinger',
  computed: {
    ...mapState('my', {
      mySinger: 'mySinger'
    })
  }
}
</script>
<style lang="less" scoped>
.mySinger__container {
  padding: 40px;
  h2 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    font-size: 24px;
    font-weight: normal;
    line-height: 40px;
  }
  .mySinger__list {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    .el-image {
      width: 80px;
      height: 80px;
    }
    .text {
      flex: 1;
      padding-left: 15px;
      a:hover {
        text-decoration: underline;
      }
      h4 {
        margin: 10px 0;
        font-size: 16px;
      }
      p {
        color: #666;
      }
    }
  }
}
</style>
