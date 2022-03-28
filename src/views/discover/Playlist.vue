<template>
  <div class="playlist__container w" v-loading.lock="!isShow">
    <div class="playlist__box" v-if="isShow">
      <!-- 头部 -->
      <div class="playlist__head">
        <h2>{{ songsList.cat }}</h2>
        <a
          href="javascript:;"
          class="playlist__class"
          @click.stop="isClassList = !isClassList"
        >
          <em>选择分类 <i class="el-icon-arrow-down"></i></em>
        </a>
        <a
          href="javascript:;"
          class="playlist__hot"
          @click="
            queryInfo.order = 'hot'
            queryInfo.offset = 0
          "
          >热门</a
        >
        <!-- 分类列表 -->
        <div class="classList" v-show="isClassList" @click.stop>
          <div class="classList__head"></div>
          <div class="classList__body">
            <h3>
              <a
                href="javascript:;"
                @click="
                  queryInfo = {
                    order: null,
                    cat: null,
                    limit: 35,
                    offset: 0
                  }
                  isClassList = false
                "
              >
                <em>{{ songClassList.all.name }}</em>
              </a>
            </h3>
            <dl
              class="clearfix"
              v-for="(item, index) in songClassList.categories"
              :key="index"
            >
              <dt>
                <i :class="`i${index - 0 + 1}`"></i>
                {{ item }}
              </dt>
              <dd>
                <strong v-for="(val, i) in newClass[index]" :key="i"
                  ><a
                    href="javascript:;"
                    @click="
                      queryInfo.cat = val.name
                      queryInfo.offset = 0
                      isClassList = false
                    "
                    >{{ val.name }}</a
                  ><span>|</span></strong
                >
              </dd>
            </dl>
          </div>
          <div class="classList__footer"></div>
        </div>
      </div>
      <!-- 歌单列表区 -->
      <div class="playlist__main">
        <SongsList
          v-for="item in songsList.playlists"
          :key="item.id"
          :url="item.coverImgUrl"
          :audience="item.playCount"
          :id="item.id"
          :title="item.name"
          @playClick="$store.dispatch('getsongsDetails', item.id)"
        ></SongsList>
        <!-- // 分页 -->
        <div class="playlist__page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="songsList.total"
            :current-page="this.queryInfo.offset / queryInfo.limit + 1"
            :page-size="queryInfo.limit"
            @current-change="pageChange"
            next-text="下一页"
            prev-text="上一页"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'playlist',
  data() {
    return {
      isClassList: false,
      queryInfo: {
        order: null,
        cat: null,
        limit: 35,
        offset: null
      }
    }
  },
  created() {
    if (this.$route.query.cat) {
      this.queryInfo.cat = this.$route.query.cat
    }
    // 获取分类数据
    this.$store.dispatch('playlist/getSongClassList')
    this.getSongsList(this.queryInfo)
    window.addEventListener('click', () => {
      this.isClassList = false
    })
  },
  computed: {
    ...mapState('playlist', {
      songClassList: 'songClassList',
      songsList: 'songsList'
    }),
    newClass() {
      const arr = []
      for (const key in this.songClassList.categories) {
        arr.push(
          this.songClassList.sub.filter((val) => val.category === parseInt(key))
        )
      }
      return arr
    },
    isShow() {
      if (this.songClassList && this.songsList) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    queryInfo: {
      deep: true,
      handler(val) {
        this.getSongsList(val)
      }
    },
    // 更新网页标题
    songsList: {
      deep: true,
      handler(val) {
        if (val) {
          this.updateTitle(this.$route.meta, val.cat + '歌单', 3)
        }
      }
    }
  },
  methods: {
    ...mapActions('playlist', {
      getSongsList: 'getSongsList'
    }),
    // 分页
    pageChange(val) {
      this.queryInfo.offset = (val - 1) * this.queryInfo.limit
    }
  },
  components: {
    SongsList: () =>
      import(
        /* webpackChunkName: "playlist"  */ '@/components/common/SongsList'
      )
  },
  beforeDestroy() {
    this.$store.commit('playlist/setSongClassList', null)
    this.$store.commit('playlist/setSongsList', null)
  }
}
</script>
<style lang="less" scoped>
.playlist__container {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .playlist__box {
    padding: 40px;
    .playlist__head {
      position: relative;
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h2 {
        float: left;
        font-size: 24px;
        font-weight: normal;
      }
      > a {
        display: inline-block;
        margin: 2px 0 0 12px;
      }
      .playlist__class {
        float: left;
        width: 91px;
        height: 31px;
        background: url('../../assets/uploads/button2.png') no-repeat right -100px;
        padding: 0 5px 0 0;
        em {
          display: inline-block;
          width: 100%;
          background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
          text-align: center;
          line-height: 31px;
          color: #0c73c2;
          i {
            font-weight: bold;
          }
        }
      }
      .playlist__class:hover {
        background-position: right -182px;
        em {
          background-position: 0 -141px;
        }
      }
      .playlist__class:active {
        background-position: right -264px;
        em {
          background-position: 0 -223px;
        }
      }
      .playlist__hot {
        float: right;
        width: 46px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        color: #fff;
        background: url('../../assets/uploads/button.png') no-repeat;
        border-radius: 3px;
      }
      .playlist__hot:hover {
        text-decoration: underline;
      }
      // 分类列表
      .classList {
        position: absolute;
        z-index: 999;
        top: 32px;
        left: -40px;
        width: 720px;
        .classList__head {
          height: 32px;
          background: url('../../assets/uploads/sltlyr.png') no-repeat;
        }
        .classList__head::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 132px;
          display: inline-block;
          width: 24px;
          height: 11px;
          vertical-align: middle;
          background: url('../../assets/uploads/iconall.png') no-repeat -48px 0;
        }
        .classList__body {
          height: 400px;
          padding: 0 10px;
          background: url('../../assets/uploads/sltlyr.png') repeat-y -720px 0;
          a:hover {
            text-decoration: underline;
          }
          h3 {
            height: 37px;
            padding-left: 26px;
            border-bottom: 1px solid #e6e6e6;
            font-weight: normal;
            a {
              display: inline-block;
              width: 75px;
              height: 26px;
              text-align: center;
              line-height: 26px;
              background: url('../../assets/uploads/button.png') no-repeat 0 -64px;
              font-size: 12px;
            }
          }
          dl {
            dt,
            dd {
              float: left;
            }
            dt {
              width: 70px;
              margin: 0 -100px 0 26px;
              padding-top: 20px;
              border-right: 1px solid #e6e6e6;
              font-weight: bold;
              line-height: 32px;
              i {
                display: inline-block;
                width: 23px;
                height: 23px;
                background: url('../../assets/uploads/icon.png') no-repeat;
                vertical-align: middle;
                margin-right: 5px;
                margin-top: -2px;
              }
              .i1 {
                background-position: -20px -735px;
              }
              .i2 {
                background-position: 0 -60px;
              }
              .i3 {
                background-position: 0 -88px;
              }
              .i4 {
                background-position: 0 -117px;
              }
              .i5 {
                background-position: 0 -141px;
              }
            }
            dd {
              margin-left: 96px;
              padding: 20px 15px 0 15px;
              border-left: 1px solid #e6e6e6;
              line-height: 32px;
              a {
                white-space: nowrap;
                color: #333;
                font-weight: normal;
              }
              span {
                margin: 0 8px 0 10px;
                color: #d8d8d8;
              }
            }
          }
        }
        .classList__footer {
          height: 20px;
          background: url('../../assets/uploads/sltlyr.png') no-repeat -1440px -12px;
        }
      }
    }
    .playlist__main {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      .songsList__container {
        margin: 0 20px;
      }
      .playlist__page {
        width: 100%;
        text-align: center;
        /deep/ .el-pagination {
          display: inline-block;
        }
      }
    }
  }
}
</style>
