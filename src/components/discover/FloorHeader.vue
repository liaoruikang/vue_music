<template>
  <div class="floorHeader__container">
    <div class="hot__header">
      <h3>
        <router-link :to="hash">
          <slot></slot>
        </router-link>
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
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.hot__header {
  height: 35px;
  border-bottom: 2px solid #c10d0c;
  background: url('../../assets/uploads/index.png') no-repeat;
  background-position: -225px -154px;
  padding: 0 10px 0 34px;
  line-height: 35px;
  margin: 20px 0;
  h3 {
    float: left;
    font-size: 18px;
    font-weight: normal;
    a {
      color: #333;
    }
  }
  ul {
    float: left;
    margin-left: 10px;
    li {
      float: left;
      a {
        padding: 0 12px;
        color: #666;
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
