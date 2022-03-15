<template>
  <div class="header__container">
    <!-- 头部区域 -->
    <header :style="{ marginBottom: isfind == 1 ? '36px' : '5px' }">
      <div class="menu">
        <!-- logo -->
        <h1 class="logo">
          <a href="#/">网易云音乐</a>
        </h1>
        <!-- 路由导航区域 -->
        <el-menu
          :default-active="isfind === 1 ? '/' : $route.path"
          mode="horizontal"
          router
          background-color="transparent"
          active-text-color="#FFFFFF"
          active-background-color="pink"
        >
          <el-menu-item
            v-for="(item, index) in navList"
            :key="index"
            v-html="item.navItem"
            :index="item.path"
            @click="item.path == '/' ? (isfind = 1) : (isfind = 0)"
          ></el-menu-item>
        </el-menu>
        <div class="right__box">
          <!-- 搜索 -->
          <div class="search">
            <el-input v-model="searchVal" placeholder="音乐/视频/电台/用户">
            </el-input>
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
                  <router-link
                    :to="`/user/home${
                      $store.state.userId == null
                        ? ''
                        : `?id=${$store.state.userId}`
                    }`"
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
                    :class="
                      $route.path == '/discover' || $route.path == '/'
                        ? 'current'
                        : ''
                    "
                    >推荐</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/toplist"
                  ><em
                    :class="
                      $route.path.includes('/discover/toplist') ? 'current' : ''
                    "
                    >排行榜</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/playlist"
                  ><em
                    :class="
                      $route.path.includes('/discover/playlist')
                        ? 'current'
                        : ''
                    "
                    >歌单</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/djradio"
                  ><em
                    :class="
                      $route.path.includes('/discover/djradio') ? 'current' : ''
                    "
                    >主播电台</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/artist"
                  ><em
                    :class="
                      $route.path.includes('/discover/artist') ? 'current' : ''
                    "
                    >歌手</em
                  ></router-link
                >
              </li>
              <li>
                <router-link class="subNav__link" to="/discover/album"
                  ><em
                    :class="
                      $route.path.includes('/discover/album') ? 'current' : ''
                    "
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
      // 默认激活的菜单
      activeIndex: '/',
      // 导航列表
      navList: [
        { path: '/', navItem: '发现音乐' },
        { path: '/my', navItem: '我的音乐' },
        { path: '/friend', navItem: '关注' },
        {
          path: '',
          navItem: `<a
              style="display: inline-block; width: 100%; height: 70px"
              href="https://music.163.com/store/product"
              >商城</a
            >`
        },
        {
          path: '',
          navItem: `<a
              style="display: inline-block; width: 100%; height: 70px"
              href="https://music.163.com/st/musician"
              >音乐人</a
            >`
        },
        { path: '/download', navItem: '下载客户端' }
      ],
      // 搜索数据
      searchVal: '',
      isMove: false
    }
  },
  created() {},
  methods: {
    displayDialog() {
      Bus.$emit('Visible', true)
    }
  },
  computed: {
    isfind: {
      get() {
        // this.$route.path === '/' ||
        //   this.$route.path.match(/^\/[\S]+\//) !== null ||
        //   this.$route.path === '/discover'
        if (
          this.$route.path.match(
            /^\/my|\/friend|\/download|\/user\/home|\/user\/update/
          ) === null
        ) {
          return 1
        } else {
          return 0
        }
      },
      set(value) {
        return value
      }
    }
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
            z-index: 3;
            width: 158px;
            background: #2b2b2b;
            border-radius: 4px;
            box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
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
