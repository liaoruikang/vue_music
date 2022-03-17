<template>
  <div>
    <div class="loginBtn">
      <a
        href="javascript:;"
        :style="{ color, background }"
        @click="$emit('btnClick')"
      >
        <slot></slot>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginBtn',
  props: {
    // 文本颜色
    color: {
      type: String,
      default: '#333'
    },
    // 背景颜色
    background: {
      type: String,
      default: '#2E7ECB'
    }
  }
}
</script>
<style lang="less" scoped>
.loginBtn {
  a {
    display: inline-block;
    overflow: hidden;
    width: 224px;
    padding: 6px 0;
    margin-top: 10px;
    text-align: center;
    box-shadow: 0 0px 3px -1px #000;
    border-radius: 4px;
  }
}
</style>
