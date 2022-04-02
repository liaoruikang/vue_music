<template>
  <div class="album__container w clearfix">
    <div class="album__left">
      <div class="left__box">
        <AlbumContent></AlbumContent>
      </div>
    </div>
    <div class="album__right">
      <div class="album__box">
        <!-- <div class="album__beSimilar">
          <h3>喜欢这张专辑的人</h3>
          <ul>
            <li>
              <router-link :to="`/user/home?id=${456}`">
                <el-image :src="456 + '?param=40y40'" :title="456"></el-image>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="album__hot">
          <h3>
            Ta的其他热门专辑
            <router-link
              :to="`/artist/album?id=${albumDetail.album.artist.id}`"
            >
              全部></router-link
            >
          </h3>
          <ul>
            <li>
              <router-link :to="`/album?id=${456}`">
                <el-image :src="564 + '?param=50y50'"></el-image>
              </router-link>
              <div class="text">
                <p>
                  <router-link :to="`/album?id=${456}`">
                    <span>{{ 456 }}</span>
                  </router-link>
                </p>
                <p>
                  <em>by</em>
                  <router-link :to="`/user/home?id=${456}`">
                    <span>{{ 456 }}</span>
                  </router-link>
                </p>
              </div>
            </li>
          </ul>
        </div> -->
        <div class="album__client">
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
import AlbumContent from '@/components/album/AlbumContent'
export default {
  name: 'album',
  data() {
    return {}
  },
  created() {},
  methods: {
    ...mapActions('album', {
      getAlbumDetail: 'getAlbumDetail'
    }),
    ...mapMutations('album', {
      removeAll: 'removeAll'
    })
  },
  computed: {
    // 获取query参数id
    id() {
      return this.$route.query.id
    },
    ...mapState('album', {
      // 专辑详情数据
      albumDetail: 'albumDetail'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          // 获取专辑详情数据
          this.getAlbumDetail(val)
        }
      }
    },
    albumDetail: {
      deep: true,
      handler(val) {
        if (val) {
          // 更新网页标题
          this.updateTitle(this.$route.meta, val.album.artist.name, 3)
          this.updateTitle(this.$route.meta, val.album.name, 4)
        }
      }
    }
  },
  components: { AlbumContent },
  beforeDestroy() {
    this.removeAll()
  }
}
</script>
<style lang="less" scoped>
.album__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .album__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
    }
  }
  .album__right {
    float: right;
    width: 270px;
    .album__box {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-size: 12px;
        a {
          float: right;
          font-weight: normal;
          color: #666;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      // .album__beSimilar {
      //   ul {
      //     display: flex;
      //     flex-wrap: wrap;
      //     li {
      //       width: 40px;
      //       height: 40px;
      //       margin: 5px;
      //       a:hover {
      //         text-decoration: underline;
      //       }
      //       .el-image {
      //         width: 40px;
      //         height: 40px;
      //       }
      //       p {
      //         margin-top: 2px;
      //         text-align: center;
      //         overflow: hidden;
      //         white-space: nowrap;
      //         text-overflow: ellipsis;
      //       }
      //     }
      //   }
      // }
      // .album__hot {
      //   margin-top: 20px;
      //   ul {
      //     li {
      //       display: flex;
      //       margin-bottom: 10px;
      //       .el-image {
      //         width: 50px;
      //         height: 50px;
      //       }
      //       .text {
      //         flex: 1;
      //         padding-left: 10px;
      //         a:hover {
      //           text-decoration: underline;
      //         }
      //         p {
      //           width: 140px;
      //           overflow: hidden;
      //           text-overflow: ellipsis;
      //           white-space: nowrap;
      //           line-height: 24px;
      //         }
      //         p:nth-child(1) {
      //           a {
      //             font-size: 14px;
      //             color: #000;
      //           }
      //         }
      //         p:nth-child(2) {
      //           em {
      //             color: #999;
      //           }
      //           a {
      //             color: #666;
      //             margin: 0 2px 0 4px;
      //             max-width: 100px;
      //           }
      //           img {
      //             width: 13px;
      //             height: 13px;
      //             vertical-align: middle;
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      .album__client {
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
