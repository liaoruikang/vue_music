<template>
  <div class="myContent__container" v-loading.lock="!isShow">
    <div v-if="isShow">
      <!-- 头部 -->
      <div class="myContent__head">
        <div class="head__left">
          <el-image :src="list.coverImgUrl + '?param=200y200'"></el-image>
        </div>
        <div class="head__right">
          <div class="name">
            <h2><i></i>{{ list.name }}</h2>
          </div>
          <div class="author">
            <el-image :src="list.creator.avatarUrl + '?param=35y35'"></el-image>
            <router-link
              class="author__name"
              :to="`/user/home?id=${list.creator.userId}`"
            >
              {{ list.creator.nickname }}
            </router-link>
            <span class="createTime"
              >{{ dayjs(list.createTime).format('YYYY-DD-DD') }} 创建</span
            >
          </div>
          <div class="f__btn">
            <a
              href="javascript:;"
              class="play"
              @click="
                list.tracks.length &&
                  $store.dispatch('getsongsDetails', list.id)
              "
              :style="
                !list.tracks.length
                  ? {
                      backgroundPosition: 'right -934px',
                      cursor: 'default'
                    }
                  : null
              "
            >
              <em
                :style="
                  !list.tracks.length
                    ? {
                        backgroundPosition: '0 -891px',
                        paddingLeft: '35px',
                        color: '#bebebe'
                      }
                    : null
                "
              >
                <i v-if="list.tracks.length"></i>
                播放
              </em>
            </a>
            <a
              href="javascript:;"
              class="next"
              v-if="list.tracks.length"
              @click="
                $store.dispatch('addSongs', list.id)
                $message.success('添加成功')
              "
            ></a>
            <a href="javascript:;" class="collection already">
              <em> 收藏 </em>
            </a>
            <a
              href="javascript:;"
              class="share"
              :style="
                !list.tracks.length
                  ? {
                      backgroundPosition: 'right -1192px',
                      color: '#bebebe',
                      cursor: 'default'
                    }
                  : null
              "
              @click="
                list.tracks.length &&
                  $store.commit('setCFDVisible', {
                    display: true,
                    component: 'Forward',
                    songId: list.id,
                    shareDetails: list
                  })
              "
            >
              <em
                :style="
                  !list.tracks.length
                    ? {
                        backgroundPosition: '0 -1311px'
                      }
                    : null
                "
              >
                分享
              </em>
            </a>
            <a
              href="javascript:;"
              class="download"
              :style="
                !list.tracks.length
                  ? {
                      backgroundPosition: 'right -1192px',
                      color: '#bebebe',
                      cursor: 'default'
                    }
                  : null
              "
              @click="
                list.tracks.length &&
                  $store.commit('setCFDVisible', {
                    display: true,
                    component: 'Client'
                  })
              "
            >
              <em
                :style="
                  !list.tracks.length
                    ? {
                        backgroundPosition: '0 -3024px'
                      }
                    : null
                "
              >
                下载
              </em>
            </a>
            <a
              href="javascript:;"
              class="comment"
              :style="
                !list.tracks.length
                  ? {
                      backgroundPosition: 'right -1192px',
                      color: '#bebebe',
                      cursor: 'default'
                    }
                  : null
              "
              @click="anchorPoint"
            >
              <em
                :style="
                  !list.tracks.length
                    ? {
                        backgroundPosition: '0 -1551px'
                      }
                    : null
                "
              >
                评论
              </em>
            </a>
          </div>
          <a
            v-if="$route.query.play && list.specialType !== 5"
            href="javascript:;"
            class="edit"
            @click="
              $router.push(`/my/edit?id=${$route.query.id}&name=${list.name}`)
            "
            >编辑</a
          >
        </div>
      </div>
      <!-- 主体 -->
      <div class="myContent__main">
        <div class="main__title">
          <h3>歌曲列表</h3>
          <span class="sub">{{ list.trackCount }}首歌</span>
          <span class="playCount"
            >播放：<em>{{ list.playCount }}</em
            >次</span
          >
        </div>
        <!-- 无歌曲时 -->
        <div class="empty" v-if="!list.tracks.length">
          <div class="empty__head">
            <h3><i></i>暂无音乐！</h3>
          </div>
          <p>
            点击 <i></i> 即可将你喜欢的音乐收藏到“我的音乐” &nbsp;&nbsp; 马上去
            <a style="color: #0c73c2" href="javascript:;" @click="href"
              >发现音乐</a
            >
          </p>
        </div>
        <!-- 表格区域 -->
        <el-table
          v-if="list.tracks.length"
          stripe
          :data="list.tracks"
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
                        shareDetails: scope.row
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
        <!-- 评论 -->
        <div class="main__Comment" v-show="list.commentCount" ref="commentRef">
          <!-- 头部标题区域 -->
          <div class="comment__head">
            <h3>评论</h3>
            <span class="comment__count">共{{ list.commentCount }}评论</span>
          </div>
          <Comment :id="list.id || 0" type="2"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Comment from '@/components/comment/Comment'
export default {
  name: 'myContent',
  props: ['list'],
  methods: {
    // 锚点跳转到评论区
    anchorPoint() {
      const maxScroll = this.$refs.commentRef.offsetTop
      let scroll = 0
      this.timer = setInterval(() => {
        scroll += Math.ceil(
          (maxScroll - document.querySelector('.app__container').scrollTop) / 15
        )
        if (scroll >= maxScroll) return clearInterval(this.timer)
        document.querySelector('.app__container').scrollTop = scroll - 70
      }, 10)
    },
    // 跳转
    href() {
      sessionStorage.setItem('defaultActive', '/')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),

    ...mapState('user', {
      userId: 'userId'
    }),
    isShow() {
      if (this.list.coverImgUrl) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Comment
  }
}
</script>
<style lang="less" scoped>
.myContent__container {
  min-height: 700px;
  .myContent__head {
    display: flex;
    padding: 40px;
    .head__left {
      position: relative;
      width: 208px;
      height: 208px;
      padding: 4px;
    }
    .head__left::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 6;
      width: 100%;
      height: 100%;
      background: url('../../assets/uploads/coverall.png') no-repeat 0 -1285px;
    }
    .head__right {
      position: relative;
      flex: 1;
      padding-left: 20px;
      margin-top: 10px;
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
        height: 30px;
        a {
          float: left;
          height: 31px;
          padding-right: 5px;
          background: url('../../assets/uploads/button2.png') no-repeat;
          background-position: right -1020px;
          margin-left: 5px;
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
      .edit {
        position: absolute;
        top: 0;
        right: 0;
        padding-left: 18px;
        background: url('../../assets/uploads/table.png') no-repeat 0 -260px;
        color: #0c73c2;
        line-height: 17px;
      }
      .edit:hover {
        text-decoration: underline;
      }
    }
  }
  .myContent__main {
    .main__title {
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      line-height: 33px;
      padding-left: 30px;
      padding-right: 10px;
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
    .empty {
      padding: 105px 0 105px 0;
      text-align: center;
      color: #999;
      p {
        a:hover {
          text-decoration: underline;
        }
        i {
          display: inline-block;
          width: 16px;
          height: 14px;
          background: url('../../assets/uploads/icon.png') no-repeat 0 -400px;
          margin: -2px 5px 0;
          vertical-align: middle;
        }
      }
      .empty__head {
        padding-bottom: 38px;
        color: #333;
        i {
          display: inline-block;
          width: 64px;
          height: 50px;
          background: url('../../assets/uploads/icon.png') no-repeat 0 -347px;
          margin-right: 15px;
          vertical-align: middle;
        }
        h3 {
          font-size: 18px;
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
    .main__Comment {
      margin-top: 35px;
      .comment__head {
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        line-height: 33px;
        padding-left: 30px;
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
      .comment__container {
        padding: 0 30px;
      }
    }
  }
}
</style>
