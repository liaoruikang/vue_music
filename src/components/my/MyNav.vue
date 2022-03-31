<template>
  <div class="myNav__container">
    <!-- 滚动条区域 -->
    <simple-scroll
      height="100%"
      hideShadow
      doubleClick
      scrollSpeed="20"
      openMonitor
    >
      <div class="menu my__singer" @click="$router.push('/my?id=singer')">
        <h2 :class="$route.query.id == 'singer' ? 'active' : null">
          我的歌手({{ total }})
        </h2>
      </div>
      <div class="menu my__playlist" v-if="uPlayList.length">
        <h2 @click="playlistState = !playlistState">
          <i :class="playlistState ? 'select' : ''"></i>
          创建的歌单({{ uPlayList.length }})
          <a href="javascript:;" @click.stop="newlyBuild">新建</a>
        </h2>
        <el-collapse-transition>
          <div class="playlist" v-show="playlistState">
            <ul>
              <li
                :class="$route.query.id == item.id ? 'active' : null"
                v-for="item in uPlayList"
                :key="item.id"
                @click="$router.push('/my?id=' + item.id + '&play=1')"
                v-active="{ id: item.id, type: 'playlist' }"
              >
                <el-image :src="item.coverImgUrl + '?param=40y40'"></el-image>
                <div class="text">
                  <span>{{ item.name }}</span>
                  <p>{{ item.trackCount }}首</p>
                  <div class="f" v-if="item.specialType !== 5">
                    <a
                      class="edit"
                      title="编辑"
                      href="javascript:;"
                      @click.stop="
                        $router.push(`/my/edit?id=${item.id}&name=${item.name}`)
                      "
                    ></a>
                    <a
                      class="remove"
                      title="删除"
                      href="javascript:;"
                      @click="deleteSongList(item.id)"
                    ></a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </div>
      <div class="menu my__collection" v-if="cPlayList.length">
        <h2 @click="collectionState = !collectionState">
          <i :class="collectionState ? 'select' : ''"></i>
          收藏的歌单({{ cPlayList.length }})
        </h2>
        <el-collapse-transition>
          <div class="collection" v-show="collectionState">
            <ul>
              <li
                :class="$route.query.id == item.id ? 'active' : null"
                v-for="item in cPlayList"
                :key="item.id"
                @click="$router.push('/my?id=' + item.id)"
                v-active="{ id: item.id, type: 'collection' }"
              >
                <el-image :src="item.coverImgUrl + '?param=40y40'"></el-image>
                <div class="text">
                  <span>{{ item.name }}</span>
                  <p>{{ item.trackCount }}首 by {{ item.creator.nickname }}</p>
                  <div class="f">
                    <a
                      class="remove"
                      title="删除"
                      @click="deleteCollection(item.id)"
                      href="javascript:;"
                    ></a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </div>
    </simple-scroll>
  </div>
</template>
<script>
import { simpleScroll } from 'vue-simple-scroll-plugin'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'myNav',
  props: ['total'],
  data() {
    return {
      // 歌单下拉状态
      playlistState: false,
      collectionState: false
    }
  },
  components: { simpleScroll },
  computed: {
    ...mapGetters('collection', {
      uPlayList: 'uPlayList',
      cPlayList: 'cPlayList'
    }),
    ...mapState('user', {
      userId: 'userId'
    })
  },
  methods: {
    // 新建歌单
    newlyBuild() {
      this.$store.commit('setCFDVisible', {
        display: true,
        component: 'Collection',
        isAdd: true
      })
    },
    // 取消收藏
    async deleteCollection(id) {
      const confirm = await this.$confirm('确定取消收藏歌单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirm === 'confirm') {
        this.$store
          .dispatch('collection/shoucangPlaylist', { t: 2, id })
          .then(() => {
            this.$store.dispatch('collection/getUserPlayList', this.userId)
          })
      }
    },
    // 删除用户歌单
    async deleteSongList(id) {
      const confirm = await this.$confirm('确定删除歌单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirm === 'confirm') {
        this.$store.dispatch('my/deletePlayList', id).then(() => {
          this.$store.dispatch('collection/getUserPlayList', this.userId)
        })
      }
    }
  },
  directives: {
    active: {
      inserted(el, { value }, vnode) {
        const id = parseInt(vnode.context.$route.query.id)
        if (value.id === id) {
          if (value.type === 'playlist') {
            vnode.context.playlistState = true
          } else {
            vnode.context.collectionState = true
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.myNav__container {
  height: 100%;
  .menu {
    position: relative;
    line-height: 36px;
    h2 {
      position: relative;
      padding: 0 5px 2px 35px;
      color: #000;
      font-family: simsun, \5b8b\4f53;
      font-size: 14px;
      cursor: pointer;
      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        border: 8px solid #ccc;
        border-color: transparent transparent transparent #ccc;
        border-style: dashed dashed dashed solid;
        margin-right: 0;
        transition: all 0.1s;
        transform-origin: 8px 4px;
      }
    }
    .select {
      transform: rotate(90deg);
    }
    .playlist,
    .collection {
      ul {
        li {
          display: flex;
          height: 40px;
          padding: 6px 0 6px 20px;
          cursor: pointer;
          .el-image {
            width: 40px;
            height: 40px;
          }
          .text {
            position: relative;
            flex: 1;
            padding-left: 10px;
            line-height: 18px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            p {
              margin-top: 6px;
              color: #999;
            }
            .f {
              display: none;
              position: absolute;
              bottom: 0;
              right: 0;
              a {
                float: left;
                margin-right: 10px;
                width: 13px;
                height: 13px;
                background: url('../../assets/uploads/icon.png') no-repeat 0 -270px;
              }
              .remove {
                background-position: 0 -284px;
              }
            }
          }
        }
        li:hover {
          background-color: #f4f2f2;
          .f {
            display: block;
            .edit:hover {
              background-position: -20px -270px;
            }
            .remove:hover {
              background-position: -20px -284px;
            }
          }
        }
      }
    }
  }
  .my__singer {
    margin-top: 40px;
    h2:hover {
      background: #eee;
    }
  }
  .my__playlist {
    h2 {
      a {
        float: right;
        width: 52px;
        height: 22px;
        margin-top: 8px;
        margin-right: 5px;
        background: url('../../assets/uploads/button.png') no-repeat 0 -96px;
        color: #515151;
        font-size: 12px;
        font-weight: normal;
        line-height: 22px;
        text-indent: 20px;
      }
      a:hover {
        background-position: -94px -39px;
      }
    }
  }
  .my__collection {
    margin-bottom: 60px;
  }
  .active {
    background: #eee !important;
  }
}
</style>
