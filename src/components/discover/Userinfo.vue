<template>
  <div class="userinfo__container">
    <div class="userinfo__nologin" v-if="!isLogin">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a href="javascript:;" @click="login(true)">用户登录</a>
    </div>
    <div class="userinfo__login" v-else>
      <div class="top clearfix">
        <router-link
          class="user__link"
          :to="`/user/home${userId == null ? '' : `?id=${userId}`}`"
        >
          <img :src="userData.avatarUrl + '?param=80y80'" />
        </router-link>
        <div class="info">
          <h4>
            <router-link
              :to="`/user/home${userId == null ? '' : `?id=${userId}`}`"
            >
              {{ userData.nickname }}
            </router-link>
            <span
              :style="{
                backgroundImage: `url(${
                  vipData && vipData.redVipDynamicIconUrl + '?param=43y16'
                })`
              }"
            ></span>
          </h4>
          <router-link class="level" to="/user/level">
            <i>{{ userLevel }}</i></router-link
          >
          <div
            class="signIn"
            :style="{
              backgroundPosition: isSignIn ? '0 -305px' : '0 -469px'
            }"
          >
            <a
              href="javascript:;"
              :style="{
                cursor: isSignIn ? 'default' : 'pointer',
                backgroundPosition: isSignIn ? `right -346px` : 'right -510px',
                color: isSignIn ? '#bebebe' : '#ffffff'
              }"
              @click="signin"
              >{{ isSignIn ? '已签到' : '签到' }}</a
            >
          </div>
        </div>
      </div>
      <div class="buttom">
        <router-link
          :to="`/user/event${userId == null ? '' : `?id=${userId}`}`"
        >
          <p>{{ userData.eventCount }}</p>
          <span>动态</span>
        </router-link>
        <router-link
          :to="`/user/follows${userId == null ? '' : `?id=${userId}`}`"
        >
          <p>{{ userData.follows }}</p>
          <span>关注</span></router-link
        >
        <router-link :to="`/user/fans${userId == null ? '' : `?id=${userId}`}`">
          <p>{{ userData.followeds }}</p>
          <span>粉丝</span></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import { mapState } from 'vuex'
import { signInAPI } from '@/api/discoverAPI'
export default {
  name: 'userinfo',
  data() {
    return {
      isSignIn: false
    }
  },
  methods: {
    login(val) {
      Bus.$emit('Visible', val)
    },
    // 签到
    async signin() {
      if (!this.isSignIn) {
        const { data: result } = await signInAPI().catch((err) => {
          return err.response
        })
        if (result.code !== 200) this.$message.error(result.msg)
        this.isSignIn = true
      }
    }
  },
  computed: {
    ...mapState('user', {
      isLogin: 'isLogin',
      userId: 'userId',
      userData: 'userData',
      vipData: 'vipData',
      userLevel: 'userLevel'
    })
  },
  watch: {
    isLogin(val) {
      if (val) {
        this.$store.dispatch('user/getUserData', this.userId)
        this.$store.dispatch('user/getUserLevel')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.userinfo__nologin {
  overflow: hidden;
  height: 126px;
  background: url('../../assets/uploads/index.png') no-repeat;
  p {
    color: #666;
    width: 205px;
    margin: 16px auto;
    line-height: 20px;
  }
  a {
    display: block;
    width: 100px;
    height: 31px;
    margin: 0 auto;
    background: url('../../assets/uploads/index.png') no-repeat 0 -195px;
    text-align: center;
    color: #fff;
    line-height: 31px;
  }
  a:hover {
    background-position: -110px -195px;
  }
}
.userinfo__login {
  height: 165px;
  padding-top: 20px;
  background: url('../../assets/uploads/index.png') no-repeat 0 -270px;
  .top {
    .user__link {
      float: left;
      width: 80px;
      height: 80px;
      padding: 2px;
      margin-left: 20px;
      background-color: #fff;
      border: 1px solid #dadada;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      float: left;
      margin-left: 18px;
      margin-top: 2px;
      h4 {
        a {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          height: 16px;
          width: 60px;
          text-overflow: ellipsis;
          color: #333;
          font-size: 14px;
        }
        a:hover {
          text-decoration: underline;
        }
        span {
          display: inline-block;
          width: 43px;
          height: 16px;
          background-size: 43px 16px;
          margin-left: 5px;
        }
      }
      .level {
        display: inline-block;
        margin-top: 2px;
        padding-left: 25px;
        height: 17px;
        background: url('../../assets/uploads/icon2.png') no-repeat -130px -64px;
        line-height: 19px;
        i {
          display: inline-block;
          width: 12px;
          height: 17px;
          background: url('../../assets/uploads/icon2.png') no-repeat -188px -64px;
          color: #999;
        }
      }
      .level:hover {
        background-position: -130px -84px;
        i {
          background-position: -188px -84px;
        }
      }
      .signIn {
        width: 70px;
        height: 31px;
        background: url('../../assets/uploads/button2.png') no-repeat 0 -305px;
        margin-top: 15px;
        line-height: 31px;
        text-align: center;
        a {
          display: block;
          width: 75px;
          height: 31px;
          background: url('../../assets/uploads/button2.png') no-repeat right -346px;
        }
      }
    }
  }
  .buttom {
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
</style>
