<template>
  <div class="linux__container">
    <LoginHeader>版本选择</LoginHeader>
    <div class="linux__box">
      <a
        href="https://d1.music.126.net/dmusic/netease-cloud-music_1.2.0_amd64_deepin_stable_20190424.deb"
        >deepin15（64位）</a
      >
      <a
        href="https://d1.music.126.net/dmusic/netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb"
        >ubuntu18.04（64位）</a
      >
    </div>
  </div>
</template>
<script>
import LoginHeader from '@/components/login/LoginHeader'
import Bus from '@/plugin/eventBus'
export default {
  name: 'linux',
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', {
        display: val,
        component: null
      })
    })
  },
  components: { LoginHeader }
}
</script>
<style lang="less" scoped>
.linux__box {
  padding: 37px 100px;
  a {
    display: inline-block;
    width: 130px;
    padding-left: 20px;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-decoration: none;
    margin: 0 10px;
  }
}
</style>
