<template>
  <div class="header_container">
    <!-- 登录对话框头部标题 -->
    <div class="dialog__header">
      <h3>
        <slot></slot>
      </h3>
      <i class="el-icon-close" @click="Visible"></i>
    </div>
  </div>
</template>
<script>
// 导入 eventBus
import Bus from '@/plugin/eventBus'
export default {
  name: 'LoginHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    Visible() {
      Bus.$emit('Visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
.dialog__header {
  display: flex;
  justify-content: space-between;
  background-color: #2d2d2d;
  height: 38px;
  padding: 0 18px 0 18px;
  color: #fff;
  i,
  h3 {
    display: flex;
    align-items: center;
  }
  i {
    color: #eee;
    cursor: pointer;
  }
}
</style>
