<template>
  <div class="albumContent__container" v-loading="!albumDetail">
    <div class="albumContent__head" v-if="albumDetail">
      <div class="head__left">
        <el-image :src="albumDetail.album.picUrl"></el-image>
      </div>
      <div class="head__right">
        <div class="name">
          <h2><i></i>{{ albumDetail.album.name }}</h2>
        </div>
        <div class="text">
          歌手：
          <router-link :to="`/artist?id=${albumDetail.album.artist.id}`">{{
            albumDetail.album.artist.name
          }}</router-link>
        </div>
        <div class="text">
          发行时间：{{
            dayjs(albumDetail.album.publishTime).format('YYYY-MM-DD')
          }}
        </div>
        <div class="text">发行公司： {{ albumDetail.album.company }}</div>
        <div class="f__btn">
          <a
            href="javascript:;"
            class="play"
            @click="$store.dispatch('getAlbumDetails', albumDetail.album.id)"
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
              $store.dispatch('addAlbum', albumDetail.album.id)
              $message.success('添加成功')
            "
          ></a>
          <a
            href="javascript:;"
            :class="'collection'"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Collection',
                songId: albumDetail.songsId
              })
            "
          >
            <em> 收藏 </em>
          </a>
          <a
            href="javascript:;"
            class="share"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Forward',
                songId: albumDetail.album.id,
                shareDetails: albumDetail.album,
                type: 'album'
              })
            "
          >
            <em> ({{ albumDetail.album.info.shareCount }}) </em>
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
            <em> ({{ commentCount }}) </em>
          </a>
        </div>
      </div>
      <div class="head__introduce">
        <h3>专辑介绍：</h3>
        <p
          v-for="(item, index) in albumDetail.album.description.slice(0, 3)"
          :key="index"
        >
          {{ item }}
        </p>
        <el-collapse-transition>
          <div class="open" v-show="isOpen">
            <p
              v-for="(item, index) in albumDetail.album.description.slice(3)"
              :key="index"
              v-html="item"
            ></p>
          </div>
        </el-collapse-transition>
        <a href="javascript:;" @click="isOpen = !isOpen"
          >{{ isOpen ? '收起' : '展开'
          }}<i :class="isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i
        ></a>
      </div>
    </div>
    <div class="albumContent__body" v-if="albumDetail">
      <div class="body__title">
        <h3>歌曲列表</h3>
        <span class="sub">{{ albumDetail.album.size }}首歌</span>
      </div>
      <!-- 表格区域 -->
      <el-table
        stripe
        :data="albumDetail.songs"
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
      <!-- 评论区域 -->
      <div class="playlistContent__comment" ref="commentRef">
        <!-- 头部标题区域 -->
        <div class="comment__head">
          <h3>评论</h3>
          <span class="comment__count">共{{ commentCount }}评论</span>
        </div>
        <!-- 评论 -->
        <Comment
          :id="albumDetail.album.id || 0"
          type="3"
          @commentCount="commentCount = $event"
        ></Comment>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Comment from '@/components/comment/Comment'
export default {
  name: 'albumContent',
  data() {
    return {
      commentCount: 0,
      isOpen: false
    }
  },
  methods: {
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
    ...mapState('album', {
      // 专辑详情数据
      albumDetail: 'albumDetail'
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
.albumContent__container {
  min-height: 350px;
  .albumContent__head {
    display: flex;
    flex-wrap: wrap;
    .head__left {
      position: relative;
      width: 209px;
      height: 177px;
      .el-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 177px;
        height: 177px;
      }
    }
    .head__left::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: url('../../assets/uploads/coverall.png') no-repeat 0 -986px;
    }
    .head__right {
      flex: 1;
      padding-left: 20px;
      .name {
        margin: 0 0 12px;
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
          i {
            display: inline-block;
            width: 54px;
            height: 24px;
            background: url('../../assets/uploads/icon.png') no-repeat 0 -186px;
            margin-right: 5px;
            margin-top: -3px;
            vertical-align: middle;
          }
        }
      }
      .text {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        a:hover {
          text-decoration: underline;
        }
        a {
          color: #0c73c2;
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
    }
    .head__introduce {
      width: 100%;
      margin-top: 20px;
      h3 {
        font-size: 100%;
      }
      p {
        color: #666;
        text-indent: 2em;
        line-height: 24px;
        margin-top: 4px;
      }
      a:hover {
        text-decoration: underline;
      }
      a {
        color: #0c73c2;
        float: right;
      }
    }
  }
  .albumContent__body {
    margin: 20px 0;
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
    .playlistContent__comment {
      margin-top: 40px;
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
