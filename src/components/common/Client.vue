<template>
  <div class="client __container">
    <LoginHeader>下载</LoginHeader>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
export default {
  name: 'client',
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
