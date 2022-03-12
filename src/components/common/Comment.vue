<template>
  <div class="comment__container">
    <!-- 头部标题区域 -->
    <div class="comment__head">
      <h3>{{ title }}</h3>
      <span class="comment__count">共{{ count }}评论</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: {
    // 标题
    title: {
      type: String,
      default: '评论'
    },
    // 评论数量
    count: {
      type: Number,
      default: 0
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
.comment__container {
  padding: 0 30px 40px 40px;
  .comment__head {
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    line-height: 33px;
    h3 {
      float: left;
      font-size: 20px;
      font-weight: normal;
      color: #333;
    }
    .comment__count {
      float: left;
      margin-left: 15px;
      color: #666;
    }
  }
}
</style>
