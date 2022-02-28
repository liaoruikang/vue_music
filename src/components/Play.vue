<template>
  <div class="play__container" ref="playRef" :style="{ bottom: bottom }">
    <div class="play__main">
      <!-- 左侧控件区 -->
      <div class="play__btns">
        <a href="javascript:;" class="play__last"></a>
        <a href="javascript:;" class="play__stop"></a>
        <a href="javascript:;" class="play__next"></a>
      </div>
      <!-- 进度条以及歌曲信息区域 -->
      <div class="play__progress">
        <router-link class="song__headPortrait" :to="`/song?id=${id}`">
        </router-link>
        <img
          class="play__img"
          width="34"
          height="34"
          src="http://s4.music.126.net/style/web2/img/default/default_album.jpg"
        />
        <div class="play__pro">
          <div class="play__name clearfix">
            <router-link :to="`/song?id=${id}`">哪里都是你</router-link>
            <router-link class="play__mv" :to="`/mv?id=${mvId}`"></router-link>
            <router-link class="play__author" :to="`/artist?id=${artistId}`"
              >author</router-link
            >
          </div>
          <div class="progress">
            <el-slider v-model="songProgress"></el-slider>
            <span>
              <em>00:00</em>
              <i>/</i>
              03:25
            </span>
          </div>
        </div>
      </div>
      <!-- 右侧控件区 -->
      <div class="play__f">
        <div class="left">
          <a href="javascript:;" title="画中画歌词（未开放）"></a>
          <a href="javascript:;" title="收藏"></a>
          <a href="javascript:;" title="转发"></a>
        </div>
        <div class="right">
          <a
            href="javascript:;"
            title="声音"
            @click="
              () => {
                displayVoice = !displayVoice
                isLock = displayVoice ? 1 : 0
              }
            "
          ></a>
          <a href="javascript:;" title="循环"></a>
          <span>
            <a
              href="javascript:;"
              title="播放列表"
              @click="displayList = !displayList"
              >0</a
            >
          </span>
          <div v-show="displayVoice" class="voice">
            <el-slider
              v-model="volume"
              vertical
              :show-tooltip="false"
              height="90px"
            >
            </el-slider>
          </div>
        </div>
      </div>
      <!-- 歌曲列表和歌词区域 -->
      <div class="play__list" v-show="displayList">
        <div class="list__head">
          <div class="head__left">
            <h4>播放列表(0)</h4>
            <div class="head__f">
              <a class="add" href="javascript:;"
                ><span class="icon__add"></span>收藏全部</a
              >
              <span class="line"></span>
              <a class="del" href="javascript:;"
                ><span class="icon__del"></span>删除</a
              >
            </div>
          </div>
          <div class="head__right">
            <h5>哪里都是你</h5>
            <span class="close" @click="displayList = false"></span>
          </div>
        </div>
        <div class="list__body">
          <img src="//music.163.com/api/img/blur/109951167046276957" />
          <div class="body__left">
            <!-- <el-empty description="你还没有添加任何歌曲"></el-empty> -->
            <div class="body__table" ref="tableRef">
              <ul
                ref="contentRef"
                @mousewheel="
                  scroll(
                    $refs.contentRef,
                    $refs.scrollRef,
                    $refs.barRef,
                    $refs.tableRef,
                    $event
                  )
                "
              >
                <li class="current">
                  <div class="current__play play__c"></div>
                  <div class="play__name">哪里都是你</div>
                  <div class="play__f">
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                  </div>
                  <div class="play__author">
                    <router-link :to="`/artist?id=${artistId}`"
                      >队长dddddddddddddddddddddddd</router-link
                    >
                  </div>
                  <div class="play__time">03:25</div>
                  <div class="play__source">
                    <router-link to="/playlist" title="暂无来源"></router-link>
                  </div>
                </li>
                <li
                  v-for="(item, index) in [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                  ]"
                  :key="index"
                >
                  <div class="play__c"></div>
                  <div class="play__name">哪里都是你</div>
                  <div class="play__f">
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                  </div>
                  <div class="play__author">
                    <router-link :to="`/artist?id=${artistId}`"
                      >队长</router-link
                    >
                  </div>
                  <div class="play__time">03:25</div>
                  <div class="play__source">
                    <router-link to="/playlist" title="暂无来源"></router-link>
                  </div>
                </li>
                <li class="current">
                  <div class="current__play play__c"></div>
                  <div class="play__name">哪里都是你sadsads</div>
                  <div class="play__f">
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                  </div>
                  <div class="play__author">
                    <router-link :to="`/artist?id=${artistId}`"
                      >队长dddddddddddddddddddddddd</router-link
                    >
                  </div>
                  <div class="play__time">03:25</div>
                  <div class="play__source">
                    <router-link to="/playlist" title="暂无来源"></router-link>
                  </div>
                </li>
              </ul>
            </div>
            <div class="body__scroll" ref="scrollRef">
              <div
                class="body__bar"
                ref="barRef"
                @mousedown="
                  down(
                    $refs.contentRef,
                    $refs.scrollRef,
                    $refs.barRef,
                    $refs.tableRef,
                    $event
                  )
                "
              ></div>
            </div>
          </div>
          <div class="body__right" ref="rightBoxRef">
            <div
              class="lyric__content"
              ref="rightContentRef"
              @mousewheel="
                scroll(
                  $refs.rightContentRef,
                  $refs.rightScrollRef,
                  $refs.rightBarRef,
                  $refs.rightBoxRef,
                  $event
                )
              "
            >
              <p
                :class="item === '从不在意别人口中的自己' ? 'current' : ''"
                v-for="(item, index) in lyric"
                :key="index"
              >
                {{ item }}
              </p>
            </div>
            <div class="lyric__scroll" ref="rightScrollRef">
              <div
                class="lyric__bar"
                ref="rightBarRef"
                @mousedown="
                  down(
                    $refs.rightContentRef,
                    $refs.rightScrollRef,
                    $refs.rightBarRef,
                    $refs.rightBoxRef,
                    $event
                  )
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="bg"></div>
    <!-- 状态锁 -->
    <div class="lock">
      <a
        href="javascript:;"
        ref="lockRef"
        @click="lock"
        @mouseenter="over"
        @mouseleave="out"
      ></a>
    </div>
    <!-- 背景2 -->
    <div class="fr"></div>
    <!-- 打开播放条 -->
    <div class="open" title="打开播放条"></div>
    <!-- 画中画歌词 -->
    <div class="pip__lyric"></div>
  </div>
</template>
<script>
export default {
  name: 'play',
  props: {
    // 歌曲id
    id: {
      type: String,
      default: null
    },
    mvId: {
      type: String,
      default: null
    },
    artistId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      // 零时属性 可取进度条双向绑定值
      value: 1,
      // 控制播放控件是否显示
      ishide: false,
      // 当显示播放控件时的定时器
      showTimer: null,
      // 当隐藏播放控件时的定时器
      hideTimer: null,
      // 隐藏前的延时定时器
      delayedTimer: null,
      // 控制播放控件是否上锁
      isLock: parseInt(window.localStorage.getItem('isLock') || 0),
      // 当页面加载时初始的bottom值
      bottom: null,
      // 控制信息列表状态
      displayList: false,
      // 判断鼠标按下 控制鼠标移动事件是否执行
      isDown: false,
      // 鼠标按下时的位置
      pageDownY: 0,
      // 滚动条到父盒子的距离
      barTop: 0,
      // 鼠标移动实时坐标
      moveY: 0,
      // 滚动条最大移动距离
      barMax: 0,
      scrollTop: 0,
      // contentEl的移动距离
      contentY: 0,
      // 歌词
      lyric: [
        '作词 : 队长',

        '作曲 : 队长/박수석/김문철',

        '编曲：박수석，김문철',

        '从不在意别人口中的自己',

        '她说过了一个想听花言巧语的年纪',

        '你选择了他们口中所谓的放弃',

        '却才发现早就丢掉了自己',

        '特别是一个人的夜里',

        '没人能够控制住自己',

        '让全部回忆藏在心底泛起涟漪',

        '你想要的是现在',

        '而不是那遥远的未来',

        '选择的困惑',

        '再没人能懂你',

        '生气的原因和哭泣的无力',

        '最遥远的距离',

        '忘了吧忘了吧忘了吧忘了你的所有',

        '不过只是找了一堆美丽的理由',

        '把你的痕迹都统统掩埋',

        '你走过的地方只剩下思念难捱',

        '把你藏在心头',

        '每天每夜想你',

        '害怕你的眼泪',

        '没人为你抹去',

        '不能想象没有了你的未来',

        '你身边那位能让你过得比我更精彩I want you back',

        '我忘掉你的所有 风里雨里一直大步往前走',

        '我又怎么能够忘掉你的温柔',

        '换不同的场景',

        '但哪里都是你',

        '要怎么能忘记 忘记你',

        `所有人都知道I can't let you go`,

        `每个人都知道 I can't let you go`,

        `你为什么还不知道 I can't let you go`,

        `Baby baby I can't let you go`,

        '在你的心里我是怎样一个人',

        '把话都袒露让你知道我心声',

        'You know you know',

        '感谢你陪我走过这一程',

        'You know you know',

        '感谢你陪我走过这一程',

        'You know you know',

        '每天多爱自己一点 把恨我当成动力',

        '别那么晚睡',

        '我想你过的好 是唯一对你放不下的',

        '习惯吧',

        '-----'
      ],
      // 是否显示声音控件
      displayVoice: false,
      // 歌曲进度
      songProgress: 0,
      // 音量
      volume: 0
    }
  },
  created() {
    document.addEventListener('mousemove', (e) => {
      if (!this.isLock) {
        clearInterval(this.delayedTimer)
        if (window.innerHeight - e.clientY < 85) {
          this.show()
        } else {
          this.delayedTimer = setTimeout(() => {
            this.hide()
          }, 500)
        }
      }
    })
  },
  mounted() {
    // 当页面加载时判断是否上锁
    // 当状态是未上锁时
    if (this.isLock === 0) {
      this.$refs.lockRef.style.backgroundPosition = '-80px -380px'
      this.bottom = '-46px'
    } else if (this.isLock === 1) {
      this.bottom = '0'
      this.$refs.lockRef.style.backgroundPosition = '-100px -380px'
    }
  },
  methods: {
    show() {
      if (this.ishide) return
      clearInterval(this.showTimer)
      this.ishide = true
      let bottom = parseInt(
        window
          .getComputedStyle(this.$refs.playRef)
          .getPropertyValue('bottom')
          .split('px')[0]
      )
      this.showTimer = setInterval(() => {
        if (bottom === 0) {
          return clearInterval(this.showTimer)
        }
        bottom += 2
        this.$refs.playRef.style.bottom = bottom + 'px'
      }, 10)
    },
    hide() {
      if (!this.ishide) return
      clearInterval(this.hideTimer)
      this.ishide = false
      let bottom = parseInt(
        window
          .getComputedStyle(this.$refs.playRef)
          .getPropertyValue('bottom')
          .split('px')[0]
      )
      this.hideTimer = setInterval(() => {
        if (bottom === -46) {
          return clearInterval(this.hideTimer)
        }
        bottom -= 2
        this.$refs.playRef.style.bottom = bottom + 'px'
      }, 10)
    },
    lock() {
      // 当状态是未上锁时
      if (this.isLock === 0) {
        this.isLock = 1
        window.localStorage.setItem('isLock', this.isLock)
        this.$refs.lockRef.style.backgroundPosition = '-100px -380px'
      } else if (this.isLock === 1) {
        this.displayList = false
        this.isLock = 0
        window.localStorage.setItem('isLock', this.isLock)
        this.$refs.lockRef.style.backgroundPosition = '-80px -380px'
      }
    },
    over() {
      if (this.isLock === 0) {
        this.$refs.lockRef.style.backgroundPosition = '-80px -400px'
      } else if (this.isLock === 1) {
        this.$refs.lockRef.style.backgroundPosition = '-100px -400px'
      }
    },
    out() {
      if (this.isLock === 0) {
        this.$refs.lockRef.style.backgroundPosition = '-80px -380px'
      } else if (this.isLock === 1) {
        this.$refs.lockRef.style.backgroundPosition = '-100px -380px'
      }
    },
    // 当鼠标按下触发滚动
    down(contentEl, scrollEl, barEl, tableRef, e) {
      // 判断是否需要滚动
      if (tableRef.offsetHeight >= contentEl.offsetHeight) return
      // 禁止文字选中
      document.querySelector('.app__container').style = `
          moz-user-select: -moz-none;
          -moz-user-select: none;
          -o-user-select:none;
          -khtml-user-select:none;
          -webkit-user-select:none;
          -ms-user-select:none;
          user-select:none;
          `
      // 获取鼠标按下时的坐标
      this.pageDownY = e.clientY
      // 获取滚动条距离父盒子距离
      this.barTop = barEl.offsetTop
      // 获取滚动条可移动最大距离
      this.barMax = scrollEl.offsetHeight - barEl.offsetHeight

      this.isDown = true
      window.onmousemove = this.move.bind(this, barEl, contentEl, scrollEl)
      window.onmouseup = this.up
    },
    // 当鼠标按下后移动
    move(barEl, contentEl, scrollEl, e) {
      if (!this.isDown) return

      // 获取鼠标移动实时坐标
      this.moveY = e.clientY
      let y = this.moveY - this.pageDownY
      y = this.barTop + y
      // 限定滚动条可移动范围
      if (y <= 0) {
        y = 0
      } else if (y >= this.barMax) {
        y = this.barMax
      }
      // 获取进度条区域与内容区域的缩放比例
      const contentZoom = contentEl.offsetHeight / scrollEl.offsetHeight

      // 动态修改滚动条top值
      contentEl.style.top = `-${Math.ceil(y * contentZoom)}px`
      barEl.style.top = y + 'px'
    },
    // 当鼠标松开
    up() {
      // 允许文字选中
      document.querySelector('.app__container').style = `
          moz-user-select: -moz-select;
          -moz-user-select: select;
          -o-user-select:select;
          -khtml-user-select:select;
          -webkit-user-select:select;
          -ms-user-select:select;
          user-select:select;
          `
      this.isDown = false
    },
    // 当内容区域滚动时
    scroll(contentEl, scrollEl, barEl, tableRef, e) {
      // 禁止页面滚动
      e.preventDefault()

      // 判断是否需要滚动
      if (tableRef.offsetHeight >= contentEl.offsetHeight) return

      // 获取cententEl的top值
      this.contentY = parseInt(
        window
          .getComputedStyle(contentEl)
          .getPropertyValue('top')
          .slice(
            0,
            window.getComputedStyle(contentEl).getPropertyValue('top').length -
              2
          )
      )
      // 移动速度
      const speed = contentEl.children.length / 2
      // 获取最大移动距离
      const contentMax = contentEl.offsetHeight - tableRef.offsetHeight

      // 获取进度条区域与内容区域的缩放比例
      const contentZoom = scrollEl.offsetHeight / contentEl.offsetHeight
      if (e.wheelDelta === -120) {
        // 当前要移动的距离
        let y = this.contentY - speed
        // 限制可移动范围
        if (y <= -contentMax) y = -contentMax
        contentEl.style.top = y + 'px'
        barEl.style.top = `${Math.floor(Math.abs(y) * contentZoom)}px`
      } else {
        // 当前要移动的距离
        let y = this.contentY + speed
        // 限制可移动范围
        if (y >= 0) y = 0

        contentEl.style.top = y + 'px'
        barEl.style.top = `${Math.floor(Math.abs(y) * contentZoom)}px`
      }
    }
  },
  watch: {
    displayList(val) {
      if (val) {
        this.isLock = 1
        this.$nextTick(() => {
          // 判断是否需要滚动
          if (
            this.$refs.tableRef.offsetHeight >=
            this.$refs.contentRef.offsetHeight
          ) {
            return
          }
          this.$refs.barRef.style.height =
            (this.$refs.tableRef.offsetHeight *
              this.$refs.tableRef.offsetHeight) /
              this.$refs.contentRef.offsetHeight +
            'px'
          this.$refs.rightBarRef.style.height =
            (this.$refs.rightBoxRef.offsetHeight *
              this.$refs.rightBoxRef.offsetHeight) /
              this.$refs.rightContentRef.offsetHeight +
            'px'
        })
        this.scrollTop = document.documentElement.scrollTop
      }
      if (!val) this.isLock = 0
    },
    isLock(val) {
      // 当页面加载时判断是否上锁
      // 当状态是未上锁时
      if (val === 0) {
        this.$refs.lockRef.style.backgroundPosition = '-80px -380px'
      } else if (val === 1) {
        this.$refs.lockRef.style.backgroundPosition = '-100px -380px'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.play__container {
  position: fixed;
  z-index: 3;
  left: 0;
  width: 100%;
  height: 53px;
  .bg {
    background: url('../assets/uploads/playbar.png') repeat-x;
    height: 100%;
    margin-right: 92px;
  }
  .lock {
    position: absolute;
    top: -14px;
    right: 40px;
    width: 52px;
    height: 67px;
    background: url('../assets/uploads/playbar.png') no-repeat 0 -380px;
    a {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin: 6px 17px;
      // background: url('../assets/uploads/playbar.png') no-repeat -100px -380px;
      background: url('../assets/uploads/playbar.png') no-repeat -80px -380px;
    }
  }
  .fr {
    float: right;
    height: 53px;
    width: 40px;
    background: url('../assets/uploads/playbar.png') repeat-x;

    margin-top: -53px;
  }
  .open {
    position: absolute;
    top: -20px;
    left: 0;
    z-index: -1;
    height: 20px;
    width: 100%;
  }
  a:hover {
    text-decoration: underline;
  }
  .play__main {
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 982px;
    z-index: 999;
    .play__btns {
      float: left;
      overflow: hidden;
      .play__last {
        float: left;
        margin-top: 15px;
        width: 28px;
        height: 28px;
        background: url('../assets/uploads/playbar.png') no-repeat 0 -130px;
      }
      .play__stop {
        float: left;
        margin: 11px 10px 0 10px;
        width: 36px;
        height: 36px;
        background: url('../assets/uploads/playbar.png') no-repeat 0 -204px;
      }
      .play__next {
        float: left;
        margin-top: 15px;
        width: 28px;
        height: 28px;
        background: url('../assets/uploads/playbar.png') no-repeat -80px -130px;
      }
      .play__next:hover {
        background-position: -110px -130px;
      }
      .play__stop:hover {
        background-position: -40px -204px;
      }
      .play__last:hover {
        background-position: -30px -130px;
      }
    }
    .play__progress {
      float: left;
      position: relative;
      margin: 12px 0 0 25px;
      height: 100%;
      .song__headPortrait {
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        background: url('../assets/uploads/playbar.png') no-repeat -0 -80px;
      }
      .play__img {
        float: left;
      }
      .play__pro {
        float: left;
        margin-left: 15px;
        height: 100%;
        .play__name {
          margin-bottom: 5px;
          a {
            float: left;
            color: #e8e8e8;
          }
          .play__mv {
            display: inline-block;
            width: 19px;
            height: 17px;
            background: url('../assets/uploads/playbar.png') no-repeat 0 -57px;
            margin-left: 3px;
          }
          .play__author {
            color: #9b9b9b;
            margin-left: 15px;
            margin-top: 2px;
          }
        }
        .progress {
          width: 545px;
          height: 12px;
          margin-top: 8px;
          span {
            float: right;
            margin-top: -12px;
            color: #797979;
            em {
              color: #a1a1a1;
            }
            i {
              margin: 0 1px 0 3px;
            }
          }
        }
      }
    }
    .play__f {
      float: left;
      margin-left: 40px;
      .left {
        float: left;
        a {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-top: 17px;
          margin-right: 2px;
          background: url('../assets/uploads/playbar.png') no-repeat 0 0;
        }
        a:nth-child(1) {
          background: url('../assets/uploads/DLVi_1eymwAX8gDunfd2bg==_109951165524394991.png')
            no-repeat;
        }
        a:nth-child(1):hover {
          background: url('../assets/uploads/DLVi_1eymwAX8gDunfd2bg==_109951165524394991.png')
            no-repeat 0 -25px;
        }
        a:nth-child(2) {
          background-position: -88px -163px;
        }
        a:nth-child(2):hover {
          background-position: -88px -189px;
        }
        a:nth-child(3) {
          background-position: -113px -163px;
        }
        a:nth-child(3):hover {
          background-position: -113px -189px;
        }
      }
      .right {
        position: relative;
        float: left;
        padding-left: 13px;
        background: url('../assets/uploads/playbar.png') no-repeat -147px -231px;
        > a {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-top: 17px;
          margin-right: 2px;
          background: url('../assets/uploads/playbar.png') no-repeat 0 0;
        }
        > a:nth-child(1) {
          background-position: -2px -248px;
        }
        > a:nth-child(1):hover {
          background-position: -31px -248px;
        }
        > a:nth-child(2) {
          background-position: -66px -344px;
        }
        > a:nth-child(2):hover {
          background-position: -93px -344px;
        }
        span {
          a {
            display: inline-block;
            transform: translateY(-8px);

            width: 38px;
            height: 25px;
            padding-left: 21px;
            background: url('../assets/uploads/playbar.png') no-repeat -42px -68px;
            text-align: center;
            color: #666;
            line-height: 26px;
          }
          a:hover {
            text-decoration: none;
            background-position: -42px -98px;
          }
        }
        // 声音调节控件
        .voice {
          position: absolute;
          top: -106px;
          left: 10px;
          width: 32px;
          height: 113px;
          background: url('../assets/uploads/playbar.png') no-repeat 0 -503px;
          border-radius: 3px;
          /deep/ .el-slider__runway {
            width: 4px;
            margin: 12px auto;
            .el-slider__button {
              width: 22px;
              height: 24px;
              border: 0;
              background: url('../assets/uploads/iconall.png') no-repeat 0 -250px;
              margin-left: -2px;
              transform: scale(80%);
              cursor: default;
            }
            .el-slider__bar {
              width: 4px;
              background: url('../assets/uploads/playbar.png') no-repeat -40px bottom;
            }
          }
        }
      }
    }
    // 列表
    .play__list {
      position: absolute;
      top: -295px;
      left: 0;
      width: 100%;
      height: 301px;
      .list__head {
        display: flex;
        height: 40px;
        background: url('../assets/uploads/playlist_bg.png') no-repeat -2px 0;
        .head__left {
          width: 560px;
          height: 41px;
          h4 {
            float: left;
            line-height: 41px;
            font-size: 14px;
            color: #e2e2e2;
            margin-left: 25px;
          }
          .head__f {
            float: right;
            margin-right: 20px;
            a:hover {
              color: #eee;
              text-decoration: underline;
            }
            a {
              color: #ccc;
              line-height: 41px;
              span {
                position: relative;
                display: inline-block;
                top: 4px;
                right: 3px;
                width: 16px;
                height: 16px;
                background: url('../assets/uploads/playlist.png') no-repeat -24px
                  0;
              }
              .icon__del {
                background-position: -50px 0;
              }
            }

            .add:hover .icon__add {
              background-position: -24px -20px;
            }
            .del:hover .icon__del {
              background-position: -50px -20px;
            }
            .line {
              position: relative;
              height: 15px;
              border-left: 1px solid #000;
              border-right: 1px solid #2c2c2c;
              margin: 0 10px;
            }
          }
        }
        .head__right {
          flex: 1;
          display: flex;
          height: 41px;
          padding-left: 30px;
          align-items: center;
          h5 {
            flex: 1;
            height: 41px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            line-height: 41px;
          }
          .close {
            width: 30px;
            height: 30px;
            background: url('../assets/uploads/playlist.png') no-repeat -195px 9px;
            cursor: pointer;
          }
          .close:hover {
            background-position: -195px -21px;
          }
        }
      }
      .list__body {
        display: flex;
        position: relative;
        height: 261px;
        background: url('../assets/uploads/playlist_bg.png') repeat-y -1016px 0;
        overflow: hidden;

        .body__left {
          position: relative;
          z-index: 1;
          width: 560px;
          height: 261px;
          .body__table {
            float: left;
            width: 553px;
            height: 261px;
            background-color: rgba(22, 22, 22, 0.7);
            ul {
              position: relative;
              top: 0;
              li {
                display: flex;
                height: 28px;
                align-items: center;
                color: #ccc;
                cursor: pointer;
                a {
                  color: #ccc;
                }
                .play__c {
                  width: 10px;
                  height: 13px;
                  margin-left: 10px;
                }
                .play__name {
                  margin-left: 15px;
                  width: 60px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .play__f {
                  width: 100px;
                  height: 100%;
                  margin-left: 180px;
                }
                .play__author {
                  width: 70px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .play__time {
                  margin-left: 15px;
                  color: #666;
                }
                .play__source {
                  a {
                    display: inline-block;
                    width: 14px;
                    height: 16px;
                    background: url('../assets/uploads/playlist.png') no-repeat -80px
                      0px;
                    margin-top: 5px;
                    margin-left: 25px;
                  }
                  a:hover {
                    background-position: -80px -20px;
                  }
                }
              }
              // 当前播放歌曲的样式
              .current {
                background-color: rgba(0, 0, 0, 0.3);
                color: #fff !important;
              }
              .current__play {
                width: 10px;
                height: 13px;
                background: url('../assets/uploads/playlist.png') no-repeat -182px
                  0;
                margin-left: 10px;
              }
            }
            li:hover {
              background-color: rgba(0, 0, 0, 0.3);
              color: #fff;
              a {
                color: #fff;
              }
              .play__f {
                a {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background-color: #fff;
                  margin-top: 6px;
                  margin-right: 8px;
                  background: url('../assets/uploads/playlist.png') no-repeat;
                }
                a:nth-child(1) {
                  background-position: -24px 0;
                }
                a:nth-child(2) {
                  background-position: 0 0;
                }
                a:nth-child(3) {
                  background-position: -57px -50px;
                }
                a:nth-child(4) {
                  background-position: -51px 0;
                }
                a:nth-child(1):hover {
                  background-position: -24px -20px;
                }
                a:nth-child(2):hover {
                  background-position: 0 -20px;
                }
                a:nth-child(3):hover {
                  background-position: -80px -50px;
                }
                a:nth-child(4):hover {
                  background-position: -51px -20px;
                }
              }
            }
          }
          .body__scroll {
            position: relative;
            float: left;
            width: 7px;
            height: 100%;
            background-color: #000;
            .body__bar {
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100px;
              background-color: #707070;
              border: 1px solid #a6a6a6;
              opacity: 0.8;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
        .body__right {
          position: relative;
          z-index: 1;
          flex: 1;
          height: 100%;
          background-color: rgba(22, 22, 22, 0.3);
          .lyric__content {
            position: relative;
            width: 354px;
            margin: 21px auto;
            overflow: hidden;
            p {
              height: 32px;
              text-align: center;
              color: #989898;
              line-height: 32px;
            }
            p.current {
              font-size: 14px;
              color: #fff;
            }
          }
          .lyric__scroll {
            position: absolute;
            float: left;
            top: 0;
            right: 0;
            width: 7px;
            height: 100%;
            background-color: #000;
            .lyric__bar {
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100px;
              background-color: #707070;
              border: 1px solid #a6a6a6;
              opacity: 0.8;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
        > img {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          width: 980px;
          height: auto;
          opacity: 0.3;
        }
      }
    }
  }

  /deep/ .play__progress .el-slider__runway {
    margin: 0;
    height: 9px;
    width: 466px;
    background: url('../assets/uploads/statbar.png') right 0;
    border-radius: 6px;
    .el-slider__button-wrapper {
      width: 22px;
      height: 24px;
      margin-top: 7px;
    }
    .el-slider__button {
      width: 22px;
      height: 24px;
      border: 0;
      background: url('../assets/uploads/iconall.png') no-repeat 0 -250px;
      cursor: default;
    }
    .el-slider__bar {
      height: 9px;
      background: url('../assets/uploads/statbar.png') left -66px;
    }
  }
}
</style>
