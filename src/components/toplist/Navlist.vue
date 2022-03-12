<template>
  <div class="navlist__container">
    <div class="navlist__feature">
      <h2>云音乐特色榜</h2>
      <ul>
        <li
          :class="['clearfix', songsId === item.id ? 'active' : '']"
          v-for="item in featureList"
          :key="item.id"
          @click="jump(item.id, item.updateFrequency)"
        >
          <div class="img">
            <img
              :src="item.coverImgUrl + '?param=40y40'"
              width="40"
              height="40"
            />
          </div>
          <div class="text">
            <h6>{{ item.name }}</h6>
            <p>{{ item.updateFrequency }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="navlist__global">
      <h2>全球媒体榜</h2>
      <ul>
        <li
          :class="['clearfix', songsId === item.id ? 'active' : '']"
          v-for="item in globalList"
          :key="item.id"
          @click="jump(item.id, item.updateFrequency)"
        >
          <div class="img">
            <img
              :src="item.coverImgUrl + '?param=40y40'"
              width="40"
              height="40"
            />
          </div>
          <div class="text">
            <h6>{{ item.name }}</h6>
            <p>{{ item.updateFrequency }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'navlist',
  data() {
    return {
      // 当前选中歌单id
      songsId: null
    }
  },
  created() {
    this.$store.dispatch('toplist/getToplist')
  },
  methods: {
    jump(id, frequency) {
      this.$router.push(`/discover/toplist?id=${id}&frequency=${frequency}`)
      this.songsId = id
      this.$store.dispatch('toplist/getSongsDetails', this.songsId)
    }
  },
  watch: {
    featureList(val) {
      if (val) {
        this.songsId = parseInt(this.$route.query.id) || val[0].id
        this.$store.dispatch('toplist/getSongsDetails', this.songsId)
      }
    }
  },
  computed: {
    ...mapState('toplist', {
      featureList: 'featureList',
      globalList: 'globalList'
    })
  }
}
</script>
<style lang="less" scoped>
.navlist__container {
  .navlist__feature {
    padding-top: 40px;
  }
  .navlist__global {
    padding-top: 20px;
  }
  .navlist__feature,
  .navlist__global {
    h2 {
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
    }
    ul {
      li {
        padding: 10px 0 10px 20px;
        cursor: pointer;
        .img {
          float: left;
          margin-right: 10px;
        }
        .text {
          float: left;
          h6 {
            margin-bottom: 8px;
          }
          p {
            color: #999;
          }
        }
      }
      li:hover {
        background-color: #f4f2f2;
      }
      .active {
        background-color: #e6e6e6 !important;
      }
    }
  }
}
</style>
