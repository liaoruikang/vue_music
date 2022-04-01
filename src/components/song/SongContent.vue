<template>
  <div class="songContent__container" v-loading="!isShow">
    <div class="songContent__main" v-if="isShow">
      <div class="main__left">
        <el-image :src="songDetail.al.picUrl + '?param=130y130'"></el-image>
      </div>
      <div class="main__right">
        <!-- 名称 -->
        <div class="name">
          {{ songDetail.name }}
          <div class="sumtxt" v-if="songDetail.tns">
            {{ songDetail.tns[0] }}
          </div>
        </div>
        <!-- 歌手 -->
        <div class="text">
          <b>歌手：</b>
          <span v-for="(item, index) in songDetail.ar" :key="index">
            <router-link :to="`/artist?id=${item.id}`">{{
              item.name
            }}</router-link>
            {{ index !== songDetail.ar.length - 1 ? '/' : '' }}
          </span>
        </div>
        <!-- 专辑 -->
        <div class="text">
          <b>所属专辑：</b>
          <router-link :to="`/album?id=${songDetail.al.id}`">{{
            songDetail.al.name
          }}</router-link>
        </div>
        <!-- 按钮 -->
        <div class="f__btn">
          <a
            href="javascript:;"
            class="play"
            @click="$store.dispatch('getSongDetails', songDetail.id)"
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
              $store.dispatch('addSong', songDetail.id)
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
                songId: songDetail.id
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
                songId: songDetail.id,
                shareDetails: songDetail,
                type: 'song'
              })
            "
          >
            <em> 分享 </em>
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
        <!-- 歌词 -->
        <div class="lyric">
          <p
            v-for="(item, index) in lyric.slice(0, 13)"
            :key="index"
            v-html="item"
          ></p>
          <el-collapse-transition>
            <div class="open" v-show="isOpen">
              <p
                v-for="(item, index) in lyric.slice(13)"
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
    </div>
    <div class="songContent__comment" ref="commentRef" v-if="isShow">
      <!-- 头部标题区域 -->
      <div class="comment__head">
        <h3>评论</h3>
        <span class="comment__count">共{{ commentCount }}评论</span>
      </div>
      <!-- 评论 -->
      <Comment
        :id="songDetail.id || 0"
        type="0"
        @commentCount="commentCount = $event"
      ></Comment>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Comment from '@/components/comment/Comment'
export default {
  data() {
    return {
      isOpen: false,
      commentCount: 0
    }
  },
  computed: {
    ...mapState('song', {
      songDetail: 'songDetail',
      lyric: 'lyric'
    }),
    isShow() {
      if (this.songDetail && this.lyric) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Comment
  },
  watch: {
    songDetail: {
      deep: true,
      handler(val) {
        if (val) {
          this.updateTitle(this.$route.meta, val.name, 3)
        }
      }
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
  }
}
</script>
<style lang="less" scoped>
.songContent__container {
  min-height: 350px;
  .songContent__main {
    display: flex;
    margin-bottom: 60px;
    .main__left {
      position: relative;
      width: 206px;
      .el-image {
        width: 130px;
        height: 130px;
        margin: 34px;
      }
    }
    .main__left::before {
      content: '';
      position: absolute;
      width: 206px;
      height: 205px;
      top: -4px;
      left: -4px;
      background: url('../../assets/uploads/coverall.png') no-repeat -140px -580px;
      z-index: 999;
    }
    .main__right {
      flex: 1;
      padding-left: 20px;
      .name {
        font-size: 24px;
        .sumtxt {
          color: #bababa;
          font-size: 14px;
          margin-left: 67px;
        }
      }
      .name::before {
        content: '';
        display: inline-block;
        width: 54px;
        height: 24px;
        background: url('../../assets/uploads/icon.png') no-repeat 0 -463px;
        vertical-align: middle;
        margin-top: -5px;
        margin-right: 6px;
      }
      .text {
        margin: 10px 0;
        color: #999;
        b {
          font-weight: normal;
        }
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
      .lyric {
        margin-top: 35px;
        line-height: 23px;
        a:hover {
          text-decoration: underline;
        }
        a {
          color: #0c73c2;
        }
      }
    }
  }
  .songContent__comment {
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
