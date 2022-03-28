<template>
  <div class="ranking__container" v-if="record">
    <div class="ranking__head">
      <h3>听歌排行</h3>
      <el-tooltip
        content="实际播放时间过短的歌曲将不纳入计算。"
        placement="bottom"
        effect="light"
      >
        <i class="el-icon-info"></i>
      </el-tooltip>

      <a href="javascript:;"></a>
      <div class="nav">
        <a href="javascript:;" :class="type ? 'select' : ''" @click="type = 1"
          >最近一周</a
        >&nbsp; | &nbsp;
        <a href="javascript:;" :class="!type ? 'select' : ''" @click="type = 0"
          >所有时间</a
        >
      </div>
    </div>
    <div class="ranking__box">
      <div class="box" v-if="type && record.weekData.length">
        <div
          :class="['item', index % 2 ? 'even' : '']"
          v-for="(item, index) in record.weekData"
          :key="index"
        >
          <div class="index">{{ index + 1 }}.</div>
          <div
            :class="[
              'play',
              currentPlay.id === item.song.id ? 'currentPlay' : ''
            ]"
            @click="$store.dispatch('getSongDetails', item.song.id)"
          ></div>
          <div class="name">
            <router-link :to="$route.fullPath">{{
              item.song.name
            }}</router-link>
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <em v-for="(val, i) in item.song.ar" :key="i">
              <router-link :to="`artist?id=${val.id}`">
                {{ val.name }}
              </router-link>
              {{ i !== item.song.ar.length - 1 ? '/' : '' }}
            </em>
          </div>
          <div class="fun">
            <a
              href="javascript:;"
              class="add"
              @click="
                $store.dispatch('addSong', item.song.id)
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
                  songId: item.song.id
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
                  songId: item.song.id,
                  shareDetails: item.song,
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
          <div class="count">
            <em v-if="id == userId">{{ item.playCount + '次' }}</em>
            <el-progress
              :percentage="item.score"
              :show-text="false"
            ></el-progress>
          </div>
        </div>
      </div>
      <div class="box" v-if="!type && record.allData.length">
        <div
          :class="['item', index % 2 ? 'even' : '']"
          v-for="(item, index) in record.allData.slice(0, 10)"
          :key="index"
        >
          <div class="index">{{ index + 1 }}.</div>
          <div
            class="play"
            @click="$store.dispatch('getSongDetails', item.song.id)"
          ></div>
          <div class="name">
            <router-link :to="$route.fullPath">{{
              item.song.name
            }}</router-link>
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <em v-for="(val, i) in item.song.ar" :key="i">
              <router-link :to="`artist?id=${val.id}`">
                {{ val.name }}
              </router-link>
              {{ i !== item.song.ar.length - 1 ? '/' : '' }}
            </em>
          </div>
          <div class="fun">
            <a
              href="javascript:;"
              class="add"
              @click="
                $store.dispatch('addSong', item.song.id)
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
                  songId: item.song.id
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
                  songId: item.song.id,
                  shareDetails: item.song,
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
          <div class="count">
            <em v-if="id == userId">{{ item.playCount + '次' }}</em>
            <el-progress
              :percentage="item.score"
              :show-text="false"
            ></el-progress>
          </div>
        </div>
      </div>
      <!-- 未找到 -->
      <div
        class="empty"
        v-if="record && record.weekData && !record.weekData.length"
      >
        <h3><i></i>暂无听歌记录</h3>
      </div>
      <div
        class="empty"
        v-if="record && record.allData && !record.allData.length"
      >
        <h3><i></i>暂无听歌记录</h3>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'ranking',
  data() {
    return {
      type: 1
    }
  },
  methods: {
    ...mapActions('user', {
      getRecord: 'getRecord'
    }),
    ...mapMutations('user', {
      reomveRecord: 'reomveRecord'
    })
  },
  watch: {
    type(val) {
      this.reomveRecord()
      this.getRecord({ uid: this.$route.query.id, type: val })
    },
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.reomveRecord()
          this.type = parseInt(val) === this.userId ? 1 : 0
          this.getRecord({ uid: val, type: this.type })
        }
      }
    }
  },
  computed: {
    ...mapState('user', {
      record: 'record',
      userId: 'userId'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),
    id() {
      return this.$route.query.id || 0
    }
  }
}
</script>
<style lang="less" scoped>
.ranking__container {
  .ranking__head {
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    color: #666;
    line-height: 33px;
    h3 {
      display: inline-block;
      font-size: 20px;
      font-weight: normal;
    }
    i {
      font-size: 18px;
      vertical-align: middle;
      margin: 0 5px;
      margin-top: -2px;
    }
    .nav {
      float: right;
      .select {
        color: #000;
        font-weight: 700;
      }
    }
  }
  .ranking__box {
    .box {
      border: 1px solid #e2e2e2;
    }
    .item {
      display: flex;
      align-items: center;
      height: 38px;
      a:hover {
        text-decoration: underline;
      }
      .index {
        width: 40px;
        text-align: right;
        font-size: 16px;
        color: #666;
        padding-right: 10px;
        margin-top: 2px;
      }
      .play {
        width: 17px;
        height: 17px;
        background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
        cursor: pointer;
        margin: 0 10px 0 0;
      }
      .play:hover {
        background-position: 0 -128px;
      }
      .currentPlay {
        background-position: -20px -128px;
      }
      .name {
        flex: 15;
        > a {
          font-weight: bold;
        }
        em {
          a {
            color: #aeaeae;
          }
        }
      }
      .fun {
        flex: 4;

        a {
          display: none;
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
      .count {
        flex: 12;
        position: relative;
        /deep/ .el-progress-bar {
          .el-progress-bar__outer {
            height: 38px !important;
            border-radius: 0;
            background-color: transparent;
            .el-progress-bar__inner {
              background-color: #6bc4fc;
              border-radius: 0;
              opacity: 0.2;
            }
          }
        }
        em {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .item:hover {
      background: #eeeeee;
      .fun {
        a {
          display: inline-block;
        }
      }
    }
    .even {
      background-color: #f7f7f7;
    }
    .empty {
      padding: 105px 0 105px 0;
      text-align: center;
      h3 {
        font-size: 18px;
        i {
          display: inline-block;
          width: 64px;
          height: 50px;
          margin-right: 17px;
          background: url('../../assets/uploads/icon.png') no-repeat 0 -347px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
