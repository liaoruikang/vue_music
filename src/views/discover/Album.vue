<template>
  <div class="album__container w" v-loading.lock="!isShow">
    <div class="album__box" v-if="isShow">
      <!-- 热门新碟 -->
      <HotDisc></HotDisc>
      <!-- 专辑分类 -->
      <DiscList></DiscList>
      <!-- // 分页 -->
      <div class="playlist__page" v-if="total">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="parseInt($route.query.offset) || 1"
          :page-size="queryInfo.limit"
          @current-change="
            $router.push(`${$route.path}?area=${query.area}&offset=${$event}`)
          "
          next-text="下一页"
          prev-text="上一页"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'albun',
  data() {
    return {
      queryInfo: {
        limit: 35,
        offset: 0,
        area: 'ALL'
      }
    }
  },
  created() {
    // 获取热门新碟
    this.$store.dispatch('newdisc/getNewDiscList')
    // 获取全部新碟
    this.$store.dispatch('album/getDiscList', this.queryInfo)
  },
  components: {
    HotDisc: () =>
      import(/* webpackChunkName: "album"  */ '@/components/album/hotDisc'),
    DiscList: () =>
      import(/* webpackChunkName: "album"  */ '@/components/album/DiscList')
  },
  watch: {
    query: {
      deep: true,
      handler(val) {
        if (val.offset !== 0) val.offset = val.offset - 1
        this.queryInfo.offset = val.offset * this.queryInfo.limit
        this.queryInfo.area = val.area
        this.$store.commit('album/setDiscList', null)
        this.$store.dispatch('album/getDiscList', this.queryInfo)
      }
    }
  },
  computed: {
    ...mapState('newdisc', {
      newDiscList: 'newDiscList'
    }),
    ...mapState('album', {
      discList: 'discList'
    }),
    isShow() {
      if (this.newDiscList) {
        return true
      } else {
        return false
      }
    },
    query() {
      return {
        area: this.$route.query.area || 'ALL',
        offset: this.$route.query.offset || 0
      }
    },
    total() {
      if (this.discList) {
        return this.discList.total
      }
      return null
    }
  },
  beforeDestroy() {
    this.$store.commit('album/setDiscList', null)
    this.$store.commit('newdisc/setNewDiscList', null)
  }
}
</script>
<style lang="less" scoped>
.album__container {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .album__box {
    padding: 40px;
    .playlist__page {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
