<template>
  <div class="list__container">
    <!-- 头部 -->
    <FloorHeader hash="/discover/toplist">榜单</FloorHeader>
    <!-- 主体区域 -->
    <div class="list__box">
      <div
        class="list__box__item"
        v-for="item in topThreeListdetail"
        :key="item.id"
      >
        <div class="list__box__top">
          <router-link
            class="top__link"
            :to="`/discover/toplist?id=${item.id}`"
          >
            <el-image
              class="top__img"
              :src="item.coverImgUrl + '?param=80y80'"
              lazy
            >
            </el-image>
            <div class="shadow"></div>
          </router-link>
          <div class="top__text">
            <h3>
              <router-link :to="`/discover/toplist?id=${item.id}`">{{
                item.name
              }}</router-link>
            </h3>
            <a
              class="play"
              href="javascript:;"
              title="播放"
              @click="$store.dispatch('getsongsDetails', item.id)"
            ></a>
            <a
              class="collection"
              href="javascript:;"
              title="收藏"
              @click="shoucang({ t: 1, id: item.id })"
            ></a>
          </div>
        </div>
        <ul class="list__box__table">
          <li v-for="(val, i) in item.tracks" :key="val.id">
            <em :style="{ color: i < 3 ? '#c10d0c' : '#666' }">{{ i + 1 }}</em>
            <div class="table__box">
              <router-link class="title" :to="`/song?id=${val.id}`">
                {{ val.name }}
              </router-link>
            </div>
            <div class="table__f">
              <a
                class="song__play"
                href="javascript:;"
                @click="$store.dispatch('getSongDetails', val.id)"
              ></a>
              <a
                class="add__list"
                href="javascript:;"
                @click="
                  () => {
                    $store.dispatch('addSong', val.id)
                    $message.success('添加成功')
                  }
                "
              ></a>
              <a
                class="collection"
                href="javascript:;"
                @click="
                  $store.commit('setCFDVisible', {
                    display: true,
                    component: 'Collection',
                    songId: val.id
                  })
                "
              ></a>
            </div>
          </li>
          <li>
            <router-link :to="`/discover/toplist?id=${item.id}`"
              >查看全部></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'list',
  data() {
    return {}
  },
  created() {},
  methods: {
    ...mapActions('collection', {
      shoucangPlaylist: 'shoucangPlaylist'
    }),
    async shoucang(val) {
      const { data: result } = await this.shoucangPlaylist(val).catch((err) => {
        return err.response
      })
      if (result.code !== 200) return this.$message.error('此歌单已收藏')
      this.$message.success('收藏成功')
    }
  },
  components: {
    FloorHeader: () => import('./FloorHeader.vue')
  },
  beforeDestroy() {
    // 当组件销毁时 将前三条的榜单数据清空
    this.$store.commit('list/removeTopThreeListdetail')
  },
  computed: {
    ...mapState('list', {
      topThreeListdetail: 'topThreeListdetail'
    })
  }
}
</script>
<style lang="less" scoped>
a:hover {
  text-decoration: underline;
}
.list__container {
  .list__box {
    display: flex;
    height: 472px;
    background: url('../../assets/uploads/index_bill.png') no-repeat;
    .list__box__item {
      flex: 1;
      height: 100%;
      .list__box__top {
        height: 100px;
        width: 210px;
        padding: 20px 0 0 20px;
        .top__link {
          position: relative;
          float: left;
          .shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            background: url('../../assets/uploads/coverall.png') no-repeat -145px -57px;
          }
          .top__img {
            width: 80px;
            height: 80px;
          }
        }
        .top__text {
          float: left;
          margin: 6px 0 0 10px;
          h3 {
            font-size: 14px;
          }
          .collection,
          .play {
            display: inline-block;
            width: 22px;
            height: 22px;
            background: url('../../assets/uploads/index.png') no-repeat;
            margin-right: 10px;
            margin-top: 5px;
          }
          .collection {
            background-position: -300px -205px;
          }
          .collection:hover {
            background-position: -300px -235px;
          }
          .play {
            background-position: -267px -205px;
          }
          .play:hover {
            background-position: -267px -235px;
          }
        }
      }
      .list__box__table {
        li {
          display: flex;
          margin-left: 15px;
          height: 32px;
          line-height: 32px;
          em {
            width: 35px;
            height: 32px;
            font-size: 16px;
            text-align: center;
          }
          .table__box {
            width: 0;
            flex: 1;
            .title {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .table__f {
            display: none;
            margin-top: 7.5px;
            a {
              float: left;
              width: 17px;
              height: 17px;
              margin-right: 10px;
              background: url('../../assets/uploads/index.png') no-repeat;
            }
            .song__play {
              background-position: -267px -268px;
            }
            .song__play:hover {
              background-position: -267px -288px;
            }
            .add__list {
              background: url('../../assets/uploads/icon.png') no-repeat;
              background-position: 0 -698px;
            }
            .add__list:hover {
              background-position: -22px -698px;
            }
            .collection {
              background-position: -297px -268px;
            }
            .collection:hover {
              background-position: -297px -288px;
            }
          }
        }
        li:hover .table__f {
          display: block;
        }
        li:last-child {
          padding-left: 130px;
        }
      }
    }
  }
}
</style>
