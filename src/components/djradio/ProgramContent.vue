<template>
  <div class="programContent__container" v-loading="!programDetail">
    <div class="programContent__head" v-if="programDetail">
      <div class="head__top">
        <div class="top__left">
          <el-image :src="programDetail.coverUrl + '?param=140y140'"></el-image>
        </div>
        <div class="top__right">
          <div class="name">
            <i></i>
            <h3>{{ programDetail.name }}</h3>
          </div>
          <div class="dj clearfix">
            <div class="djname">
              <i></i>
              <router-link :to="`/djradio?id=${programDetail.radio.id}`">{{
                programDetail.radio.name
              }}</router-link>
            </div>
            <div class="sub">
              <a
                href="javascript:;"
                @click="sub(programDetail.radio.subed, programDetail.radio.id)"
              >
                <i>
                  <em :class="programDetail.radio.subed ? 'already' : ''"></em
                  >{{
                    `${programDetail.radio.subed ? '已订阅' : '订阅'}(${
                      programDetail.radio.subCount
                    })`
                  }}
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="head__bottom">
        <div class="fun">
          <a
            href="javascript:;"
            class="play"
            @click="$store.dispatch('getRadioDetails', programDetail.id)"
            ><i
              >播放
              {{ dayjs(programDetail.mainSong.duration).format('mm分ss秒') }}</i
            ></a
          >
          <a
            href="javascript:;"
            class="fabulous"
            @click="fabulous(programDetail.liked, programDetail.id)"
            ><i
              ><em :class="programDetail.liked ? 'already' : ''"></em>({{
                programDetail.likedCount
              }})</i
            ></a
          >
          <a href="javascript:;" @click="anchorPoint" class="comment"
            ><i>({{ programDetail.commentCount }})</i></a
          >
          <a
            href="javascript:;"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Forward',
                songId: programDetail.id,
                shareDetails: programDetail,
                type: 'djprogram'
              })
            "
            class="share"
            ><i>({{ programDetail.shareCount }})</i></a
          >
          <a
            href="javascript:;"
            class="download"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Client'
              })
            "
            ><i>下载</i></a
          >
        </div>
        <div class="category">
          <router-link
            :to="`/discover/djradio/category?id=${programDetail.categoryId}&name=${programDetail.categoryName}`"
            class="cat"
            >创作翻唱</router-link
          >
          <span class="name">{{ programDetail.name }}</span>
          <span class="createTime"
            >{{
              dayjs(programDetail.createTime).format('YYYY-MM-DD')
            }}创建</span
          >
          <span class="time"
            >播放：<em>{{ programDetail.listenerCount }}</em
            >次</span
          >
        </div>
        <p class="desc">
          <span
            class="up"
            v-html="
              `介绍：${programDetail.description
                .substr(0, 170)
                .replace(/\n/g, '<br/>')}...`
            "
            v-show="!isOpen && programDetail.description.length > 170"
          ></span>
          <span
            class="down"
            v-html="
              '介绍：' + programDetail.description.replace(/\n/g, '<br />')
            "
            v-show="isOpen || programDetail.description.length < 170"
          ></span>
        </p>
        <div class="open" v-if="programDetail.description.length > 170">
          <a href="javascript:;" class="open" @click="isOpen = !isOpen"
            >{{ isOpen ? '收起' : '展开'
            }}<i :class="isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="programContent__body" v-if="programDetail">
      <!-- 表格 -->
      <div class="table" v-if="programDetail.songs.length > 0">
        <div class="table__head">
          <strong>节目包含歌曲列表</strong>
          <span>{{ `（${programDetail.songs.length}首歌）` }}</span>
          <a href="javascript:;" @click="tableIsOpen = !tableIsOpen"
            >{{ tableIsOpen ? '收起' : '展开'
            }}<i
              :class="tableIsOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i
          ></a>
        </div>
        <el-collapse-transition>
          <div class="table__body" v-show="tableIsOpen">
            <div
              :class="['item', index % 2 ? 'even' : '']"
              v-for="(item, index) in programDetail.songs"
              :key="item.id"
            >
              <div class="index">
                {{ index + 1 }}
                <a
                  href="javascript:;"
                  @click="$store.dispatch('getSongDetails', item.id)"
                  :class="[
                    'play',
                    currentPlay && currentPlay.id === item.id
                      ? 'currentPlay'
                      : ''
                  ]"
                ></a>
              </div>
              <div class="name">
                <router-link :to="`/song?id=${item.id}`">{{
                  item.name || '未知'
                }}</router-link>
                <span v-if="item.transName"> - ({{ item.transName }})</span>
                <router-link
                  v-if="item.mvid"
                  class="mv"
                  :to="`/mv?id=${item.mvid}`"
                ></router-link>
              </div>
              <div class="time">
                <span>{{ dayjs(item.duration).format('mm:ss') }}</span>
                <div class="f clearfix">
                  <a
                    href="javascript:;"
                    class="add"
                    @click="
                      $store.dispatch('addSong', item.id)
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
                        songId: item.id
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
                        songId: item.id,
                        shareDetails: item,
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
                </div>
              </div>
              <div class="user">
                <span v-for="(val, i) in item.artists" :key="val.id">
                  <router-link :to="`/artist?id=${val.id}`">{{
                    val.name
                  }}</router-link
                  >{{ i === item.artists.length - 1 ? '' : '/' }}
                </span>
              </div>
              <div class="album" v-if="item.album">
                <router-link :to="`/album?id=${item.album.id}`">
                  {{ item.album.name }}
                </router-link>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <!-- 评论 -->
      <div class="comment" ref="commentRef">
        <!-- 头部标题区域 -->
        <div class="comment__head">
          <h3>评论</h3>
          <span class="comment__count"
            >共{{ programDetail.commentCount }}评论</span
          >
        </div>
        <!-- 评论 -->
        <Comment :id="programDetail.id" type="4"></Comment>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { subDjAPI, resourcesLikeAPI } from '@/api/djradioAPI'
import Bus from '@/plugin/eventBus'
import Comment from '@/components/comment/Comment'
export default {
  name: 'programContent',
  data() {
    return {
      tableIsOpen: true,
      isOpen: false
    }
  },
  computed: {
    ...mapState('djradio', {
      programDetail: 'programDetail'
    }),
    ...mapState('user', {
      isLogin: 'isLogin'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    })
  },
  methods: {
    // 订阅
    async sub(subed, rid) {
      if (!this.isLogin) return Bus.$emit('Visible', true)
      const subForm = {
        rid,
        t: subed ? 0 : 1
      }
      if (!subForm.t) {
        const confirm = await this.$confirm('确定取消订阅？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err) => err)
        if (confirm !== 'confirm') return
      }
      const { data: result } = await subDjAPI(subForm.rid, subForm.t)
      if (result.code !== 200) return this.$message.error('订阅失败')
      this.$emit('sub')
    },
    // 节目点赞
    async fabulous(liked, id) {
      const formData = {
        type: 4,
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
      this.$emit('sub')
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
  components: {
    Comment
  }
}
</script>
<style lang="less" scoped>
.programContent__container {
  min-height: 700px;
  .programContent__head {
    .head__top {
      display: flex;
      .top__left {
        width: 140px;
        height: 140px;
        padding: 3px;
        border: 1px solid #d5d5d5;
      }
      .top__right {
        flex: 1;
        padding-left: 20px;
        .name {
          padding-top: 18px;
          margin-bottom: 29px;
          i {
            float: left;
            width: 73px;
            height: 24px;
            background: url('../../assets/uploads/icon2.png') no-repeat 0 -75px;
          }
          h3 {
            margin-left: 80px;
            line-height: 24px;
            font-size: 20px;
            font-weight: normal;
          }
        }
        .dj {
          .djname {
            float: left;
            padding-top: 2px;
            i {
              display: inline-block;
              width: 16px;
              height: 17px;
              background: url('../../assets/uploads/icon2.png') no-repeat -50px -20px;
              vertical-align: middle;
              margin-top: -3px;
              margin-right: 3px;
            }
            a {
              font-size: 16px;
              color: #666;
            }
            a:hover {
              text-decoration: underline;
            }
          }
          .sub {
            float: left;
            margin-left: 17px;
            a {
              display: inline-block;
              padding: 0 5px 0 0;
              background: url('../../assets/uploads/button2.png') no-repeat
                right -2400px;
              i {
                display: inline-block;
                padding: 0 10px;
                height: 28px;
                min-width: 23px;
                line-height: 29px;
                background: url('../../assets/uploads/button2.png') no-repeat 0 -2370px;
                em {
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  background: url('../../assets/uploads/icon2.png') no-repeat -50px
                    0;
                  vertical-align: middle;
                  margin: -3px 5px 0 0;
                }
                .already {
                  background-position: -70px 0;
                }
              }
            }
            a:hover {
              background-position: right -2470px;
              i {
                background-position: 0 -2440px;
              }
            }
          }
        }
      }
    }
    .head__bottom {
      margin-top: 20px;
      .fun {
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
        .play {
          color: #fff;
          background-position: right -676px;
          i {
            background-position: 0 -633px;
            padding: 0 7px 0 36px;
          }
        }
        .play:hover {
          background-position: right -762px;
          i {
            background-position: 0 -719px;
          }
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
        .comment {
          background-position: right -1020px;
          i {
            background-position: 0 -1465px;
          }
          i:hover {
            background-position: 0 -1508px;
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
        .download {
          background-position: right -1020px;
          i {
            background-position: 0 -2761px;
          }
          i:hover {
            background-position: 0 -2805px;
          }
        }
      }
      .category {
        margin-top: 25px;
        height: 35px;
        line-height: 35px;
        .cat {
          display: inline-block;
          height: 16px;
          padding: 0 6px;
          border: 1px solid #cc0000;
          line-height: 16px;
          color: #cc0000;
          font-size: 12px;
        }
        .cat:hover {
          background: #fbeeee;
        }
        .name {
          margin: 0 10px;
          font-size: 14px;
          font-weight: 700;
        }
        .createTime,
        .time {
          margin-left: 18px;
          color: #999;
        }
        .time {
          em {
            color: #c20c0c;
          }
        }
      }
      .desc {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        .cat {
          display: inline-block;
          border: 1px solid #cc0000;
          height: 16px;
          padding: 0 6px;
          color: #cc0000;
          margin-right: 7px;
        }
        .cat:hover {
          background: #fbeeee;
        }
      }
      .open {
        a {
          float: right;
          color: #0c73c2;
        }
      }
    }
  }
  .programContent__body {
    margin-top: 27px;
    .table {
      border: 1px solid #d9d9d9;
      .table__head {
        padding: 0 10px;
        background: #f7f7f7;
        height: 32px;
        line-height: 33px;
        span {
          color: #666;
        }
        a {
          float: right;
          height: 0;
        }
      }
      .table__body {
        border-top: 1px solid #d9d9d9;
        .item {
          display: flex;
          .index,
          .name,
          .time,
          .user,
          .album {
            padding: 6px 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .index {
            width: 54px;
            padding-left: 15px;
            color: #999;
            .play {
              float: right;
              width: 17px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
            }
            .play:hover {
              background-position: 0 -128px;
            }
            .currentPlay {
              background-position: -20px -128px;
            }
          }
          .name {
            width: 238px;
            span {
              color: #aeaeae;
            }
            .mv {
              display: inline-block;
              width: 23px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -151px;
              vertical-align: middle;
              margin: -2px 0 0 3px;
            }
            a:hover {
              text-decoration: underline;
            }
          }
          .time {
            width: 79px;
            span {
              color: #666;
            }
            .f {
              display: none;
              a {
                float: left;
                width: 18px;
                height: 16px;
                background: url('../../assets/uploads/table.png') no-repeat;
                margin-left: 3px;
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
          .user {
            width: 70px;
          }
          .album {
            flex: 1;
          }
          .user,
          .album {
            a:hover {
              text-decoration: underline;
            }
          }
        }
        .even {
          background-color: #f7f7f7;
        }
        .item:hover {
          .time {
            span {
              display: none;
            }
            .f {
              display: block;
            }
          }
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
</style>
