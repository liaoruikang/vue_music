<template>
  <div class="artist__container w clearfix" v-loading="!isShow">
    <div class="artist__main" v-if="singerDetail">
      <div class="artist__left">
        <nav>
          <h3>
            {{ singerDetail.artist.name }}
            <h4 v-for="(item, index) in singerDetail.artist.alias" :key="index">
              {{ item }}
            </h4>
          </h3>
          <div class="img">
            <el-image
              :src="singerDetail.artist.picUrl + '?param=640y300'"
            ></el-image>
            <div class="bg">
              <router-link
                v-if="singerDetail.artist.accountId"
                :to="`/user/home?id=${singerDetail.artist.accountId}`"
                class="home"
              ></router-link>
              <a
                href="javascript:;"
                :style="{
                  backgroundPosition: sc ? '0 -781px' : '0 -540px'
                }"
                @click="collection(sc)"
                class="collection"
              ></a>
            </div>
          </div>
          <ul class="clearfix">
            <li :class="$route.path === '/artist' ? 'current' : ''">
              <router-link :to="`/artist?id=${$route.query.id}`"
                >热门作品</router-link
              >
            </li>
            <li :class="$route.path === '/artist/album' ? 'current' : ''">
              <router-link :to="`/artist/album?id=${$route.query.id}`"
                >所有专辑</router-link
              >
            </li>
            <li :class="$route.path === '/artist/mv' ? 'current' : ''">
              <router-link :to="`/artist/mv?id=${$route.query.id}`"
                >相关MV</router-link
              >
            </li>
            <li :class="$route.path === '/artist/desc' ? 'current' : ''">
              <router-link :to="`/artist/desc?id=${$route.query.id}`"
                >艺人介绍</router-link
              >
            </li>
          </ul>
        </nav>
        <router-view></router-view>
        <div class="artist__songs" v-if="$route.path === '/artist'">
          <div class="f__btn">
            <a href="javascript:;" class="play" @click="play">
              <em>
                <i></i>
                播放
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
              <em> {{ '收藏热门' + singerDetail.hotSongs.length }} </em>
            </a>
          </div>
          <!-- 表格区域 -->
          <el-table
            stripe
            :data="singerDetail.hotSongs"
            :show-header="false"
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
                    <span
                      v-if="scope.row.alia[0] && !scope.row.tns"
                      class="tips"
                    >
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
      <div class="artist__right">
        <div class="artist__box">
          <div class="artist__beSimilar">
            <h3>相似歌手</h3>
            <ul>
              <li v-for="item in simiArtist.artists.slice(0, 6)" :key="item.id">
                <router-link :to="`/artist?id=${item.id}`">
                  <el-image :src="item.picUrl + '?param=50y50'"></el-image>
                </router-link>
                <p>
                  <router-link :to="`/artist?id=${item.id}`">{{
                    item.name
                  }}</router-link>
                </p>
              </li>
            </ul>
          </div>
          <div class="artist__client">
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
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { artistSubAPI } from '@/api/artistAPI'
export default {
  name: 'artist',
  data() {
    return {}
  },

  computed: {
    id() {
      return this.$route.query.id || 0
    },
    ...mapState('artist', {
      singerDetail: 'singerDetail',
      simiArtist: 'simiArtist'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),
    isShow() {
      if (this.singerDetail) {
        return true
      } else {
        return false
      }
    },
    sc() {
      if (this.singerDetail.artist.followed) {
        return true
      } else {
        return false
      }
    },
    ids() {
      const arr = []
      this.singerDetail.hotSongs.forEach((item) => {
        arr.push(item.id)
      })
      const str = arr.join(',')
      return str
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          // 获取歌手详情
          this.removeSingerDetail()
          this.getSingerDetail(val)
          this.getSimiArtist(val)
        }
      }
    },
    singerDetail(val) {
      if (val) {
        // 更新标题
        this.updateTitle(this.$route.meta, val.artist.name, 3)
      }
    }
  },
  methods: {
    ...mapActions('artist', {
      getSingerDetail: 'getSingerDetail',
      getSimiArtist: 'getSimiArtist'
    }),
    ...mapMutations('artist', {
      removeSingerDetail: 'removeSingerDetail'
    }),
    ...mapMutations('play', {
      setSongList: 'setSongList',
      setCurrentPlay: 'setCurrentPlay',
      addSongs: 'addSongs'
    }),
    // 收藏歌手
    async collection(val) {
      const t = !val ? 1 : 0
      const { data: result } = await artistSubAPI(this.id, t)
      if (result.code !== 200) return this.$message.error(result.message)
      this.getSingerDetail(this.id)
      const str = t ? '收藏成功' : '取消收藏成功'
      this.$message.success(str)
    },
    // 播放
    play() {
      this.setSongList(this.singerDetail.hotSongs)
      this.setCurrentPlay(this.singerDetail.hotSongs[0])
    },
    // 添加歌曲
    add() {
      this.addSongs(this.singerDetail.hotSongs)
      this.$message.success('添加成功')
    }
  },
  beforeDestroy() {
    this.$store.commit('artist/removeAll')
  }
}
</script>
<style lang="less" scoped>
.artist__container {
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  .artist__left {
    float: left;
    width: 640px;
    padding: 47px 30px 40px 39px;
    nav {
      h3 {
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
        color: #333;
        h4 {
          display: inline-block;
          max-width: 23%;
          padding-left: 10px;
          font-size: 14px;
          line-height: 32px;
          color: #999;
          font-weight: normal;
        }
      }
      .img {
        position: relative;
        .el-image {
          width: 640px;
          height: 300px;
          vertical-align: middle;
        }
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 640px;
          height: 300px;
          background: url('../../assets/uploads/ban_mask.png') no-repeat;
          a {
            position: absolute;
            bottom: 18px;
            height: 32px;
            background: url('../../assets/uploads/iconall.png') no-repeat;
          }
          .home {
            right: 116px;
            width: 96px;
            background-position: 0 -1156px;
          }
          .home:hover {
            background-position: 0 -1196px;
          }
          .collection {
            right: 20px;
            width: 76px;
            background-position: 0 -500px;
          }
          .collection:hover {
            background-position: 0 -540px;
          }
        }
      }
      ul {
        background: url('../../assets/uploads/tab.png') repeat-x 0 0;
        border: 1px solid #ccc;
        border-width: 0 1px;
        margin-top: -1px;
        li {
          float: left;
          width: 134px;
          height: 37px;
          font-size: 14px;
          line-height: 37px;
          text-align: center;
          background: url('../../assets/uploads/tab.png') no-repeat;
          padding: 2px 0 0 1px;
          a {
            display: inline-block;
            width: 100%;
            height: 36px;
            background: url('../../assets/uploads/tab.png') no-repeat 0 -999999px;
          }
        }
        li:hover {
          background-position: right -45px;
          a {
            background-position: -5px -45px;
          }
        }
        .current {
          background-position: left -90px !important;

          a {
            background-position: right -90px !important;
          }
        }
      }
    }
    .artist__songs {
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
  .artist__right {
    float: left;

    width: 270px;
    .artist__box {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-size: 12px;
      }
      .artist__beSimilar {
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            width: 50px;
            height: 92px;
            margin: 0 5px;
            a:hover {
              text-decoration: underline;
            }
            .el-image {
              width: 50px;
              height: 50px;
            }
            p {
              margin-top: 2px;
              text-align: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .artist__client {
        margin-top: 20px;
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
