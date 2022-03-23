<template>
  <div
    class="my__container w"
    :style="{ minHeight: isLogin ? '860px' : '700px' }"
  >
    <div class="my__login" v-if="!isLogin && isLogin != null">
      <div class="login__box">
        <h2>登录网易云</h2>
        <a href="javascript:;" @click="login">立即登录</a>
      </div>
    </div>
    <div class="my__main clearfix" v-if="isLogin" v-loading="!isShow">
      <div class="my__left" v-if="isShow">
        <MyNav :total="mySinger.count"></MyNav>
      </div>
      <div class="my__right" v-if="isShow">
        <!-- 动态渲染组件 -->
        <components
          v-show="$route.path == '/my'"
          :is="isComponent"
          :list="songsDetails"
          @dynamic="step = $event"
        ></components>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import MyNav from '@/components/my/MyNav'
import MySinger from '@/components/my/MySinger'
import MyContent from '@/components/my/MyContent'
import { mapState, mapGetters } from 'vuex'
import Bus from '@/plugin/eventBus'
export default {
  name: 'my',
  methods: {
    login() {
      Bus.$emit('Visible', true)
    }
  },
  components: {
    MyNav,
    MySinger,
    MyContent
  },
  computed: {
    ...mapState('user', {
      userId: 'userId',
      isLogin: 'isLogin'
    }),
    ...mapGetters('collection', {
      uPlayList: 'uPlayList',
      cPlayList: 'cPlayList'
    }),
    ...mapState('my', {
      mySinger: 'mySinger'
    }),
    ...mapState('toplist', {
      songsDetails: 'songsDetails'
    }),
    isShow() {
      if (this.uPlayList && this.cPlayList && this.mySinger) {
        return true
      } else {
        return false
      }
    },
    isComponent() {
      if (
        this.$route.query.id === 'singer' ||
        this.$route.query.id === undefined
      ) {
        return 'MySinger'
      } else {
        return 'MyContent'
      }
    },
    queryId() {
      if (this.$route.query.id) {
        return this.$route.query.id
      } else {
        return null
      }
    }
  },
  watch: {
    userId: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$store.dispatch('collection/getUserPlayList', this.userId)
          this.$store.dispatch('my/getMySinger')
        }
      }
    },
    queryId: {
      immediate: true,
      handler(val) {
        if (!isNaN(val)) {
          // 获取歌单列表
          this.$store.commit('toplist/removeSongsDetails')
          this.$store.dispatch('toplist/getSongsDetails', {
            id: val,
            ist: true
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.my__container {
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .my__login {
    background-color: #fff;
    height: 100%;
    min-height: 700px;
    .login__box {
      width: 807px;
      height: 268px;
      margin: 0 auto 0;
      padding-top: 104px;
      background: url('../../assets/uploads/mymusic.png') no-repeat 0 104px;
      h2 {
        font-size: 100%;
        text-indent: -999999px;
      }
      a {
        display: block;
        width: 167px;
        height: 45px;
        margin: 186px 0 0 482px;
        background: url('../../assets/uploads/mymusic.png') no-repeat 0 9999px;
        text-indent: -9999px;
      }
      a:hover {
        background-position: 0 -278px;
      }
    }
  }
  .my__main {
    background: url('../../assets/uploads/wrap3.png') repeat-y center 0;
    min-height: 860px;
    .my__left {
      float: left;
      position: fixed;
      height: 860px;
      width: 240px;
    }
    .my__right {
      height: 100%;
      float: right;
      width: 740px;
      padding-bottom: 50px;
    }
  }
}
</style>
