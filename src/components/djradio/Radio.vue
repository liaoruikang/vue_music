<template>
  <div class="radio__container" v-show="data">
    <h2>
      <span
        @click="
          $router.push(`/discover/djradio/category?id=${id}&name=${title}`)
        "
        >{{ title }}</span
      >
      <router-link
        v-if="more"
        :to="`/discover/djradio/category?id=${id}&name=${title}`"
        >更多 ></router-link
      >
    </h2>
    <div class="radio__main">
      <ul class="clearfix">
        <li v-for="item in data" :key="item.id">
          <router-link :to="`/djradio?id=${item.id}`">
            <el-image :src="item.picUrl + '?param=120y120'" lazy></el-image>
          </router-link>
          <div class="text">
            <h3 :class="au ? 'title' : 'er'">
              <router-link :to="`/djradio?id=${item.id}`">{{
                item.name
              }}</router-link>
            </h3>
            <p class="radio__author" v-if="au">
              <i></i>
              <router-link :to="`/user/home?id=${item.dj.userId}`">{{
                item.dj.nickname
              }}</router-link>
              <img
                v-if="item.dj.avatarDetail"
                :src="item.dj.avatarDetail.identityIconUrl"
              />
            </p>
            <span v-if="au"
              >共{{ item.programCount }}期&nbsp;&nbsp;订阅{{
                item.subCount
              }}次</span
            >
            <span v-else>{{ item.rcmdtext }}</span>
          </div>
        </li>
      </ul>
      <div class="page" v-if="isPage">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          :current-page="this.queryInfo.offset / queryInfo.limit + 1"
          :page-size="queryInfo.limit"
          @current-change="pageChange"
          next-text="下一页"
          prev-text="上一页"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { recommendDjListAPI, radioHotAPI } from '@/api/djradioAPI'

export default {
  name: 'radio',
  props: {
    more: {
      type: Boolean,
      default: false
    },
    au: {
      type: Boolean,
      default: false
    },
    request: {
      type: String,
      // hot
      default: 'recommend'
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    isPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: null,
      queryInfo: {
        limit: 30,
        offset: 0
      },
      count: 0
    }
  },
  created() {
    if (this.request === 'recommend') {
      this.getRecommendDjList(this.id)
    } else if (this.request === 'hot') {
      this.getRadioHot(this.id)
    }
  },
  methods: {
    // 获取分类推荐电台列表
    async getRecommendDjList(id) {
      const { data: result } = await recommendDjListAPI(id)
      if (result.code !== 200) return
      result.djRadios = result.djRadios.filter((item, index) => index < 4)
      this.data = result.djRadios
    },
    // 类别热门电台
    async getRadioHot(cateId) {
      const { data: result } = await radioHotAPI(
        cateId,
        this.queryInfo.limit,
        this.queryInfo.offset
      )
      if (result.code !== 200) return
      this.data = result.djRadios
      this.count = result.count
    },
    // 当页码改变时触发
    pageChange(val) {
      this.queryInfo.offset = (val - 1) * this.queryInfo.limit
      this.getRadioHot(this.id)
    }
  },
  watch: {
    id(val) {
      this.queryInfo.offset = 0
      val && this.request === 'hot' && this.getRadioHot(val)
    }
  }
}
</script>
<style lang="less" scoped>
.radio__container {
  margin-top: 35px;
  h2 {
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
  .radio__main {
    ul {
      li {
        display: flex;
        float: left;
        width: 435px;
        height: 120px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;
        .el-image {
          width: 120px;
          height: 120px;
        }
        a:hover {
          text-decoration: underline;
        }
        .text {
          flex: 1;
          padding-left: 20px;
          .title {
            height: 64px;
            position: relative;
            a {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              font-size: 18px;
            }
          }
          .er {
            height: auto;
            margin: 16px 0 20px;
            a {
              font-size: 18px;
            }
          }
          p {
            margin-bottom: 6px;
            i {
              display: inline-block;
              width: 14px;
              height: 15px;
              background: url('../../assets/uploads/icon.png') no-repeat -50px -300px;
              vertical-align: middle;
              margin-right: 5px;
            }
            img {
              width: 13px;
              height: 13px;
              vertical-align: middle;
              margin-top: -2px;
              margin-left: 5px;
            }
          }
          > span {
            color: #999;
          }
        }
      }
      li:nth-child(even) {
        margin-left: 32px;
      }
    }
    .page {
      margin-top: 35px;
      text-align: center;
    }
  }
}
</style>
