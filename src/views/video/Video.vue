<template>
  <div
    class="video__container w clearfix"
    v-loading="!videoDetail || !relevantVideo"
  >
    <div class="video__left" v-if="videoDetail">
      <div class="left__box">
        <!-- 标题 -->
        <div class="title clearfix">
          <h2>{{ videoDetail && videoDetail.title }}</h2>
          <p v-show="videoDetail">
            by<router-link
              :to="`/user/home?id=${videoDetail && videoDetail.creator.userId}`"
            >
              {{ videoDetail && videoDetail.creator.nickname }}</router-link
            >
          </p>
        </div>
        <!-- 视频组件 -->
        <SimpleVideo
          :currentSrc="videoUrl && videoUrl.urls[0].url"
          :definition="videoDetail && videoDetail.resolutions"
          @definition="definition"
          @load="load"
          @next="next"
          :name="videoDetail && videoDetail.title"
          :artistName="videoDetail && ' by ' + videoDetail.creator.nickname"
          :id="videoDetail && videoDetail.vid"
          :nextName="nextVideo && nextVideo.title"
          :nextId="nextVideo && nextVideo.vid"
          :liked="videoDetail && videoDetail.liked"
          @fabulous="fabulous($event.state, $event.id)"
        ></SimpleVideo>
        <!-- 功能按钮 -->
        <div class="fun">
          <a
            href="javascript:;"
            class="fabulous"
            @click="fabulous(videoDetail.liked, videoDetail.vid)"
            ><i
              ><em :class="videoDetail.liked ? 'already' : ''"></em>({{
                videoDetail.likedCount
              }})</i
            ></a
          >
          <a
            href="javascript:;"
            class="collection"
            @click="$message.warning('暂不支持此功能')"
            ><i>({{ videoDetail.subscribeCount }})</i></a
          >
          <a
            href="javascript:;"
            @click="$message.warning('暂不支持此功能')"
            class="share"
            ><i>({{ videoDetail.shareCount }})</i></a
          >
        </div>
        <!-- 评论 -->
        <div class="comment" ref="commentRef">
          <!-- 头部标题区域 -->
          <div class="comment__head">
            <h3>评论</h3>
            <span class="comment__count"
              >共{{ videoDetail.commentCount }}评论</span
            >
          </div>
          <!-- 评论 -->
          <Comment :id="videoDetail.vid" type="5"></Comment>
        </div>
      </div>
    </div>
    <div class="video__right" v-if="videoDetail && relevantVideo">
      <div class="right__box">
        <!-- 简介 -->
        <div class="desc">
          <h3>MV简介</h3>
          <div class="desc__box">
            <p>
              发布时间：{{
                dayjs(videoDetail.publishTime).format('YYYY-MM-DD')
              }}
            </p>
            <p>播放次数：{{ videoDetail.playTime | number_ch }}</p>
            <p class="txt" v-show="videoDetail.description">
              {{ videoDetail.description }}
            </p>
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="recommend">
          <h3>相关推荐</h3>
          <ul>
            <li v-for="item in relevantVideo" :key="item.vid">
              <div class="cover">
                <router-link :to="`/video?id=${item.vid}`">
                  <el-image :src="item.coverUrl + '?param=96y54'"></el-image>
                  <p><i></i>{{ item.playTime | number_ch }}</p>
                </router-link>
              </div>
              <div class="content">
                <p class="title">
                  <router-link
                    :to="`/video?id=${item.vid}`"
                    :title="item.title"
                    >{{ item.title }}</router-link
                  >
                </p>
                <p class="time">{{ dayjs(item.durationms).format('mm:ss') }}</p>
                <p class="user">
                  by
                  <router-link :to="`/user/home?id=${item.creator[0].userId}`"
                    >{{ item.creator[0].userName }}
                  </router-link>
                </p>
              </div>
            </li>
          </ul>
        </div>
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
import { resourcesLikeAPI } from '@/api/djradioAPI'
import SimpleVideo from '@/components/video/Video'
import Comment from '@/components/comment/Comment'
export default {
  name: 'videos',
  data() {
    return {}
  },
  methods: {
    ...mapActions('video', {
      getVideoDetail: 'getVideoDetail',
      getRelevantVideo: 'getRelevantVideo',
      getVideoUrl: 'getVideoUrl',
      getNextVideo: 'getNextVideo'
    }),
    ...mapMutations('video', {
      removeVideoAll: 'removeVideoAll'
    }),
    definition(res) {
      this.getNextVideo(this.id)
      this.getVideoUrl({ id: this.id, r: res.val.br })
    },
    load(res) {
      this.getVideoUrl({ id: this.id, r: res.val.br })
    },
    // 下一个
    next(id) {
      this.$router.push(`/video?id=${id}`)
    },
    // 点赞
    async fabulous(liked, id) {
      const formData = {
        type: 5,
        id,
        t: 1
      }
      if (liked) formData.t = 0
      const { data: result } = await resourcesLikeAPI(
        formData.id,
        formData.t,
        formData.type
      )
      if (result.code !== 200) return
      this.getVideoDetail(this.id)
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('video', {
      videoDetail: 'videoDetail',
      videoUrl: 'videoUrl',
      nextVideo: 'nextVideo',
      relevantVideo: 'relevantVideo'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        this.getVideoDetail(val)
        this.getRelevantVideo(val)
      }
    },
    'videoDetail.title': {
      handler(val) {
        if (val) {
          this.updateTitle(this.$route.meta, val, 1)
        }
      }
    }
  },
  components: {
    SimpleVideo,
    Comment
  },
  beforeDestroy() {
    this.removeVideoAll()
  }
}
</script>
<style lang="less" scoped>
.video__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .video__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
      .title {
        padding-top: 10px;
        margin-bottom: 8px;
        h2 {
          float: left;
          max-width: 100%;
          margin-top: -10px;
          margin-right: 8px;
          font-size: 24px;
          line-height: 32px;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          float: left;
          a {
            color: #0c73c2;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
      .fun {
        margin: 12px 0 45px;
        a {
          display: inline-block;
          margin-right: 10px;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding-right: 5px;
          background: url('../../assets/uploads/button2.png') no-repeat 0 -9999px;
          i {
            display: inline-block;
            height: 100%;
            padding: 0 7px 0 30px;

            background: url('../../assets/uploads/button2.png') no-repeat 0 -9999px;
          }
        }
        a:hover {
          background-position: right -1106px;
        }
        .fabulous {
          background-position: right -1020px;
          i {
            background-position: 0 -59px;
            padding: 0 7px 0 10px;
            em {
              display: inline-block;
              width: 17px;
              height: 15px;
              background: url('../../assets/uploads/button2.png') no-repeat 0 -95px;
              vertical-align: middle;
              margin: -3px 5px 0 0;
            }
            .already {
              background-position: -30px -95px;
            }
          }
          i:hover {
            background-position: 0 -141px;
          }
        }
        .collection {
          background-position: right -1106px;
          i {
            background-position: 0 -977px;
          }
          i:hover {
            background-position: 0 -1063px;
          }
          .already {
            background-position: 0 -3080px;
          }
          .already:hover {
            background-position: 0 -3180px;
          }
        }
        .share {
          background-position: right -1020px;
          i {
            background-position: 0 -1225px;
          }
          i:hover {
            background-position: 0 -1268px;
          }
        }
      }
      .comment {
        margin-top: 35px;
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
  .video__right {
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
      .desc {
        .desc__box {
          padding-bottom: 34px;
          line-height: 18px;
          color: #999;
          .txt {
            margin-top: 10px;
            color: #333;
          }
        }
      }
      .recommend {
        ul {
          li {
            width: 200px;
            margin-bottom: 15px;
            .cover {
              float: left;
              width: 96px;
              height: 54px;
              a {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                .el-image {
                  width: 100%;
                  height: 100%;
                }
                p {
                  position: absolute;
                  top: 0;
                  right: 0;
                  padding-right: 5px;
                  height: 20px;
                  line-height: 20px;
                  color: #fff;
                  box-sizing: border-box;
                  text-align: right;
                  text-shadow: -2px 1px rgb(0 0 0 / 40%);
                  i {
                    display: inline-block;
                    width: 15px;
                    height: 10px;
                    background: url('../../assets/uploads/icon2.png') no-repeat -60px -310px;
                    vertical-align: middle;
                    margin-top: -3px;
                    margin-right: 3px;
                  }
                }
              }
            }
            .content {
              margin-left: 105px;
              a:hover {
                text-decoration: underline;
              }
              .title {
                line-height: 21px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .time,
              .user {
                line-height: 16px;
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                a {
                  color: #999;
                }
              }
            }
          }
        }
      }
      .client {
        margin-top: 35px;
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
