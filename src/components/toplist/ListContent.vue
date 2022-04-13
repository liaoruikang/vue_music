<template>
  <div
    class="listContent__container"
    v-loading.lock="!songsDetails.coverImgUrl"
  >
    <div v-show="songsDetails.coverImgUrl">
      <div class="listContent__header clearfix">
        <div class="img">
          <img
            v-if="songsDetails.coverImgUrl"
            :src="songsDetails.coverImgUrl + '?param=150y150'"
            width="150"
            height="150"
          />
        </div>
        <div class="listContent__f">
          <h3 class="f__name">{{ songsDetails.name }}</h3>
          <p class="f__time">
            <i></i>最近更新：{{
              dayjs(songsDetails.updateTime).format('MM月DD日')
            }}
            <span
              >（{{
                $route.query.frequency
                  ? $route.query.frequency
                  : featureList[0] && featureList[0].updateFrequency
              }}）</span
            >
          </p>
          <div class="f__btn">
            <a
              href="javascript:;"
              class="play"
              @click="$store.dispatch('getsongsDetails', songsDetails.id)"
            >
              <em>
                <i></i>
                播放
              </em>
            </a>
            <a
              href="javascript:;"
              class="next"
              @click="
                $store.dispatch('addSongs', songsDetails.id)
                $message.success('添加成功')
              "
            ></a>
            <a
              href="javascript:;"
              :class="[
                'collection',
                collectionListId.includes(songsDetails.id) ? 'already' : ''
              ]"
              @click="collection"
            >
              <em> ({{ songsDetails.subscribedCount }}) </em>
            </a>
            <a
              href="javascript:;"
              class="share"
              @click="
                $store.commit('setCFDVisible', {
                  display: true,
                  component: 'Forward',
                  songId: songsDetails.id,
                  shareDetails: songsDetails,
                  type: 'playlist'
                })
              "
            >
              <em> ({{ songsDetails.shareCount }}) </em>
            </a>
            <a
              href="javascript:;"
              class="download"
              @click="
                $store.commit('setCFDVisible', {
                  display: true,
                  component: 'Client'
                })
              "
            >
              <em> 下载 </em>
            </a>
            <a href="javascript:;" class="comment" @click="anchorPoint">
              <em> ({{ songsDetails.commentCount }}) </em>
            </a>
          </div>
        </div>
      </div>
      <div class="listContent__main" v-if="songsDetails">
        <div class="main__title">
          <h3>歌曲列表</h3>
          <span class="sub">{{ songsDetails.trackCount }}首歌</span>
          <span class="playCount"
            >播放：<em>{{ songsDetails.playCount }}</em
            >次</span
          >
        </div>
        <!-- 表格区域 -->
        <el-table
          stripe
          :data="songsDetails.tracks"
          border
          size="mini"
          style="width: 100%"
        >
          <!-- 索引 -->
          <el-table-column type="index"> </el-table-column>
          <!-- 标题 -->
          <el-table-column label="标题">
            <template slot-scope="scope">
              <router-link
                :to="`/song?id=${scope.row.id}`"
                class="song__link"
                v-if="scope.$index < 3"
              >
                <el-image
                  :src="scope.row.al.picUrl + '?param=50y50'"
                ></el-image>
              </router-link>
              <span
                class="name"
                :style="{ marginTop: scope.$index < 3 ? '16px' : 0 }"
              >
                <a
                  href="javascript:;"
                  title="播放"
                  @click="$store.dispatch('getSongDetails', scope.row.id)"
                >
                  <i
                    :class="[
                      'play',
                      currentPlay && currentPlay.id === scope.row.id
                        ? 'active'
                        : ''
                    ]"
                  ></i>
                </a>
                <span
                  class="song__name"
                  :style="{ maxWidth: scope.$index < 3 ? '120px' : '210px' }"
                >
                  <router-link :to="`/song?id=${scope.row.id}`">
                    <em>{{ scope.row.name }}</em>
                  </router-link>
                  <span v-if="scope.row.tns" class="tips">
                    -（{{ scope.row.tns[0] }}）
                  </span>
                  <span v-if="scope.row.alia[0] && !scope.row.tns" class="tips">
                    -（{{ scope.row.alia[0] }}）
                  </span>
                </span>
                <router-link
                  v-show="scope.row.mv !== 0"
                  :to="`/mv?id=${scope.row.mv}`"
                >
                  <i class="mv"></i>
                </router-link>
              </span>
            </template>
          </el-table-column>
          <!-- 时长 -->
          <el-table-column label="时长" width="105">
            <template slot-scope="scope">
              <div class="time__box">
                <span class="time">{{
                  dayjs(scope.row.dt).format('mm:ss')
                }}</span>
                <span class="f clearfix">
                  <a
                    href="javascript:;"
                    class="add"
                    @click="
                      $store.dispatch('addSong', scope.row.id)
                      $message.success('添加成功')
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="collection"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Collection',
                        songId: scope.row.id
                      })
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="share"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Forward',
                        songId: scope.row.id,
                        shareDetails: scope.row,
                        type: 'song'
                      })
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="download"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Client'
                      })
                    "
                  ></a>
                </span>
              </div>
            </template>
          </el-table-column>
          <!-- 歌手 -->
          <el-table-column label="歌手" width="130">
            <template slot-scope="scope">
              <div class="author">
                <span v-for="(item, index) in scope.row.ar" :key="index">
                  <router-link :to="`/artist?id=${item.id}`">{{
                    item.name
                  }}</router-link
                  >{{ index !== scope.row.ar.length - 1 ? '/' : '' }}</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 客户端下载 -->
        <div
          class="listContent__download"
          v-if="songsDetails.tracks && songsDetails.tracks.length === 20"
        >
          <p>查看更多内容，请下载客户端</p>
          <router-link to="/download">立即下载</router-link>
        </div>
      </div>
      <div class="listContent__comment" ref="commentRef">
        <!-- 头部标题区域 -->
        <div class="comment__head">
          <h3>评论</h3>
          <span class="comment__count"
            >共{{ songsDetails.commentCount }}评论</span
          >
        </div>
        <!-- 评论 -->
        <Comment :id="songsDetails.id || 0" type="2"></Comment>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Bus from '@/plugin/eventBus'
export default {
  name: 'listContent',
  data() {
    return {
      timer: null
    }
  },
  created() {
    this.$store.dispatch('collection/getUserPlayList', this.userId)
  },
  methods: {
    ...mapActions('collection', {
      shoucangPlaylist: 'shoucangPlaylist'
    }),
    // 收藏歌单
    async collection() {
      if (!this.isLogin) {
        Bus.$emit('Visible', true)
        return
      }
      // 判断歌单是否已收藏
      if (this.collectionListId.includes(this.songsDetails.id)) return

      const { data: result } = await this.shoucangPlaylist({
        t: 1,
        id: this.songsDetails.id
      }).catch((err) => {
        return err.response
      })
      if (result.code !== 200) return this.$message.error(result.message)
      this.$message.success('收藏成功')
      this.$store.dispatch('collection/getUserPlayList', this.userId)
    },
    // 锚点跳转到评论区
    anchorPoint() {
      const maxScroll = this.$refs.commentRef.offsetTop
      const appEl = document.querySelector('.app__container')
      let scroll = appEl.scrollTop
      this.timer = setInterval(() => {
        scroll += Math.ceil(
          (maxScroll - document.querySelector('.app__container').scrollTop) / 15
        )
        if (scroll >= maxScroll) return clearInterval(this.timer)
        appEl.scrollTop = scroll
      }, 10)
    }
  },
  watch: {
    userId(val) {
      if (val) {
        this.$store.dispatch('collection/getUserPlayList', val)
      }
    }
  },
  computed: {
    ...mapState('toplist', {
      songsDetails: 'songsDetails',
      featureList: 'featureList'
    }),
    ...mapState('collection', {
      userPlayList: 'userPlayList'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),
    ...mapState('user', {
      isLogin: 'isLogin'
    }),
    userId() {
      return this.$store.state.user.userId
    },
    collectionListId() {
      if (this.userPlayList.length === 0) return []
      let arr = []
      this.userPlayList.playlist.forEach((item) => {
        if (item.creator.userId !== this.userId) {
          arr.push(item.id)
        }
      })
      arr = arr.join(',')
      return arr
    }
  },
  components: {
    Comment: () =>
      import(/* webpackChunkName: "comment"  */ '@/components/comment/Comment')
  }
}
</script>
<style lang="less" scoped>
.listContent__container {
  min-height: 700px;

  .listContent__header {
    padding: 40px;
    .img {
      float: left;
      width: 158px;
      height: 158px;
      img {
        border: 1px solid #ccc;
        padding: 3px;
        vertical-align: middle;
      }
    }
    .listContent__f {
      float: left;
      margin-left: 30px;
      .f__name {
        margin-top: 20px;
        font-size: 20px;
        font-weight: normal;
        line-height: 24px;
      }
      .f__time {
        margin-top: 10px;
        color: #666;
        i {
          display: inline-block;
          width: 13px;
          height: 13px;
          background: url('../../assets/uploads/icon.png') no-repeat -18px -682px;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          color: #999;
        }
      }
      .f__btn {
        margin-top: 40px;
        height: 30px;
        a {
          float: left;
          height: 31px;
          padding-right: 5px;
          background: url('../../assets/uploads/button2.png') no-repeat;
          background-position: right -1020px;

          margin-right: 5px;
          em {
            display: block;
            height: 100%;
            padding: 0 5px;
            background: url('../../assets/uploads/button2.png') no-repeat;
            text-align: center;
            line-height: 31px;
            padding-left: 28px;
            i {
              display: inline-block;
              width: 20px;
              height: 18px;
              background: url('../../assets/uploads/button2.png') no-repeat;
              margin-top: -4px;
              vertical-align: middle;
            }
          }
        }
        a:hover {
          background-position: right -1106px;
        }
        .play {
          margin: 0;
          background-position: right -428px;
          em {
            padding: 0 5px;
            background-position: 0 -387px;
            color: #fff;
            i {
              background-position: 0 -1622px;
            }
          }
        }
        .play:hover {
          background-position: right -510px;
          em {
            background-position: 0 -469px;
            i {
              background-position: -28px -1622px;
            }
          }
        }
        .next {
          width: 31px;
          background-position: 0 -1588px;
          margin-left: -2px;
        }
        .next:hover {
          background-position: -40px -1588px;
        }
        .collection {
          em {
            background-position: 0 -977px;
          }
        }
        .collection:hover {
          em {
            background-position: 0 -1063px;
          }
        }
        .already {
          cursor: default;
          background-position: right -1192px !important;
          em {
            color: #bebebe;
            background-position: 0 -1149px !important;
          }
        }
        .share {
          em {
            background-position: 0 -1225px;
          }
        }
        .share:hover {
          em {
            background-position: 0 -1268px;
          }
        }
        .download {
          em {
            background-position: 0 -2761px;
          }
        }
        .download:hover {
          em {
            background-position: 0 -2805px;
          }
        }
        .comment {
          em {
            background-position: 0 -1465px;
          }
        }
        .comment:hover {
          em {
            background-position: 0 -1508px;
          }
        }
      }
    }
  }
  .listContent__main {
    padding: 0 30px 40px 40px;
    .main__title {
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      line-height: 33px;

      h3 {
        float: left;
        font-size: 20px;
        font-weight: normal;
        color: #333;
      }
      .sub {
        float: left;
        margin-left: 15px;
        color: #666;
      }
      .playCount {
        float: right;
        color: #666;
        em {
          font-weight: bold;
          color: #c20c0c;
        }
      }
    }
    /deep/ .el-table th.el-table__cell {
      background-color: #f8f8f8;
      color: #666;
      font-weight: normal;
    }
    /deep/ .el-image {
      vertical-align: middle;
    }
    /deep/ .el-table__row {
      a:hover {
        text-decoration: underline;
      }
      .song__link {
        float: left;
        margin-right: 10px;
      }
      .name {
        float: left;
        .play,
        .mv {
          display: inline-block;
          width: 17px;
          height: 17px;
          background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
          vertical-align: middle;
          margin-top: -3px;
          margin-right: 7px;
        }
        .play:hover {
          background-position: 0 -128px;
        }
        .active {
          background-position: -20px -128px !important;
        }
        .song__name {
          display: inline-block;
          white-space: nowrap;
          max-width: 230px;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .mv {
          display: inline-block;
          width: 23px;
          height: 17px;
          background-position: 0 -151px;
          margin-left: 2px;
        }
        .mv:hover {
          background-position: -30px -151px;
        }
      }
      .time__box {
        .f {
          display: none;
          a {
            float: left;
            width: 18px;
            height: 16px;
            background: url('../../assets/uploads/table.png') no-repeat;
            margin-left: 4px;
          }
          .add {
            width: 13px;
            height: 13px;
            background: url('../../assets/uploads/icon.png') no-repeat 0 -700px;
            margin: 0;
          }
          .add:hover {
            background-position: -22px -700px;
          }
          .collection {
            background-position: 0 -174px;
          }
          .collection:hover {
            background-position: -20px -174px;
          }
          .share {
            background-position: 0 -195px;
          }
          .share:hover {
            background-position: -20px -195px;
          }
          .download {
            background-position: -81px -174px;
          }
          .download:hover {
            background-position: -104px -174px;
          }
        }
      }
      .time__box:hover {
        .time {
          display: none;
        }
        .f {
          display: inline;
        }
      }
      .author {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    /deep/ .el-table__row:hover {
      .time__box {
        .time {
          display: none;
        }
        .f {
          display: inline;
        }
      }
    }
    .listContent__download {
      margin-top: 30px;
      text-align: center;

      p {
        font-size: 13px;
        margin-bottom: 20px;
      }
      a {
        display: inline-block;
        width: 120px;
        height: 30px;
        background-image: linear-gradient(90deg, #ff5a4c 0%, #ff1d12 100%);
        border-radius: 18px;
        line-height: 30px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .listContent__comment {
    padding: 0 30px 40px 40px;
    .comment__head {
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      line-height: 33px;
      h3 {
        float: left;
        font-size: 20px;
        font-weight: normal;
        color: #333;
      }
      .comment__count {
        float: left;
        margin-left: 15px;
        color: #666;
      }
    }
  }
}
</style>
