<template>
  <div class="djradioContent__container">
    <div class="djradioContent__head" v-if="djDetail">
      <div class="head__left">
        <el-image :src="djDetail.data.picUrl + '?param=200y200'"></el-image>
      </div>
      <div class="head__right">
        <div class="name clearfix">
          <i></i>
          <h3>{{ djDetail.data.name }}</h3>
        </div>
        <div class="user">
          <router-link :to="`/user/home?id=${djDetail.data.dj.userId}`">
            <el-image
              :src="djDetail.data.dj.avatarUrl + '?param=35y35'"
            ></el-image>
          </router-link>
          <span>
            <router-link :to="`/user/home?id=${djDetail.data.dj.userId}`">{{
              djDetail.data.dj.nickname
            }}</router-link>
            <img
              v-if="djDetail.data.dj.avatarDetail"
              :src="djDetail.data.dj.avatarDetail.identityIconUrl"
            />
          </span>
        </div>
        <div class="fun">
          <a
            href="javascript:;"
            :class="djDetail.data.subed ? 'already' : 'sub'"
            @click="sub(djDetail.data.subed, djDetail.data.id)"
            ><i>{{
              `${djDetail.data.subed ? '已订阅' : '订阅'}(${
                djDetail.data.subCount
              })`
            }}</i></a
          >
          <a
            href="javascript:;"
            class="playAll"
            @click="
              playAll({
                rid: djDetail.data.id,
                limit: 99999
              })
            "
            ><i>播放全部</i></a
          >
          <a
            href="javascript:;"
            class="share"
            @click="
              $store.commit('setCFDVisible', {
                display: true,
                component: 'Forward',
                songId: djDetail.data.id,
                shareDetails: djDetail.data,
                type: 'djradio'
              })
            "
            ><i>分享</i></a
          >
        </div>
        <p class="desc">
          <router-link
            class="cat"
            :to="`/discover/djradio/category?id=${djDetail.data.categoryId}&name=${djDetail.data.category}`"
            >{{ djDetail.data.category }}</router-link
          >
          <span
            v-html="
              djDetail.data.desc.replace(/\n/g, '<br/>').substr(0, 160) + '...'
            "
            v-show="!isOpen && djDetail.data.desc.length > 160"
          ></span>
          <span
            v-html="djDetail.data.desc.replace(/\n/g, '<br />')"
            v-show="isOpen || djDetail.data.desc.length < 160"
          ></span>
        </p>
        <div class="open" v-if="djDetail.data.desc.length > 160">
          <a href="javascript:;" class="open" @click="isOpen = !isOpen"
            >{{ isOpen ? '收起' : '展开'
            }}<i :class="isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="djradioContent__body" v-if="djDetail">
      <div class="title">
        <h3>节目列表</h3>
        <span class="count">{{
          `共${(programList && programList.count) || 0}期`
        }}</span>
        <div class="sort">
          <a
            href="javascript:;"
            :class="!asc ? 'dropCurrent' : 'drop'"
            title="降序"
            @click="$emit('sort', false)"
          ></a>
          <a
            href="javascript:;"
            :class="asc ? 'riseCurrent' : 'rise'"
            title="升序"
            @click="$emit('sort', true)"
          ></a>
        </div>
      </div>
      <div class="table" v-loading="!programList">
        <div class="table__box" v-if="programList">
          <div
            :class="['table__item', (index + 1) % 2 ? '' : 'even']"
            v-for="(item, index) in programList.programs"
            :key="item.id"
          >
            <div class="index">
              {{ item.serialNum }}
              <i
                class="play"
                @click="$store.dispatch('getRadioDetails', item.id)"
              >
              </i>
            </div>
            <div class="name">
              <router-link :to="`/program?id=${item.id}`">
                {{ item.name }}
              </router-link>
            </div>
            <div class="fun">
              <a
                href="javascript:;"
                class="add"
                @click="
                  $store.dispatch('addProgram', item.id)
                  $message.success('添加成功')
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
                    type: 'djprogram'
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
            <div class="playCount">
              播放{{ item.listenerCount | number_ch }}
            </div>
            <div class="fabulous">赞{{ item.likedCount }}</div>
            <div class="createTime">
              {{ dayjs(item.createTime).format('YYYY-MM-DD') }}
            </div>
            <div class="time">{{ dayjs(item.duration).format('mm:ss') }}</div>
          </div>
        </div>
      </div>
      <div class="table__page" v-if="programList">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="programList.count"
          :current-page="offset / 100 + 1"
          :page-size="100"
          @current-change="$emit('pageChange', $event)"
          next-text="下一页"
          prev-text="上一页"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { subDjAPI } from '@/api/djradioAPI'
import Bus from '@/plugin/eventBus'
export default {
  name: 'djradioContent',
  props: ['asc', 'offset'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    ...mapActions('djradio', {
      playAll: 'playAll',
      getDjDetail: 'getDjDetail'
    }),
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
      this.getDjDetail(rid)
    }
  },
  computed: {
    ...mapState('djradio', {
      djDetail: 'djDetail',
      programList: 'programList'
    }),
    ...mapState('user', {
      isLogin: 'isLogin'
    })
  }
}
</script>
<style lang="less" scoped>
.djradioContent__container {
  .djradioContent__head {
    position: relative;
    display: flex;
    .head__left {
      width: 200px;
      height: 200px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .head__left::before {
      content: '';
      position: absolute;
      width: 208px;
      height: 208px;
      top: -4px;
      left: -4px;
      background: url('../../assets/uploads/coverall.png') no-repeat 0 -1285px;
    }
    .head__right {
      flex: 1;
      padding-left: 25px;
      .name {
        margin: 0 0 12px;
        line-height: 24px;
        i {
          float: left;
          width: 55px;
          height: 24px;
          background: url('../../assets/uploads/icon.png') no-repeat 0 -1014px;
          vertical-align: middle;
        }
        h3 {
          margin-left: 65px;
          font-weight: normal;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .user {
        .el-image {
          width: 35px;
          height: 35px;
          vertical-align: middle;
        }
        span {
          margin: 0 0 0 8px;
          a:hover {
            text-decoration: underline;
          }
          a {
            color: #0c73c2;
            margin-right: 4px;
          }
          img {
            height: 13px;
            width: 13px;
            vertical-align: middle;
            margin-top: -1px;
          }
        }
      }
      .fun {
        margin: 20px 0;
        a {
          display: inline-block;
          height: 31px;
          line-height: 30px;
          margin-right: 6px;
          padding-right: 5px;
          background: url('../../assets/uploads/button2.png') no-repeat 0 -99999999px;
          i {
            display: inline-block;
            height: 31px;
            line-height: 30px;
            background: url('../../assets/uploads/button2.png') no-repeat 0 -99999999px;
            padding: 0 7px 0 30px;
          }
        }
        .sub {
          background-position: right -2163px;
          color: #fff;
          i {
            background-position: 0 -2125px;
          }
        }
        .already {
          background-position: right -2325px;
          i {
            background-position: 0 -2207px;
          }
        }
        .playAll {
          background-position: right -2325px;
          i {
            background-position: 0 -2285px;
          }
        }
        .share {
          background-position: right -1020px;
          i {
            background-position: 0 -1225px;
          }
        }
        .sub:hover {
          background-position: right -2558px;
          i {
            background-position: 0 -2516px;
          }
        }
        .playAll:hover {
          background-position: right -2720px;
          i {
            background-position: 0 -2680px;
          }
        }
        .share:hover {
          background-position: right -1106px;
          i {
            background-position: 0 -1268px;
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
  .djradioContent__body {
    margin-top: 27px;
    .title {
      display: flex;
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        font-size: 20px;
        line-height: 28px;
        font-weight: normal;
      }
      .count {
        padding: 10px 0 0 20px;
        color: #999;
      }
      .sort {
        margin-left: auto;
        a {
          display: inline-block;
          width: 28px;
          height: 25px;
          background: url('../../assets/uploads/cnt_radio.png') no-repeat 0
            9999px;
        }
        .drop {
          background-position: 0 0;
        }
        .dropCurrent {
          background-position: 0 -30px;
          cursor: default;
        }
        .rise {
          background-position: -40px 0;
        }
        .riseCurrent {
          background-position: -40px -30px;
          cursor: default;
        }
      }
    }
    .table {
      min-height: 300px;
      .table__box {
        border: 1px solid #d9d9d9;
        border-top: none;
        .table__item {
          display: flex;
          align-items: center;
          height: 55px;
          a:hover {
            text-decoration: underline;
          }
          .index {
            width: 62px;
            padding: 0 10px;
            line-height: 17px;
            .play {
              float: right;
              width: 17px;
              height: 17px;
              cursor: pointer;
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
            width: 170px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .fun {
            width: 60px;
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
          .playCount,
          .fabulous {
            width: 60px;
            padding: 0 10px;
            color: #666;
          }
          .fabulous {
            width: 70px;
          }
          .createTime,
          .time {
            color: #999;
          }
          .createTime {
            flex-grow: 1;
          }
          .time {
            padding: 0 10px;
          }
        }
        .table__item:hover {
          background-color: #e6e6e6;
          .fun {
            a {
              display: block;
            }
          }
        }
        .even {
          background-color: #f7f7f7;
        }
      }
    }
    .table__page {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
