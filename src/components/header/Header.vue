<template>
  <div class="header__container" :style="fixed">
    <!-- 头部区域 -->
    <header :style="{ marginBottom: isfind == 1 ? '36px' : '5px' }">
      <div class="menu">
        <!-- logo -->
        <h1 class="logo">
          <a href="#/">网易云音乐</a>
        </h1>
        <!-- 路由导航区域 -->
        <el-menu
          :default-active="defaultActive"
          mode="horizontal"
          router
          background-color="transparent"
          active-text-color="#FFFFFF"
          active-background-color="pink"
        >
          <el-menu-item
            v-for="(item, index) in navList"
            :key="index"
            v-text="item.navItem"
            :index="item.path"
            @click="
              item.path == '/' ? (isfind = 1) : (isfind = 0)
              item.path == '/musician' || item.path == '/shoppingmall'
                ? href(item.path)
                : null
            "
          ></el-menu-item>
        </el-menu>
        <div class="right__box">
          <!-- 搜索 -->
          <div class="search">
            <el-input
              v-model="searchForm.keywords"
              placeholder="音乐/视频/电台/用户"
              @mouseup.native.stop
              @keydown.native="onDown"
              @focus="getHeadProposalList(searchForm)"
            >
            </el-input>
            <!-- 搜索建议 -->
            <Proposal
              v-if="$route.path != '/search'"
              :proposalList="headProposalList"
              :keywords="searchForm.keywords"
              :type="searchForm.type"
            ></Proposal>
          </div>
          <!-- 创造者中心 -->
          <div class="alc">
            <a href="javascript:;">创造者中心</a>
          </div>
          <!-- 登录按钮 -->
          <div
            class="login"
            @mousemove="isMove = true"
            @mouseout="isMove = false"
          >
            <a
              href="javascript:;"
              v-show="isLogin === false"
              @click="displayDialog"
              >登录</a
            >
            <div class="headImg" v-show="isLogin">
              <img :src="userImg + '?param=30y30'" alt="" />
              <ul class="login__nav" v-show="isMove === true">
                <li>
                  <router-link :to="`/user/home?id=${userId}`"
                    ><i class="el-icon-user"></i>我的主页</router-link
                  >
                </li>
                <li>
                  <router-link to="/user/update"
                    ><i class="el-icon-setting"></i>个人设置</router-link
                  >
                </li>
                <li>
                  <a href="javascript:;" @click="$emit('logout')"
                    ><i class="el-icon-switch-button"></i>退出登录</a
                  >
                </li>
                <i class="el-icon-caret-top icon"></i>
              </ul>
            </div>
          </div>
        </div>
        <!-- 底部子菜单 -->
        <div class="btm__nav">
          <div class="sub__nav" v-show="isfind == 1">
            <ul>
              <li>
                <router-link class="subNav__link" to="/discover"
                  ><em
                    :class="hash == '/discover' || hash == '/' ? 'current' : ''"
                    >推荐</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/toplist"
                  ><em
                    :class="hash.includes('/discover/toplist') ? 'current' : ''"
                    >排行榜</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/playlist"
                  ><em
                    :class="
                      hash.includes('/discover/playlist') ? 'current' : ''
                    "
                    >歌单</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/djradio"
                  ><em
                    :class="hash.includes('/discover/djradio') ? 'current' : ''"
                    >主播电台</em
                  ></router-link
                >
              </li>
              <li>
                <router-link
                  class="subNav__link"
                  to="/discover/artist/hotSinger"
                  ><em
                    :class="hash.includes('/discover/artist') ? 'current' : ''"
                    >歌手</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/album"
                  ><em
                    :class="hash.includes('/discover/album') ? 'current' : ''"
                    >新碟上架</em
                  ></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import Proposal from '@/components/search/Proposal'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    userImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 导航列表
      navList: [
        { path: '/', navItem: '发现音乐' },
        { path: '/my', navItem: '我的音乐' },
        {
          path: '/shoppingmall',
          navItem: '商城'
        },
        {
          path: '/musician',
          navItem: '音乐人'
        },
        { path: '/download', navItem: '下载客户端' }
      ],
      // 搜索数据
      searchForm: {
        keywords: '',
        type: 1
      },
      isMove: false
    }
  },
  methods: {
    ...mapActions('search', {
      getHeadProposalList: 'getHeadProposalList'
    }),
    ...mapMutations('search', {
      removeHeadProposalList: 'removeHeadProposalList'
    }),
    displayDialog() {
      Bus.$emit('Visible', true)
    },
    href(val) {
      this.$router.push(this.$route.fullPath)
      if (val === '/shoppingmall') {
        location.href = 'https://music.163.com/store/product'
      } else {
        location.href = 'https://music.163.com/st/musician'
      }
    },
    onDown(e) {
      Bus.$emit('keydown', { e, keywords: this.searchForm.keywords })
      if (e.keyCode === 13) this.searchForm.keywords = ''
    }
  },
  computed: {
    hash() {
      if (!this.$route.path) return null
      return location.hash.replace('#', '').split('?')[0]
    },
    isfind: {
      get() {
        // this.$route.path === '/' ||
        //   this.$route.path.match(/^\/[\S]+\//) !== null ||
        //   this.$route.path === '/discover'
        // const path = sessionStorage.getItem('defaultActive') || '/'
        const reg =
          /\/my|\/friend|\/download|\/user\/home|\/user\/update|\/musician|\/shoppingmall|\/search/
        if (!this.defaultActive.match(reg)) {
          return 1
        } else {
          return 0
        }
      },
      set(value) {
        return value
      }
    },
    fixed() {
      const path = this.$route.path
      if (
        path === '/my' ||
        path === '/download' ||
        path === '/my/edit' ||
        path === '/my/edit/cover'
      ) {
        return {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 16px)',
          marginLeft: '-8px',
          'z-index': 2001
        }
      } else {
        return null
      }
    },
    defaultActive() {
      if (this.$route.path) {
        let hash = location.hash.replace('#', '').split('?')[0]
        if (hash.includes('discover')) {
          hash = '/'
        } else if (hash.includes('my')) {
          hash = '/my'
        } else if (hash.includes('shoppingmall')) {
          hash = '/'
        } else if (hash.includes('musician')) {
          hash = '/'
        }
        return hash
      } else {
        let hash = location.hash.replace('#', '').split('?')[0]
        if (hash.includes('discover')) {
          hash = '/'
        } else if (hash.includes('my')) {
          hash = '/my'
        } else if (hash.includes('shoppingmall')) {
          hash = '/'
        } else if (hash.includes('musician')) {
          hash = '/'
        }
        return hash
      }
    },
    ...mapState('search', {
      headProposalList: 'headProposalList'
    }),
    ...mapState('user', {
      userId: 'userId'
    })
  },
  watch: {
    searchForm: {
      deep: true,
      handler(val) {
        if (val.keywords) {
          // 节流阀
          clearTimeout(this.throttleTimer)
          this.throttleTimer = setTimeout(() => {
            this.getHeadProposalList(this.searchForm)
          }, 100)
        } else {
          this.removeHeadProposalList()
        }
      }
    }
  },
  components: {
    Proposal
  }
}
</script>
<style lang="less" scoped>
header {
  position: relative;
  height: 70px;
  background-color: #242424;
  color: #787878;
  .menu {
    height: 70px;
    width: 1100px;
    margin: 0 auto;
    .logo {
      float: left;
      width: 176px;
      height: 70px;
      background: url('../../assets/uploads/topbar.png') no-repeat;
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-indent: -999999px;
      }
    }
    .el-menu {
      float: left;
      .el-menu-item {
        height: 70px;
        line-height: 70px;
      }
      .el-menu-item.is-active {
        background-color: black !important;
      }
      .el-menu-item:hover {
        color: #fff !important;
        background-color: black !important;
      }
    }
    .right__box {
      float: right;
      .login {
        float: left;
        width: 50px;
        height: 70px;
        text-align: center;
        > a {
          line-height: 70px;
          color: #787878;
        }
        .headImg {
          position: relative;
          img {
            margin-top: 20px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .login__nav {
            position: absolute;
            top: 64px;
            left: -54px;
            z-index: 99999;
            width: 158px;
            background: #2b2b2b;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            li {
              text-align: left;
              i {
                margin: 0 10px 0 15px;
              }
              a {
                display: block;
                width: 100%;
                height: 34px;
                line-height: 34px;
                color: #ccc;
              }
              a:hover {
                background-color: #353535;
              }
            }
            .icon {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translate(-50%, -77%);
              color: #2b2b2b;
              font-size: 18px;
            }
          }
        }
      }
      .alc {
        float: left;
        width: 90px;
        height: 32px;
        margin: 19px 12px 0 12px;
        text-align: center;
        a {
          display: block;
          height: 100%;
          border: 1px solid #4f4f4f;
          color: #ccc;
          line-height: 32px;
          border-radius: 20px;
        }
        a:hover {
          border: 1px solid #ccc;
        }
      }
      .search {
        position: relative;
        float: left;
        width: 158px;
        background-color: #fff;
        border-radius: 20px;
        margin-top: 19px;
        /deep/ .el-input__inner {
          border-radius: 20px;
          background: url('../../assets/uploads/topbar.png') no-repeat;
          background-position: 0 -101px;
          padding-left: 30px;
        }
        /deep/ .proposal__container {
          position: absolute;
          z-index: 99999;
          top: 40px;
          width: 240px;
        }
      }
    }
  }
  .btm__nav {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    background-color: #c20c0c;
    width: 100%;
    padding: 2.5px 0;
    .sub__nav {
      width: 1100px;
      margin: 0 auto;
      ul {
        margin-left: 178px;
        li {
          float: left;
          width: 88px;
          height: 31px;
          line-height: 31px;
          text-align: center;
          .subNav__link {
            display: block;
            height: 100%;
            color: #fff;
            em {
              padding: 3px 12px;
              border-radius: 20px;
            }
          }
        }
        li:hover em {
          background: #9b0909;
        }
      }
    }
  }
}

.current {
  background: #9b0909;
}
</style>
