<template>
  <div class="recommend__container" v-loading.lock="!hotSingerList">
    <div class="hotSinger__box" v-if="hotSingerList">
      <h2>热门歌手</h2>
      <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <li v-for="item in hotSingerList.artists" :key="item.id">
          <router-link :to="`/artist?id=${item.id}`">
            <el-image :src="item.picUrl + '?param=130y130'"></el-image>
          </router-link>
          <p>
            <router-link :to="`/artist?id=${item.id}`">
              {{ item.name }}
            </router-link>
            <router-link
              v-if="item.accountId"
              class="user__home"
              :to="`/user/home?id=${item.accountId}`"
            ></router-link>
          </p>
        </li>
      </ul>
      <p class="loading" v-show="loading">
        <i class="el-icon-loading"></i>加载中...
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'recommend',
  data() {
    return {
      offset: 0,
      disabled: false,
      loading: false
    }
  },
  methods: {
    load() {
      if (this.loading) return
      this.loading = true
      this.offset = this.hotSingerList.artists.length
      this.$store
        .dispatch('artist/getHotSingerList', {
          limit: 10,
          offset: this.offset
        })
        .then((res) => {
          if (!res.more) {
            this.disabled = true
            this.loading = true
          }
          this.loading = false
        })
    }
  },
  created() {
    this.$store.dispatch('artist/getHotSingerList', {
      limit: 50,
      offset: this.offset
    })
  },
  computed: {
    ...mapState('artist', {
      hotSingerList: 'hotSingerList'
    })
  },
  beforeDestroy() {
    this.$store.commit('artist/reomveHotSingerList', null)
  }
}
</script>
<style lang="less" scoped>
.recommend__container {
  min-height: 700px;
  h2 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    font-size: 24px;
    font-weight: normal;
  }
  ul {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 130px;
      margin-bottom: 25px;
      a:hover {
        text-decoration: underline;
      }
      .el-image {
        position: relative;
        width: 130px;
        height: 130px;
        border: 1px solid #ccc;
      }
      .el-image::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('../../../assets/uploads/coverall.png') no-repeat 0 -680px;
      }
      p {
        margin-top: 4px;
        .user__home {
          float: right;
          width: 17px;
          height: 18px;
          background: url('../../../assets/uploads/icon.png') no-repeat 0 -740px;
        }
      }
    }
  }
  .loading {
    text-align: center;
    i {
      margin-right: 5px;
      font-size: 24px;
      vertical-align: middle;
    }
  }
}
</style>
