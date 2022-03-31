<template>
  <div class="playlist__container w clearfix">
    <div class="playlist__left">
      <div class="left__box">
        <!-- 内容区域 -->
        <playlistContent></playlistContent>
      </div>
    </div>
    <div class="playlist__right" v-if="subscribers && related">
      <div class="playlist__box">
        <div class="playlist__beSimilar">
          <h3>相似歌手</h3>
          <ul>
            <li v-for="item in subscribers.subscribers" :key="item.id">
              <router-link :to="`/playlist?id=${item.id}`">
                <el-image
                  :src="item.avatarUrl + '?param=40y40'"
                  :title="item.nickname"
                ></el-image>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="playlist__hot">
          <h3>热门歌单</h3>
          <ul>
            <li v-for="item in related.playlists" :key="item.id">
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
        <div class="playlist__client">
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
import playlistContent from '@/components/playlist/playlistContent'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'playlist',
  data() {
    return {}
  },
  created() {},
  methods: {
    ...mapMutations('playlist', {
      removeAll: 'removeAll'
    }),
    ...mapActions('playlist', {
      getSubscribers: 'getSubscribers',
      getPlaylist: 'getPlaylist',
      getRelated: 'getRelated'
    })
  },
  components: {
    playlistContent
  },
  beforeDestroy() {
    this.removeAll()
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('playlist', {
      subscribers: 'subscribers',
      related: 'related'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        this.getPlaylist({ id: val, ist: true })
        this.getSubscribers({ id: val, limit: 8 })
        this.getRelated(val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.playlist__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .playlist__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 47px 30px 40px 39px;
      margin-right: 270px;
    }
  }
  .playlist__right {
    float: right;
    width: 270px;
    .playlist__box {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-size: 12px;
      }
      .playlist__beSimilar {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 40px;
            height: 40px;
            margin: 5px;
            a:hover {
              text-decoration: underline;
            }
            .el-image {
              width: 40px;
              height: 40px;
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
      .playlist__hot {
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
      .playlist__client {
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
