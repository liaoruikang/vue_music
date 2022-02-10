<template>
  <div class="header_container">
    <!-- 登录对话框头部标题 -->
    <div ref="headerRef" class="dialog__header" @mousedown="down">
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
  data() {
    return {
      isDown: false,
      headerX: 0,
      headerY: 0,
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0,
      boxWidth: 0,
      boxHeight: 0
    }
  },
  created() {
    document.onmousemove = this.move
    document.onmouseup = this.up
  },
  methods: {
    Visible() {
      Bus.$emit('Visible', false)
    },
    // 鼠标按下
    down(e) {
      this.isDown = true
      this.x = e.pageX
      this.y = e.pageY
      // 获取header的位置
      this.headerX = this.$refs.headerRef.getBoundingClientRect().left
      this.headerY = this.$refs.headerRef.getBoundingClientRect().top
      // 获取鼠标距离盒子的距离
      this.pageX = this.x - this.headerX
      this.pageY = this.y - this.headerY
    },
    // 鼠标移动
    move(e) {
      if (this.isDown) {
        const x = e.pageX - this.pageX
        const y = e.pageY - this.pageY
        Bus.$emit('headerPosition', { x, y })
      }
    },
    // 鼠标松开
    up() {
      this.isDown = false
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
  cursor: move;
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
