<template>
  <div class="collection__container">
    <LoginHeader>添加到歌单</LoginHeader>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
export default {
  name: 'collection',
  data() {
    return {}
  },
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', val)
    })
  },
  methods: {},
  components: {
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      )
  }
}
</script>
<style lang="less" scoped></style>
