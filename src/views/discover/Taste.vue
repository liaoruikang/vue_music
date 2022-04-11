<template>
  <div class="taste__container w clearfix" v-loading="!tasteDetail">
    <div class="taste__left" v-if="tasteDetail">
      <div class="left__box">
        <div class="bg">
          <div class="cal">
            <h6>{{ week[dayjs().day()] }}</h6>
            <p>{{ dayjs().date() }}</p>
          </div>
        </div>
        <div class="f__btn">
          <a href="javascript:;" class="play" @click="play">
            <em>
              <i></i>
              播放全部
            </em>
          </a>
          <a href="javascript:;" class="next" @click="add"></a>
          <a
            href="javascript:;"
            class="collection"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Collection',
                songId: ids
              })
            "
          >
            <em>收藏全部</em>
          </a>
        </div>
        <!-- 表格区域 -->
        <div class="title">
          <h2>歌曲列表</h2>
          <span>{{ tasteDetail.dailySongs.length }}首歌</span>
        </div>
        <el-table
          stripe
          :data="tasteDetail.dailySongs"
          size="mini"
          style="width: 100%"
          border
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
      </div>
    </div>
    <div class="taste__right">
      <div class="right__box">
        <div class="client">
          <h3>网易云音乐多端下载</h3>
          <ul>
            <li>
              <a href="https://apps.apple.com/cn/app/id590338362">iPhone</a>
            </li>
            <li>
              <a
                href="https://d1.music.126.net/dmusic/cloudmusicsetup2.7.5.198554.exe"
                >PC</a
              >
            </li>
            <li>
              <a
                href="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.7.21.220329221707_32.apk"
                >Android</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      week: [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
    }
  },
  created() {
    this.getTasteDetail()
  },
  methods: {
    ...mapActions('taste', {
      getTasteDetail: 'getTasteDetail'
    }),
    ...mapMutations('play', {
      setSongList: 'setSongList',
      setCurrentPlay: 'setCurrentPlay',
      addSongs: 'addSongs'
    }),
    // 播放
    play() {
      this.setSongList(this.tasteDetail.dailySongs)
      this.setCurrentPlay(this.tasteDetail.dailySongs[0])
    },
    add() {
      this.addSongs(this.tasteDetail.dailySongs)
      this.$message.success('添加成功')
    }
  },
  computed: {
    ...mapState('taste', {
      tasteDetail: 'tasteDetail'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),
    ids() {
      if (!this.tasteDetail) return null
      let ids = []
      this.tasteDetail.dailySongs.forEach((item) => {
        ids.push(item.id)
      })
      ids = ids.join(',')
      return ids
    }
  }
}
</script>
<style lang="less" scoped>
.taste__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .taste__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
      .bg {
        width: 640px;
        height: 179px;
        padding-top: 1px;
        background: url('../../assets/uploads/recmd_daily.jpg') no-repeat;
        .cal {
          margin: 34px 0 0 54px;
          width: 114px;
          height: 114px;
          background: url('../../assets/uploads/date.png') no-repeat 0 -270px;
          margin-bottom: 3px;
          user-select: none;
          h6 {
            height: 33px;
            color: #fed9d9;
            font-size: 14px;
            line-height: 33px;
            text-align: center;
          }
          p {
            height: 107px;
            background: url('../../assets/uploads/date.png') no-repeat 0 -400px;
            font-weight: bold;
            text-align: center;
            font-size: 74px;
            line-height: 74px;
          }
        }
      }
      .f__btn {
        margin-top: 20px;
        margin-bottom: 20px;
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
      }
      .title {
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        h2 {
          float: left;
          font-size: 20px;
          line-height: 28px;
          font-weight: normal;
        }
        span {
          float: left;
          margin: 9px 0 0 20px;
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
    }
  }
  .taste__right {
    float: right;
    width: 270px;
    .right__box {
      padding: 20px 40px 40px 30px;
      .client {
        margin-top: 35px;
        h3 {
          height: 23px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ccc;
          color: #333;
          font-size: 12px;
        }
        ul {
          height: 65px;
          margin-bottom: 10px;
          background: url('../../assets/uploads/sprite.png') no-repeat 0 -392px;
          li {
            float: left;
            a {
              display: block;
              width: 42px;
              height: 48px;
              text-indent: -9999px;
              background: url('../../assets/uploads/sprite.png') no-repeat 0 -999999px;
            }
          }
          li:nth-child(1) {
            a:hover {
              background-position: 0 -472px;
            }
          }
          li:nth-child(2) {
            a {
              width: 60px;
              margin: 0 26px 0 30px;
            }
            a:hover {
              background-position: -72px -472px;
            }
          }
          li:nth-child(3) {
            a:hover {
              background-position: -158px -472px;
            }
          }
        }
      }
    }
  }
}
</style>
