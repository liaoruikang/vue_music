<template>
  <div class="artContent__container">
    <h2>{{ $route.query.name }}</h2>
    <div class="cat">
      <ul class="clearfix">
        <li
          v-for="(item, index) in catList"
          :key="index"
          @click="$store.commit('artist/setSingerList', null)"
        >
          <router-link
            :class="
              $route.query.initial
                ? $route.query.initial == item
                  ? 'active'
                  : null
                : index === 0
                ? 'active'
                : null
            "
            :to="`${$route.fullPath.replace(
              /&initial=[\S]{1,2}$/,
              ''
            )}&initial=${item}`"
            >{{
              item === -1 ? '热门' : item === 0 ? '其他' : item
            }}</router-link
          >
        </li>
      </ul>
    </div>
    <div style="min-height: 700px" v-loading="!isShow">
      <div class="catList" v-if="catSingerList">
        <ul>
          <li v-for="item in catSingerList" :key="item.id">
            <router-link :to="`/artist?id=${item.id}`">
              <el-image :src="item.picUrl + '?param=130y130'"></el-image>
            </router-link>
            <p>
              <router-link :to="`/artist?id=${item.id}`"
                >{{ item.name }}
              </router-link>
              <router-link
                v-if="item.accountId"
                class="user__home"
                :to="`/user/home?id=${item.accountId}`"
              ></router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="singerList" v-if="singerList">
        <ul>
          <li v-for="item in singerList" :key="item.id">
            <router-link class="user__name" :to="`/artist?id=${item.id}`">
              {{ item.name }}
            </router-link>
            <router-link
              v-if="item.accountId"
              class="user__home"
              :to="`/user/home?id=${item.accountId}`"
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'artContent',
  data() {
    return {
      catList: [
        -1,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        0
      ],
      queryInfo: {
        limit: 100,
        offset: 0,
        initial: null,
        type: null,
        area: null
      }
    }
  },
  watch: {
    // 监听query参数变化
    query: {
      immediate: true,
      deep: true,
      handler(val) {
        this.queryInfo.initial = val.initial
        this.queryInfo.type = val.type
        this.queryInfo.area = val.area
        this.$store.dispatch('artist/getSingerList', this.queryInfo)
      }
    }
  },
  computed: {
    // 获取query参数
    query() {
      return {
        type: this.$route.query.type || 1,
        area: this.$route.query.area || 7,
        initial: this.$route.query.initial || -1
      }
    },
    ...mapGetters('artist', {
      catSingerList: 'catSingerList',
      singerList: 'singerList'
    }),
    isShow() {
      if (this.catSingerList && this.singerList) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.artContent__container {
  min-height: 700px;
  a:hover {
    text-decoration: underline;
  }
  h2 {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    font-size: 24px;
    font-weight: normal;
  }
  .cat {
    margin-top: 15px;
    ul {
      height: 25px;
      li {
        float: left;
        a {
          display: inline-block;
          padding: 0 8px;
          height: 24px;
          border-radius: 2px;
          line-height: 24px;
        }
        .active {
          color: #fff;
          background: #c20c0c;
        }
        .active:hover {
          text-decoration: none;
        }
      }
    }
  }
  .catList {
    ul {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      border-bottom: 1px dotted #999;
      li {
        width: 130px;
        margin-bottom: 25px;
        .el-image {
          width: 130px;
          height: 130px;
          border: 1px solid #ccc;
          position: relative;
        }
        .el-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('../../assets/uploads/coverall.png') no-repeat 0 -680px;
        }
        p {
          margin-top: 4px;
          .user__home {
            float: right;
            width: 17px;
            height: 18px;
            background: url('../../assets/uploads/icon.png') no-repeat 0 -740px;
          }
        }
      }
    }
  }
  .singerList {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 10px;
      li {
        height: 30px;
        width: 135px;
        line-height: 30px;
        .user__name {
          float: left;
          max-width: 110px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user__home {
          float: left;
          width: 17px;
          height: 18px;
          background: url('../../assets/uploads/icon.png') no-repeat 0 -740px;
          vertical-align: middle;
          margin-top: 7px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
