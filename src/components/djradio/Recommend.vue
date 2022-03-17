<template>
  <div class="recommend__container" v-if="recommend">
    <h3>
      <span @click="$router.push('/discover/djradio/recommend')">推荐节目</span>
      <router-link v-if="more" to="/discover/djradio/recommend"
        >更多 ></router-link
      >
    </h3>
    <ul>
      <li v-for="item in recommend.programs" :key="item.id">
        <a
          href="javascript:;"
          @click="$store.dispatch('getRadioDetails', item.id)"
        >
          <el-image :src="item.coverUrl + '?param=40x40'"></el-image
        ></a>
        <div class="text">
          <router-link :to="`/program?id=${item.id}`">
            <p>{{ item.name }}</p>
          </router-link>
          <router-link :to="`/djradio?id=${item.radio.id}`">
            <span>{{ item.radio.name }}</span>
          </router-link>
          <router-link
            :to="`/discover/djradio/category?id=${item.radio.categoryId}&name=${item.radio.category}`"
          >
            <i>{{ item.radio.category }}</i>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'recommend',
  props: {
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
    this.$store.dispatch('djradio/getRecommend', this.pageSize)
  },
  beforeDestroy() {
    this.$store.commit('djradio/setRecommend', null)
  },
  computed: {
    ...mapState('djradio', {
      recommend: 'recommend'
    })
  }
}
</script>
<style lang="less" scoped>
.recommend__container {
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

      > a {
        position: relative;
        margin-left: 20px;
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
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 78%;
          height: 16px;
          overflow: hidden;
          padding: 0 6px;
          border: 1px solid #999;
          line-height: 16px;
          *line-height: 18px;
          color: #999;
          vertical-align: middle;
          font-size: 12px;
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
