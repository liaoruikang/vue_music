<template>
  <div class="floorHeader__container">
    <div class="hot__header">
      <h3>
        <slot></slot>
      </h3>
      <slot name="list"> </slot>
      <router-link v-if="isMore" :to="hash" class="more">更多</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'floorHeader',
  props: {
    hash: {
      type: String,
      default: '/'
    },
    isMore: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
.hot__header {
  height: 40px;
  border-bottom: 2px solid #c10d0c;
  padding: 0 10px 0 0;
  line-height: 40px;
  margin: 20px 0;
  h3 {
    float: left;
    font-size: 24px;
    font-weight: normal;
  }
  ul {
    float: left;
    margin-left: 10px;
    margin-top: 5px;
    li {
      float: left;
      a {
        padding: 0 12px;
        color: #666;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .more {
    float: right;
    background: url('../../assets/uploads/index.png') no-repeat;
    background-position: 28px -229px;
    padding-right: 20px;
  }
}
</style>
