<template>
  <div class="ranking__container" v-if="ranking">
    <h3>
      <span @click="$router.push('/discover/djradio/rank')">节目排行榜</span>
      <router-link v-if="more" to="/discover/djradio/rank">更多 ></router-link>
    </h3>
    <ul>
      <li v-for="(item, index) in ranking.toplist" :key="item.program.id">
        <div class="ranking">
          <span
            :style="{ color: index < 3 ? '#da4545' : '#999999' }"
            v-text="index < 10 ? '0' + (index + 1) : index + 1"
          ></span>
          <i
            :class="
              item.lastRank === -1
                ? 'new'
                : item.lastRank - item.rank > 0
                ? 'upper'
                : item.lastRank - item.rank == 0
                ? 'flat'
                : item.lastRank - item.rank < 0
                ? 'lower'
                : ''
            "
          >
            {{
              item.lastRank === -1 ? null : Math.abs(item.lastRank - item.rank)
            }}
          </i>
        </div>
        <a
          href="javascript:;"
          @click="$store.dispatch('getRadioDetails', item.program.id)"
        >
          <el-image :src="item.program.coverUrl + '?param=40x40'"></el-image
        ></a>
        <div class="text">
          <router-link :to="`/program?id=${item.program.id}`">
            <p>{{ item.program.name }}</p>
          </router-link>
          <router-link :to="`/djradio?id=${item.program.radio.id}`">
            <span>{{ item.program.radio.name }}</span>
          </router-link>
          <router-link
            v-if="category"
            :to="`/discover/djradio/category?id=${item.program.radio.categoryId}&name=${item.program.radio.category}`"
          >
            <i>{{ item.program.radio.category }}</i>
          </router-link>
          <el-progress
            :percentage="(item.score / maxScore) * 100"
            color="#C5C5C5"
            :show-text="false"
          ></el-progress>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ranking',
  props: {
    category: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: null
    },
    more: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.$store.dispatch('djradio/getRanking', this.pageSize)
  },
  computed: {
    ...mapState('djradio', {
      ranking: 'ranking'
    }),
    maxScore() {
      return this.ranking.toplist[0].score
    }
  },
  beforeDestroy() {
    this.$store.commit('djradio/setRanking', null)
  }
}
</script>
<style lang="less" scoped>
.ranking__container {
  h3 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    line-height: 40px;
    font-size: 24px;
    font-weight: normal;
    span {
      cursor: pointer;
    }
    span:hover,
    a:hover {
      text-decoration: underline;
    }
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  ul {
    border: 1px solid #e2e2e2;
    border-top: none;
    li {
      display: flex;
      height: 40px;
      padding: 10px 0;
      align-items: center;
      .ranking {
        width: 47px;
        height: 30px;
        font-size: 14px;
        text-align: center;
        span {
          display: block;
        }
        i {
          font-size: 12px;
        }
        i::before {
          background: url('../../assets/uploads/icon.png') no-repeat;
        }
        .flat::before,
        .lower::before,
        .upper::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          vertical-align: middle;
          margin-top: -1px;
          margin-right: 2px;
        }
        // 不变
        .flat {
          color: #999;
        }
        .flat::before {
          background-position: -74px -274px;
        }
        // 下降
        .lower {
          color: #4abbeb;
        }
        .lower::before {
          background-position: -74px -324px;
        }
        // 上升
        .upper {
          color: #ba2226;
        }
        .upper::before {
          background-position: -74px -304px;
        }
        // new
        .new {
          display: inline-block;
          width: 16px;
          height: 17px;
          background: url('../../assets/uploads/icon.png') no-repeat -67px -283px;
        }
      }
      > a {
        position: relative;
      }
      > a::before {
        content: '';
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;
        height: 22px;
        background: url('../../assets/uploads/iconall.png') no-repeat 0 -85px;
        z-index: 999;
      }
      > a:hover::before {
        display: block;
      }
      .text {
        display: flex;
        flex: 1;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        position: relative;
        margin-left: 10px;
        padding-right: 30px;
        a:hover {
          text-decoration: underline;
        }
        p,
        span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          line-height: 26px;
        }
        p {
          width: 240px;
        }
        span {
          width: 146px;
          color: #999;
        }
        i {
          height: 16px;
          overflow: hidden;
          padding: 0 6px;
          border: 1px solid #999;
          line-height: 16px;
          *line-height: 18px;
          color: #999;
          vertical-align: middle;
          font-size: 12px;
          margin-left: 60px;
        }
        /deep/ .el-progress {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 20px;
          width: 100px;
        }
      }
    }
    li:nth-child(even) {
      background: #f7f7f7;
    }
    li:hover {
      background: #eee;
    }
  }
}
</style>
