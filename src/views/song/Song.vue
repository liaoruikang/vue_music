<template>
  <div class="song__container w clearfix">
    <div class="song__left">
      <div class="left__box">
        <SongContent></SongContent>
      </div>
    </div>
    <div class="song__right" v-if="simiSong && simiPlaylist">
      <div class="right__box">
        <div class="simi" v-if="simiPlaylist.playlists.length">
          <h3>包含这首歌的歌单</h3>
          <ul>
            <li v-for="item in simiPlaylist.playlists" :key="item.id">
              <router-link :to="`/playlist?id=${item.id}`">
                <el-image :src="item.coverImgUrl + '?param=50y50'"></el-image>
              </router-link>
              <div class="text">
                <p>
                  <router-link :to="`/playlist?id=${item.id}`">
                    <span>{{ item.name }}</span>
                  </router-link>
                </p>
                <p>
                  <em>by</em>
                  <router-link :to="`/user/home?id=${item.creator.userId}`">
                    <span>{{ item.creator.nickname }}</span>
                  </router-link>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="beSimilar">
          <h3>相似歌曲</h3>
          <ul>
            <li class="clearfix" v-for="item in simiSong.songs" :key="item.id">
              <div class="text">
                <div class="name">
                  <router-link :to="`/song?id=${item.id}`">{{
                    item.name
                  }}</router-link>
                </div>
                <div class="artist">
                  <span v-for="(val, i) in item.artists" :key="val.id">
                    <router-link :to="`/artist?id=${val.id}`">{{
                      val.name
                    }}</router-link
                    >{{ i !== item.artists.length - 1 ? '/' : '' }}</span
                  >
                </div>
              </div>
              <div class="f">
                <a
                  href="javascript:;"
                  class="play"
                  @click="$store.dispatch('getSongDetails', item.id)"
                ></a>
                <a
                  href="javascript:;"
                  class="add"
                  @click="$store.dispatch('addSong', item.id)"
                ></a>
              </div>
            </li>
          </ul>
        </div>
        <div class="right__client">
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
import SongContent from '@/components/song/SongContent'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'song',
  data() {
    return {}
  },
  methods: {
    ...mapActions('song', {
      getSongDetail: 'getSongDetail',
      getLyric: 'getLyric',
      getSimiSong: 'getSimiSong',
      getSimiPlaylist: 'getSimiPlaylist'
    }),
    ...mapMutations('song', {
      removeAll: 'removeAll'
    })
  },
  components: {
    SongContent
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('song', {
      simiSong: 'simiSong',
      simiPlaylist: 'simiPlaylist'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.getSimiSong(val)
        this.getSongDetail(val)
        this.getLyric(val)
        this.getSimiPlaylist(val)
      }
    }
  },
  beforeDestroy() {
    this.removeAll()
  }
}
</script>
<style lang="less" scoped>
.song__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .song__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
    }
  }
  .song__right {
    float: right;
    width: 270px;
    .right__box {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-size: 12px;
      }
      .simi {
        margin-top: 20px;
        ul {
          li {
            display: flex;
            margin-bottom: 10px;
            .el-image {
              width: 50px;
              height: 50px;
            }
            .text {
              flex: 1;
              padding-left: 10px;
              a:hover {
                text-decoration: underline;
              }
              p {
                width: 140px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 24px;
              }
              p:nth-child(1) {
                a {
                  font-size: 14px;
                  color: #000;
                }
              }
              p:nth-child(2) {
                em {
                  color: #999;
                }
                a {
                  color: #666;
                  margin: 0 2px 0 4px;
                  max-width: 100px;
                }
                img {
                  width: 13px;
                  height: 13px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
      .beSimilar {
        margin-top: 20px;
        ul {
          li {
            margin-top: 10px;
            .text {
              float: left;
              width: 156px;
              line-height: 16px;
              a:hover {
                text-decoration: underline;
              }
              .artist {
                a {
                  color: #999;
                }
              }
            }
            .f {
              float: right;
              a {
                float: left;
                margin-top: 10px;
                width: 10px;
                height: 11px;
                opacity: 0.7;
                background: url('../../assets/uploads/icon2.png') no-repeat 0 -99999999px;
              }
              a:hover {
                opacity: 1;
              }
              .play {
                background-position: -69px -455px;
                margin-right: 16px;
              }
              .add {
                background-position: -87px -454px;
              }
            }
          }
        }
      }
      .right__client {
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
