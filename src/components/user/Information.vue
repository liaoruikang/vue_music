<template>
  <div class="information__container">
    <div class="information__left">
      <el-image :src="userData.avatarUrl + '?param=130y130'"></el-image>
    </div>
    <div class="information__right">
      <div class="info">
        <span class="name">{{ userData.nickname }}</span>
        <span
          class="member"
          v-show="userId == $route.query.id"
          :style="{
            backgroundImage: `url(${
              vipData && vipData.redVipLevelIcon + '?param=43y16'
            })`
          }"
        ></span>
        <i class="level" v-show="userId == $route.query.id"
          >{{ userLevel }} <em></em
        ></i>
        <i
          :class="[
            'gender',
            userData.gender == 1 ? 'male' : userData.gender == 2 ? 'female' : ''
          ]"
        ></i>
        <a
          href="javascript:;"
          v-show="userId != $route.query.id"
          class="follow"
          @click="follow(userData)"
          >关注</a
        >
        <a
          :href="`#/artist?id=${userData.artistId}`"
          class="artist"
          v-show="userId != $route.query.id && userData.artistId"
        >
          <i>查看歌手页</i>
        </a>
      </div>
      <div class="bottom">
        <router-link :to="$route.fullPath">
          <p>{{ userData.eventCount }}</p>
          <span>动态</span>
        </router-link>
        <router-link :to="$route.fullPath">
          <p>{{ userData.follows }}</p>
          <span>关注</span></router-link
        >
        <router-link :to="$route.fullPath">
          <p>{{ userData.followeds }}</p>
          <span>粉丝</span></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { followAPI } from '@/api/followAPI'

export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    async follow(val) {
      if (val.followed) return
      const { data: result } = await followAPI(val.userId, 1).catch((err) => {
        return err.response
      })
      if (result.code === -462) {
        return this.$message.error(result.data.blockText)
      }
      if (result.code !== 200) return
      this.$message.success('关注成功')
      this.getSearch()
    }
  },
  computed: {
    ...mapState('user', {
      userData: 'userData',
      userLevel: 'userLevel',
      vipData: 'vipData',
      userId: 'userId'
    })
  }
}
</script>
<style lang="less" scoped>
.information__container {
  display: flex;
  margin-bottom: 43px;
  .information__left {
    width: 136px;
    margin-right: 40px;
    .el-image {
      width: 130px;
      height: 130px;
      padding: 3px;
      background: #fff;
      border: 1px solid #d5d5d5;
    }
  }
  .information__right {
    flex: 1;
    .info {
      padding-bottom: 12px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      .name {
        margin-top: 3px;
        font-size: 22px;
        font-weight: normal;
        line-height: 30px;
      }
      .member {
        display: inline-block;
        width: 57px;
        height: 36px;
        margin-left: 10px;
        vertical-align: middle;
        margin-top: -6px;
        background-size: 100% 20px;
        background-position: center;
        background-repeat: no-repeat;
      }
      .level {
        display: inline-block;
        height: 19px;
        overflow: hidden;
        padding-left: 29px;
        line-height: 21px;
        color: #e03a24;
        font-size: 14px;
        font-weight: bold;
        font-style: italic;
        background: url('../../assets/uploads/icon2.png') no-repeat -135px -190px;
        vertical-align: middle;
        margin-top: -6px;
        margin-left: 8px;
        em {
          display: inline-block;
          width: 9px;
          height: 19px;
          vertical-align: middle;
          background: url('../../assets/uploads/icon2.png') no-repeat -191px -190px;
          margin-top: -5px;
        }
      }
      .gender {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        background: url('../../assets/uploads/icon.png') no-repeat 0 -9999999px;
        margin-top: -6px;
        margin-left: 8px;
      }
      .female {
        background-position: -41px -27px;
      }
      .male {
        background-position: -41px -57px;
      }
      a {
        display: inline-block;
        height: 31px;

        background: url('../../assets/uploads/button.png') no-repeat;
        vertical-align: middle;
        margin-top: -6px;
        text-align: center;
        line-height: 31px;
      }
      .follow {
        width: 40px;
        background-position: 0 -720px;
        padding-left: 30px;
        color: #fff;
        text-indent: -20px;
        margin-left: 15px;
      }
      .follow:hover {
        background-position: -80px -720px;
      }
      .artist {
        float: right;
        color: #333;
        background-position: right -100px;
        padding: 0 5px 0 0;
        white-space: nowrap;
        height: 31px;
        background: url('../../assets/uploads/button2.png') no-repeat;
        background-position: right -100px;
        margin-top: 3px;
        i {
          display: inline-block;
          height: 31px;
          background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
          padding: 0 15px 0 20px;
        }
      }
      .artist:hover {
        background-position: right -182px;
        i {
          background-position: 0 -141px;
        }
      }
    }
    .bottom {
      margin: 22px 0 0 20px;
      a {
        display: block;
        float: left;
        padding: 0 18px;
        border-right: 1px solid #e4e4e4;
        span {
          color: #666;
        }
        p {
          color: #666;
          font-size: 20px;
          font-weight: normal;
        }
      }
      a:nth-child(1) {
        padding-left: 0;
      }
      a:nth-child(3) {
        border: 0;
      }
      a:hover {
        p,
        span {
          color: #0c73c2;
        }
      }
    }
  }
}
</style>
