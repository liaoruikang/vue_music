<template>
  <div class="newDj__container">
    <h2>优秀新电台</h2>
    <div class="newDj__main">
      <ul class="clearfix">
        <li v-for="item in data" :key="item.id">
          <router-link :to="`/djradio?id=${item.id}`">
            <el-image :src="item.picUrl + '?param=150y150'"></el-image>
          </router-link>
          <router-link :to="`/djradio?id=${item.id}`">
            <span> {{ item.name }} </span>
          </router-link>
          <p>{{ item.rcmdtext }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newDj',
  props: {
    data: {
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>
.newDj__container {
  h2 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    line-height: 40px;
    font-size: 24px;
    font-weight: normal;
  }
  .newDj__main {
    ul {
      display: flex;
      justify-content: flex-start;
      margin-top: 20px;
      li {
        width: 150px;
        margin: 0 15px;
        a {
          display: inline-block;
          margin-bottom: 3px;
        }
        a:hover {
          text-decoration: underline;
        }
        .el-image {
          width: 150px;
          height: 150px;
        }
        span {
          margin-top: 20px;
          font-size: 14px;
        }
        p {
          color: #999;
        }
      }
    }
  }
}
</style>
