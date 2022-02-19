<template>
  <div class="discover__contianer">
    <!-- 轮播图 -->
    <Banner :bannerData="bannerList"></Banner>
  </div>
</template>
<script>
import Banner from '@/components/discover/Banner'
// 导入 discoverAPI
import { bannerListAPI } from '@/api/discoverAPI'
export default {
  name: 'discover',
  data() {
    return {
      bannerList: []
    }
  },
  created() {
    this.getBannerList()
  },
  methods: {
    // 获取轮播图列表
    async getBannerList() {
      const { data: result } = await bannerListAPI()
      this.bannerList = result.banners
    }
  },
  components: {
    Banner
  }
}
</script>
<style lang="less" scoped></style>
