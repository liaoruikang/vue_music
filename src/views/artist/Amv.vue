<template>
  <div class="amv__container" v-loading="!artistMv">
    <div class="amv__box" v-if="artistMv">
      <ul>
        <li v-for="item in artistMv.mvs" :key="item.id">
          <div class="img">
            <el-image :src="item.imgurl"></el-image>
            <router-link :to="`/mv?id=${item.id}`"></router-link>
            <router-link :to="`/mv?id=${item.id}`"></router-link>
          </div>
          <p>
            <router-link :to="`/mv?id=${item.id}`">{{ item.name }}</router-link>
          </p>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <div class="amv__page" v-if="artistMv">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="singerDetail.artist.mvSize"
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
export default {
  name: 'amv',
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
    this.getArtistMv({ ...this.queryInfo, id: this.id })
  },
  computed: {
    ...mapState('artist', {
      singerDetail: 'singerDetail',
      artistMv: 'artistMv'
    }),
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    ...mapActions('artist', {
      getArtistMv: 'getArtistMv'
    }),
    pageChange(val) {
      this.queryInfo.offset = (val - 1) * this.queryInfo.limit
      console.log(this.queryInfo.offset)
      this.getArtistMv({ ...this.queryInfo, id: this.id })
    }
  }
}
</script>
<style lang="less" scoped>
.amv__container {
  margin-top: 20px;
  width: 100%;
  min-height: 200px;
  .amv__box {
    ul {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% + 30px);
      li {
        width: 137px;
        height: 140px;
        margin-right: 30px;
        .img {
          position: relative;
          width: 137px;
          height: 103px;
          .el-image {
            width: 100%;
            height: 100%;
          }
          a {
            position: absolute;
          }
          a:nth-child(2) {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../../assets/uploads/coverall.png') no-repeat 0 -1170px;
          }
          a:nth-child(3) {
            width: 44px;
            height: 44px;
            top: 50%;
            left: 50%;
            margin: -22px 0 0 -22px;
            background: url('../../assets/uploads/iconall.png') no-repeat -30px -135px;
          }
          a:nth-child(3):hover {
            background-position: -30px -85px;
          }
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .amv__page {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
