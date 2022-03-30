<template>
  <div class="aalbum__container" v-loading="!artistAlbum">
    <div class="aalbum__box" v-if="artistAlbum">
      <Disc
        v-for="item in artistAlbum.hotAlbums"
        :key="item.id"
        :picUrl="item.picUrl"
        :authorId="item.artist.id"
        :id="item.id"
        :name="item.name"
        :author="item.artist.name"
        @playClick="$store.dispatch('getAlbumDetails', item.id)"
      ></Disc>
    </div>
    <!-- 分页 -->
    <div class="aalbum__page" v-if="artistAlbum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="artistAlbum.artist.albumSize"
        :current-page="queryInfo.offset / queryInfo.limit + 1"
        :page-size="queryInfo.limit"
        @current-change="pageChange"
        next-text="下一页"
        prev-text="上一页"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Disc from '@/components/common/Disc'
export default {
  name: 'aalbum',
  data() {
    return {
      queryInfo: {
        limit: 12,
        offset: 0
      }
    }
  },
  created() {
    // 更新标题
    this.updateTitle(this.$route.meta, this.singerDetail.artist.name, 3)
    // 获取数据
    this.getArtistAlbum({ ...this.queryInfo, id: this.id })
  },
  computed: {
    ...mapState('artist', {
      singerDetail: 'singerDetail',
      artistAlbum: 'artistAlbum'
    }),
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    ...mapActions('artist', {
      getArtistAlbum: 'getArtistAlbum'
    }),
    pageChange(val) {
      this.queryInfo.offset = (val - 1) * this.queryInfo.limit
      this.getArtistAlbum({ ...this.queryInfo, id: this.id })
    }
  },
  components: {
    Disc
  }
}
</script>
<style lang="less" scoped>
.aalbum__container {
  width: 100%;
  min-height: 200px;
  .aalbum__box {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    width: calc(100% + 55px);
    .disc__container {
      margin-right: 55px;
    }
  }
  .aalbum__page {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
