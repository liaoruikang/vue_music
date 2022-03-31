<template>
  <div class="playlistContent__container">
    <div class="playlistContent__head" v-if="songsDetail">
      <div class="head__left">
        <el-image
          :src="songsDetail.playlist.coverImgUrl + '?param=200y200'"
        ></el-image>
      </div>
      <div class="head__right">
        <div class="name">
          <h2><i></i>{{ '经典电影里令人印象深刻的旋律' }}</h2>
        </div>
        <div class="author">
          <el-image
            :src="songsDetail.playlist.creator.avatarUrl + '?param=35y35'"
          ></el-image>
          <router-link
            class="author__name"
            :to="`/user/home?id=${songsDetail.playlist.creator.userId}`"
          >
            {{ songsDetail.playlist.creator.nickname }}
          </router-link>
          <img
            v-if="songsDetail.playlist.creator.avatarDetail"
            style="
              height: 13px;
              width: 13px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 5px;
              margin-top: -2px;
            "
            :src="songsDetail.playlist.creator.avatarDetail.identityIconUrl"
          />
          <span class="createTime"
            >{{
              dayjs(songsDetail.playlist.creator.createTime).format(
                'YYYY-DD-DD'
              )
            }}
            创建</span
          >
        </div>
        <div class="f__btn">
          <a
            href="javascript:;"
            class="play"
            @click="$store.dispatch('getsongsDetails', songsDetail.playlist.id)"
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
              $store.dispatch('addSongs', songsDetail.playlist.id)
              $message.success('添加成功')
            "
          ></a>
          <a
            href="javascript:;"
            :class="[
              'collection',
              songsDetail.playlist.subscribed ? 'already' : ''
            ]"
            @click="collection(songsDetail.playlist.subscribed)"
          >
            <em> ({{ songsDetail.playlist.subscribedCount }}) </em>
          </a>
          <a
            href="javascript:;"
            class="share"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Forward',
                songId: songsDetail.playlist.id,
                shareDetails: songsDetail.playlist,
                type: 'playlist'
              })
            "
          >
            <em> ({{ songsDetail.playlist.shareCount }}) </em>
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
            <em> ({{ songsDetail.playlist.commentCount }}) </em>
          </a>
        </div>
        <div class="label">
          <span>标签：</span>
          <div class="centent">
            <router-link
              :to="`/discover/playlist/?cat=${item}&order=hot`"
              class="tag"
              v-for="(item, index) in songsDetail.playlist.tags"
              :key="index"
            >
              <i> {{ item }}</i>
            </router-link>
          </div>
        </div>
        <div class="introduce">
          <p
            class="putAway"
            v-show="!isOpen && songsDetail.playlist.description.length > 100"
            v-html="
              '<b>介绍：</b>' +
              songsDetail.playlist.description
                .replace(/\n/g, '<br />')
                .substr(0, 100) +
              '...'
            "
          ></p>
          <p
            class="open"
            v-show="isOpen || songsDetail.playlist.description.length < 100"
            v-html="
              '<b>介绍：</b>' +
              songsDetail.playlist.description.replace(/\n/g, '<br />')
            "
          ></p>
          <div class="isOpen clearfix">
            <a
              href="javascript:;"
              v-if="songsDetail.playlist.description.length > 100"
              @click="isOpen = !isOpen"
              >{{ isOpen ? '收起' : '展开' }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="playlistContent__body" v-if="songsDetail">
      <div class="body__title">
        <h3>歌曲列表</h3>
        <span class="sub">{{ songsDetail.playlist.trackCount }}首歌</span>
        <span class="playCount"
          >播放：<em>{{ songsDetail.playlist.playCount }}</em
          >次</span
        >
      </div>
      <!-- 表格区域 -->
      <el-table
        stripe
        :data="songsDetail.playlist.tracks"
        border
        size="mini"
        style="width: 100%"
      >
        <!-- 索引 -->
        <el-table-column type="index"> </el-table-column>
        <!-- 标题 -->
        <el-table-column label="标题">
          <template slot-scope="scope">
            <span class="name">
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
              <span class="song__name">
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
        class="playlistContent__download"
        v-if="
          songsDetail.playlist.tracks &&
          songsDetail.playlist.tracks.length === 20
        "
      >
        <p>查看更多内容，请下载客户端</p>
        <router-link to="/download">立即下载</router-link>
      </div>
      <!-- 评论区域 -->
      <div class="playlistContent__comment" ref="commentRef">
        <!-- 头部标题区域 -->
        <div class="comment__head">
          <h3>评论</h3>
          <span class="comment__count"
            >共{{ songsDetail.playlist.commentCount }}评论</span
          >
        </div>
        <!-- 评论 -->
        <Comment :id="songsDetail.playlist.id || 0" type="2"></Comment>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Comment from '@/components/comment/Comment'
export default {
  name: 'playlistContent',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    ...mapActions('collection', {
      shoucangPlaylist: 'shoucangPlaylist'
    }),
    ...mapActions('playlist', {
      getPlaylist: 'getPlaylist'
    }),
    // 收藏歌单
    async collection(val) {
      // 判断歌单是否已收藏
      if (val) return
      const { data: result } = await this.shoucangPlaylist({
        t: 1,
        id: this.songsDetail.playlist.id
      }).catch((err) => {
        return err.response
      })
      if (result.code !== 200) return this.$message.error('收藏失败')
      this.$message.success('收藏成功')
      this.getPlaylist({ id: this.id, ist: true })
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
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('playlist', {
      songsDetail: 'songsDetail'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    })
  },
  components: {
    Comment
  }
}
</script>
<style lang="less" scoped>
.playlistContent__container {
  .playlistContent__head {
    display: flex;
    .head__left {
      .el-image {
        width: 200px;
        height: 200px;
        position: relative;
        overflow: visible;
      }
      .el-image::before {
        content: '';
        position: absolute;
        width: 208px;
        height: 208px;
        top: -4px;
        left: -4px;
        background: url('../../assets/uploads/coverall.png') no-repeat 0 -1285px;
      }
    }
    .head__right {
      flex: 1;
      padding-left: 30px;
      .name {
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
          i {
            display: inline-block;
            width: 54px;
            height: 24px;
            background: url('../../assets/uploads/icon.png') no-repeat 0 -243px;
            margin-right: 5px;
            margin-top: -3px;
            vertical-align: middle;
          }
        }
      }
      .author {
        margin-top: 10px;
        .el-image {
          width: 35px;
          height: 35px;
          vertical-align: middle;
        }
        .author__name {
          color: #0c73c2;
          margin: 6px;
        }
        .author__name:hover {
          text-decoration: underline;
        }
        .createTime {
          color: #999;
        }
      }
      .f__btn {
        margin-top: 25px;
        width: 120%;
        height: 30px;
        a {
          float: left;
          height: 31px;
          padding-right: 3px;
          background: url('../../assets/uploads/button2.png') no-repeat;
          background-position: right -1020px;
          margin-left: 3px;
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
      .label {
        margin-top: 30px;
        > span {
          vertical-align: top;
        }
        .centent {
          display: inline-block;
          margin-top: -2px;
          .tags__btn {
            color: #0c73c2;
            font-size: 12px;
          }
          .tags__btn:hover {
            text-decoration: underline;
          }
          .tag {
            display: inline-block;
            margin-right: 10px;
            padding: 0 10px 0 0;
            background: url('../../assets/uploads/button2.png') no-repeat right -27px;
            line-height: 22px;
            i {
              display: inline-block;
              padding: 0 6px 0 13px;
              height: 22px;
              background: url('../../assets/uploads/button2.png') no-repeat 0 0;
              font-size: 12px;
              color: #777;
            }
          }
          .tag:hover {
            background-position: right -1430px;
            i {
              background-position: 0 -1400px;
            }
          }
        }
      }
      .introduce {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        p {
          word-wrap: break-word;
          word-break: break-word;
          white-space: normal;
          /deep/ b {
            font-weight: normal;
          }
        }

        .isOpen {
          a {
            float: right;
            color: #0c73c2;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .playlistContent__body {
    margin-top: 27px;
    .body__title {
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
    .playlistContent__download {
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
    .playlistContent__comment {
      margin-top: 20px;
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
}
</style>
