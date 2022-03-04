<template>
  <div
    class="play__container"
    ref="playRef"
    @click.stop
    :style="{ bottom: bottom }"
  >
    <div class="play__main">
      <!-- 左侧控件区 -->
      <div class="play__btns">
        <a href="javascript:;" class="play__last" @click="onEnded('last')"></a>
        <a
          href="javascript:;"
          :class="[isPlay ? 'play__open' : 'play__stop']"
          @click="play"
        ></a>
        <a href="javascript:;" class="play__next" @click="onEnded('next')"></a>
      </div>
      <!-- 进度条以及歌曲信息区域 -->
      <div class="play__progress">
        <router-link
          class="song__headPortrait"
          :to="`/song?id=${currentPlay && currentPlay.id}`"
        >
        </router-link>
        <img
          class="play__img"
          width="34"
          height="34"
          :src="
            currentPlay
              ? currentPlay.al.picUrl + '?param=34y34'
              : 'http://s4.music.126.net/style/web2/img/default/default_album.jpg?param=34y34'
          "
        />
        <div class="play__pro">
          <div class="play__name clearfix">
            <router-link :to="`/song?id=${currentPlay && currentPlay.id}`">{{
              currentPlay && currentPlay.name
            }}</router-link>
            <router-link
              :class="currentPlay && currentPlay.mv && 'play__mv'"
              :to="`/mv?id=${currentPlay && currentPlay.mv}`"
            ></router-link>
            <div class="play__author" v-if="currentPlay">
              <span
                v-for="(item, index) in currentPlay && currentPlay.ar"
                :key="item.id"
              >
                <router-link class="" :to="`/artist?id=${item.id}`">
                  {{ item.name }}
                </router-link>
                <i v-show="index !== currentPlay.ar.length - 1">/</i>
              </span>
            </div>
          </div>
          <div class="progress">
            <el-slider
              v-model="songProgress"
              :disabled="!currentPlay"
              :show-tooltip="false"
              @change="currentPlayChange"
              @input="currentPlayInput"
              @mousedown.native="isChange = true"
            ></el-slider>
            <span>
              <em>{{ currentPlayTime || '00:00' }}</em>
              <i>/</i>
              {{ maxPlayTime }}
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
            :class="volume === 0 ? 'mute' : ''"
            href="javascript:;"
            title="声音"
            @click="
              () => {
                displayVoice = !displayVoice
                isLock = displayVoice ? 1 : displayList ? 1 : 0
              }
            "
          ></a>
          <a
            href="javascript:;"
            :class="playMode"
            :title="
              playMode == 'loop'
                ? '循环'
                : playMode == 'random'
                ? '随机'
                : playMode == 'oneLoop'
                ? '单曲循环'
                : ''
            "
            @click="
              playMode =
                playMode == 'loop'
                  ? 'random'
                  : playMode == 'random'
                  ? 'oneLoop'
                  : playMode == 'oneLoop'
                  ? 'loop'
                  : playMode
            "
          ></a>
          <span>
            <a
              href="javascript:;"
              title="播放列表"
              @click="displayList = !displayList"
              >{{ songTotal }}</a
            >
          </span>
          <div v-show="displayVoice" class="voice">
            <el-slider
              v-model="volume"
              vertical
              :show-tooltip="false"
              height="90px"
              :disabled="!currentPlay"
            >
            </el-slider>
          </div>
        </div>
      </div>
      <!-- 歌曲列表和歌词区域 -->
      <div class="play__list" v-show="displayList">
        <div class="list__head">
          <div class="head__left">
            <h4>播放列表({{ songTotal }})</h4>
            <div class="head__f">
              <a class="add" href="javascript:;"
                ><span class="icon__add"></span>收藏全部</a
              >
              <span class="line"></span>
              <a class="del" @click="delSongList" href="javascript:;"
                ><span class="icon__del"></span>删除</a
              >
            </div>
          </div>
          <div class="head__right">
            <h5>{{ currentPlay && currentPlay.name }}</h5>
            <span class="close" @click="displayList = false"></span>
          </div>
        </div>
        <div class="list__body">
          <img
            :src="currentPlay ? currentPlay.al.picUrl + '?param=100y100' : ''"
          />
          <div class="body__left">
            <div class="body__table" ref="tableRef">
              <el-empty v-show="songList.length === 0">
                <template slot="description">
                  <p class="tips"><i></i>你还没有添加任何歌曲</p>
                  <p class="tips">
                    去首页
                    <router-link to="/">发现音乐</router-link>
                    ，或在
                    <router-link to="/my">我的音乐</router-link>
                    收听自己收藏的歌单。
                  </p>
                </template>
              </el-empty>
              <ul
                ref="contentRef"
                v-show="songList.length > 0"
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
                <li
                  :class="
                    currentPlay && currentPlay.id == item.id ? 'current' : ''
                  "
                  v-for="item in songList"
                  :key="item.id"
                  @click="$store.commit('setCurrentPlay', item)"
                >
                  <div
                    :class="[
                      'play__c',
                      currentPlay && currentPlay.id == item.id
                        ? 'current__play'
                        : ''
                    ]"
                  ></div>
                  <div class="play__name">{{ item.name }}</div>
                  <div class="play__f">
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a
                      href="javascript:;"
                      @click.stop="delSongList($event, item.id)"
                    ></a>
                  </div>
                  <div class="play__author">
                    <span v-for="(val, index) in item.ar" :key="val.id">
                      <router-link class="" :to="`/artist?id=${val.id}`">
                        {{ val.name }}
                      </router-link>
                      <i v-show="index !== item.ar.length - 1">/</i>
                    </span>
                  </div>
                  <div class="play__time">
                    {{ dayjs(item.dt).format('mm:ss') }}
                  </div>
                  <div class="play__source">
                    <a href="javascript:;" title="暂无来源"></a>
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
            <div class="box">
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
                  :class="item.className"
                  v-for="(item, index) in newLyric"
                  :key="index"
                >
                  <a href="javascript:;" @click="jump(item.time)"
                    ><i class="el-icon-video-play"></i
                  ></a>
                  {{ item.content }}
                </p>
              </div>
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
    <!-- 音乐播放标签 -->
    <audio
      ref="audioRef"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      :src="url"
      @ended="onEnded()"
      @stalled="onstalled"
    ></audio>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Bus from '@/plugin/eventBus'
export default {
  name: 'play',
  data() {
    return {
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
      // 是否显示声音控件
      displayVoice: false,

      // audioDOM
      audioEl: null,
      // 当前播放时间
      currentPlayTime: null,
      currentTime: null,
      // 歌曲进度
      songProgress: 0,
      // 音量
      volume: parseInt(window.localStorage.getItem('volume')),
      // 是否处于播放
      isPlay: false,
      // 最大播放时间
      maxPlayTime: '00:00',
      maxTime: null,
      // 是否拖拽
      isChange: false,
      // 播放方式
      // loop 循环
      // random 随机播放
      // oneLoop 单曲循环
      playMode: 'loop',
      // 节流阀
      throttle: false,
      // 歌词防抖定时器
      lyricTimer: null,
      isLyric: false,
      // 歌词
      newLyric: [],
      url: null,
      lyricsDOM: null
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
    setTimeout(() => {
      // 页面数据加载完成获取保存在本地的歌曲数据
      // 页面数据加载完成获取保存在本地的歌曲数据
      if (window.localStorage.getItem('songList')) {
        this.$store.commit(
          'setSongList',
          JSON.parse(window.localStorage.getItem('songList'))
        )
      }
      if (window.localStorage.getItem('currentPlay')) {
        this.$store.commit('setCurrentPlay', {
          song: JSON.parse(window.localStorage.getItem('currentPlay')),
          isPlay: 1
        })
      }
    }, 150)
    Bus.$on('display', (val) => {
      this.displayList = val
      this.displayVoice = val
    })
    window.addEventListener('mouseup', () => {
      if (this.isChange === true) {
        this.isChange = false
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
    this.audioEl = this.$refs.audioRef
    this.audioEl.volume = this.volume / 100
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
        if (bottom >= 0) {
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
        if (bottom <= -46) {
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
      document.querySelector('body').style = `
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
      // 当滚动时禁止歌词自动滚动
      this.isLyric = true
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
      contentEl.style.transform = `translateY(-${Math.ceil(y * contentZoom)}px)`
      barEl.style.top = y + 'px'
    },
    // 当鼠标松开
    up() {
      // 允许文字选中
      document.querySelector('body').style = `
          moz-user-select: -moz-select;
          -moz-user-select: select;
          -o-user-select:select;
          -khtml-user-select:select;
          -webkit-user-select:select;
          -ms-user-select:select;
          user-select:select;
          `
      this.isDown = false
      clearTimeout(this.lyricTimer)
      this.lyricTimer = setTimeout(() => {
        this.isLyric = false
      }, 1000)
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
          .getPropertyValue('transform')
          .replace(/[matrix()]+/g, '')
          .split(',')[5]
      )
      // 当滚动时禁止歌词自动滚动
      this.isLyric = true
      clearTimeout(this.lyricTimer)
      this.lyricTimer = setTimeout(() => {
        this.isLyric = false
      }, 1000)
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
        contentEl.style.transform = `translateY(${y}px)`
        barEl.style.top = `${Math.floor(Math.abs(y) * contentZoom)}px`
      } else {
        // 当前要移动的距离
        let y = this.contentY + speed
        // 限制可移动范围
        if (y >= 0) y = 0

        contentEl.style.transform = `translateY(${y}px)`
        barEl.style.top = `${Math.floor(Math.abs(y) * contentZoom)}px`
      }
    },
    // 删除歌曲列表所有歌曲
    delSongList(e, id) {
      // 调用删除函数
      this.$store.commit('removeSongList', id)
      // 重新判断是否需要滚动
      this.$nextTick(() => {
        // 判断是否需要滚动
        if (
          this.$refs.tableRef.offsetHeight >= this.$refs.contentRef.offsetHeight
        ) {
          this.$refs.barRef.style = 'height:0;border:0'
        } else {
          this.$refs.barRef.style.height =
            (this.$refs.tableRef.offsetHeight *
              this.$refs.tableRef.offsetHeight) /
              this.$refs.contentRef.offsetHeight +
            'px'
        }
        if (
          this.$refs.rightBoxRef.offsetHeight >=
          this.$refs.rightContentRef.offsetHeight
        ) {
          this.$refs.rightBarRef.style = 'height:0;border:0'
        } else {
          this.$refs.rightBarRef.style.height =
            (this.$refs.rightBoxRef.offsetHeight *
              this.$refs.rightBoxRef.offsetHeight) /
              this.$refs.rightContentRef.offsetHeight +
            'px'
        }
      })
      if (id === undefined) {
        this.$refs.contentRef.style.transform = 'translateY(0)'
      } else {
        const contentMax =
          this.$refs.contentRef.offsetHeight - this.$refs.tableRef.offsetHeight
        if (contentMax - 28 <= Math.abs(this.$refs.contentRef.offsetTop)) {
          this.$refs.contentRef.style.transform = `translateY(${
            this.$refs.contentRef.offsetTop + 28
          }px)`
          // 获取进度条的缩放值
          const barZoom =
            this.$refs.barRef.offsetHeight / this.$refs.contentRef.offsetHeight
          this.$refs.barRef.style.top =
            this.$refs.barRef.offsetTop + -(28 * barZoom) + 'px'
        }
      }
    },
    // 播放音乐
    play() {
      // 当页面正在播放的歌曲为空时不播放歌曲
      if (!this.currentPlay) return (this.isPlay = false)
      if (!this.isPlay) {
        this.$nextTick(() => {
          const playPremise = this.audioEl.play()
          if (playPremise !== undefined) {
            playPremise
              .then(() => {
                this.audioEl.play()
                this.isPlay = true
              })
              .catch((e) => {})
          }
        })
      } else {
        this.audioEl.pause()
        this.isPlay = false
      }
    },
    // 当歌曲源加载完毕获取到歌曲总时长
    onLoadedmetadata(e) {
      // 处理最大播放时间格式
      let m = parseInt(e.target.duration / 60)
      let s = parseInt(e.target.duration % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      this.maxPlayTime = m + ':' + s
      this.maxTime = e.target.duration
    },
    // 当歌曲播放时触发 会重复调用 用来获取当前播放时间
    onTimeupdate(e) {
      if (this.isChange) return
      // 处理最大播放时间格式
      let m = parseInt(e.target.currentTime / 60)
      let s = parseInt(e.target.currentTime % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      this.currentPlayTime = m + ':' + s
      this.currentTime = e.target.currentTime
      this.songProgress = parseInt(
        (e.target.currentTime / e.target.duration) * 100
      )

      // 当播放时间和歌词时间对应 调整歌词位置
      if (this.isLyric || !this.displayList) return
      const contentMax =
        this.$refs.rightContentRef.offsetHeight -
        this.$refs.rightBoxRef.offsetHeight
      const zoom =
        this.$refs.rightScrollRef.offsetHeight /
        this.$refs.rightContentRef.offsetHeight
      let y = 0
      this.newLyric.some((item, index) => {
        if (!this.newLyric[index + 1]) return true
        if (
          this.currentTime >= item.time &&
          this.currentTime <= this.lyric[index + 1].time
        ) {
          item.className = 'current'
          if (this.lyricsDOM[index] === undefined) return
          if (
            this.lyricsDOM[index].offsetTop < 32 * 3 ||
            this.lyricsDOM[index].offsetTop +
              28 -
              this.$refs.rightBoxRef.offsetHeight >=
              contentMax - 32 * 4
          ) {
            return true
          }
          y = -this.lyricsDOM[index].offsetTop + 32 * 3
        } else {
          item.className = ''
        }
      })
      this.$refs.rightContentRef.style.transform = `translateY(${y}px)`
      this.$refs.rightBarRef.style.top = -y * zoom + 'px'
      this.$refs.rightBarRef.style.height =
        this.$refs.rightContentRef.offsetHeight * zoom
    },
    // 将新的歌曲进度
    currentPlayChange(val) {
      this.audioEl.currentTime = parseInt((val / 100) * this.maxTime)
    },
    // 当鼠标发生拖拽时 歌曲事件变化
    currentPlayInput(val) {
      let m = parseInt(parseInt((val / 100) * this.maxTime) / 60)
      let s = parseInt(parseInt((val / 100) * this.maxTime) % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      this.currentPlayTime = m + ':' + s
    },
    // 当歌曲播放完最后一帧要执行的操作 单曲循环 顺序循环 列表
    onEnded(val) {
      if (this.throttle) return
      this.throttle = true
      // 获取到当前播放歌曲的索引
      const index = this.songList.findIndex(
        (item) => item.id === this.currentPlay.id
      )

      if (val === undefined) {
        if (this.playMode === 'loop') {
          // 列表循环
          if (!this.songList[index + 1]) {
            this.$store.commit('setCurrentPlay', this.songList[0])
          } else {
            this.$store.commit('setCurrentPlay', this.songList[index + 1])
          }
        } else if (this.playMode === 'oneLoop') {
          // 单曲循环
          // this.$store.commit('setCurrentPlay', this.songList[index])
          this.isPlay = false
          this.play()
        } else if (this.playMode === 'random') {
          // 随机播放
          const random = Math.floor(Math.random() * this.songList.length + 1)
          this.$store.commit('setCurrentPlay', this.songList[random])
        }
      } else if (val === 'next') {
        if (this.playMode === 'random') {
          // 随机播放
          const random = Math.floor(Math.random() * this.songList.length + 1)
          this.$store.commit('setCurrentPlay', this.songList[random])
        } else if (!this.songList[index + 1]) {
          this.$store.commit('setCurrentPlay', this.songList[0])
        } else {
          this.$store.commit('setCurrentPlay', this.songList[index + 1])
        }
      } else if (val === 'last') {
        if (this.playMode === 'random') {
          // 随机播放
          const random = Math.floor(Math.random() * this.songList.length + 1)
          this.$store.commit('setCurrentPlay', this.songList[random])
        } else if (!this.songList[index - 1]) {
          this.$store.commit(
            'setCurrentPlay',
            this.songList[this.songList.length - 1]
          )
        } else {
          this.$store.commit('setCurrentPlay', this.songList[index - 1])
        }
      }
    },
    // 点击歌词跳转按钮 跳转到指定进度
    jump(time) {
      this.audioEl.currentTime = time
      this.newLyric.forEach((item) => {
        item.className = ''
      })
    },
    // audio停止事件
    onstalled(e) {
      console.log(e)
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
            this.$refs.barRef.style = 'height:0;border:0'
          } else {
            this.$refs.barRef.style.height =
              (this.$refs.tableRef.offsetHeight *
                this.$refs.tableRef.offsetHeight) /
                this.$refs.contentRef.offsetHeight +
              'px'
          }
          if (
            this.$refs.rightBoxRef.offsetHeight >=
            this.$refs.rightContentRef.offsetHeight
          ) {
            this.$refs.rightBarRef.style = 'height:0;border:0'
          } else {
            this.$refs.rightBarRef.style.height =
              (this.$refs.rightBoxRef.offsetHeight *
                this.$refs.rightBoxRef.offsetHeight) /
                this.$refs.rightContentRef.offsetHeight +
              'px'
          }
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
      window.localStorage.setItem('isLock', val)
    },
    songList(val) {
      if (val.length) {
        this.$nextTick(() => {
          this.isLock = 1
          this.ishide = false
          clearTimeout(this.delayedTimer)
          clearInterval(this.hideTimer)
          this.show()
        })
        this.$nextTick(() => {
          // 判断是否需要滚动
          if (
            this.$refs.tableRef.offsetHeight >=
            this.$refs.contentRef.offsetHeight
          ) {
            this.$refs.barRef.style = 'height:0;border:0'
            this.$refs.contentRef.style.transform = 'translateY(0)'
          } else {
            this.$refs.barRef.style.height =
              (this.$refs.tableRef.offsetHeight *
                this.$refs.tableRef.offsetHeight) /
                this.$refs.contentRef.offsetHeight +
              'px'
          }
          if (
            this.$refs.rightBoxRef.offsetHeight >=
            this.$refs.rightContentRef.offsetHeight
          ) {
            this.$refs.rightBarRef.style = 'height:0;border:0'
          } else {
            this.$refs.rightBarRef.style.height =
              (this.$refs.rightBoxRef.offsetHeight *
                this.$refs.rightBoxRef.offsetHeight) /
                this.$refs.rightContentRef.offsetHeight +
              'px'
          }
        })
      } else {
        this.maxPlayTime = '00:00'
      }
    },
    // 当当前歌曲变化时
    currentPlay(val) {
      // 获取当前播放歌曲的DOM
      if (val) {
        this.$store.dispatch('getLyric', val.id)
        this.isPlay = false
        this.newLyric = []
        const topCurrentDOM = document.querySelector('li.current')
        this.$nextTick(() => {
          if (!topCurrentDOM) return
          // 获取最大移动距离
          const contentMax =
            this.$refs.contentRef.offsetHeight -
            this.$refs.tableRef.offsetHeight
          // 获取当前播放歌曲的DOM
          const currentDOM = document.querySelector('li.current')
          // 获取cententEl的top值
          const currentY =
            currentDOM.offsetTop -
            Math.abs(
              parseInt(
                window
                  .getComputedStyle(this.$refs.contentRef)
                  .getPropertyValue('transform')
                  .replace(/[matrix()]+/g, '')
                  .split(',')[5]
              )
            )
          let y = 0
          // 获取进度条区域与内容区域的缩放比例
          const contentZoom =
            this.$refs.scrollRef.offsetHeight /
            this.$refs.contentRef.offsetHeight
          if (currentY <= 0) {
            y = -currentDOM.offsetTop
          } else if (currentY + 10 >= this.$refs.tableRef.offsetHeight) {
            y = -(currentDOM.offsetTop - this.$refs.tableRef.offsetHeight) - 28
          } else {
            y = parseInt(
              window
                .getComputedStyle(this.$refs.contentRef)
                .getPropertyValue('transform')
                .replace(/[matrix()]+/g, '')
                .split(',')[5]
            )
          }
          if (
            topCurrentDOM.offsetTop === 0 &&
            currentDOM.offsetTop + 28 - this.$refs.tableRef.offsetHeight ===
              contentMax
          ) {
            y = -contentMax
          } else if (
            topCurrentDOM.offsetTop + 28 - this.$refs.tableRef.offsetHeight ===
              contentMax &&
            currentDOM.offsetTop === 0
          ) {
            y = 0
          }
          this.$refs.contentRef.style.transform = `translateY(${y}px)`
          this.$refs.barRef.style.top = `${Math.floor(
            Math.abs(y) * contentZoom
          )}px`
        })
      }
      this.audioEl.pause()
    },
    // 当歌词变化时
    lyric(val) {
      if (
        this.$refs.rightBoxRef.offsetHeight >=
        this.$refs.rightContentRef.offsetHeight
      ) {
        this.$refs.rightBarRef.style = 'height:0;border:0'
      } else {
        this.$refs.rightBarRef.style.height =
          (this.$refs.rightBoxRef.offsetHeight *
            this.$refs.rightBoxRef.offsetHeight) /
            this.$refs.rightContentRef.offsetHeight +
          'px'
        this.$refs.rightBarRef.style.top = 0
        this.$refs.rightContentRef.style.top = 0
      }
      this.$refs.rightContentRef.style.transform = 'translateY(0)'
      this.$refs.rightBarRef.style.top = 0
      if (val) {
        this.newLyric = val
        this.$nextTick(() => {
          this.lyricsDOM = document
            .querySelector('.lyric__content')
            .querySelectorAll('p')
        })
      }
    },
    // 歌曲URL改变
    songUrl(val) {
      if (val) {
        this.url = val.split('#')[0]
        this.audioEl.currentTime = 0
        // 第一次进入页面不会触发自动播放
        if (this.currentPlay && this.currentPlay.isPlay) return
        this.throttle = false
        this.play()
      }
    },
    // 改变音量
    volume(val) {
      this.audioEl.volume = val / 100
      window.localStorage.setItem('volume', val)
    }
  },
  computed: {
    ...mapState(['songList', 'currentPlay', 'lyric', 'songUrl']),
    ...mapGetters(['songTotal'])
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
      // 当播放时
      .play__open {
        float: left;
        margin: 11px 10px 0 10px;
        width: 36px;
        height: 36px;
        background: url('../assets/uploads/playbar.png') no-repeat 0 -165px;
      }
      .play__open:hover {
        background: url('../assets/uploads/playbar.png') no-repeat -40px -165px;
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
          height: 18px;
          margin-bottom: 5px;
          a {
            float: left;
            height: 16px;
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
            float: left;
            margin-left: 15px;
            span {
              float: left;
              height: 14px;
              color: #9b9b9b;
              i {
                float: left;
                margin-top: 1px;
              }
              a {
                float: left;
                display: inline-block;
                height: 100%;
                color: #9b9b9b;
              }
            }
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
        .mute {
          background-position: -104px -69px !important;
        }
        .mute:hover {
          background-position: -126px -69px !important;
        }
        // 列表循环
        .loop {
          background-position: -3px -344px;
        }
        .loop:hover {
          background-position: -33px -344px;
        }
        // 随机播放
        .random {
          background-position: -66px -248px;
        }
        .random:hover {
          background-position: -93px -248px;
        }
        // 单曲循环
        .oneLoop {
          background-position: -66px -344px;
        }
        .oneLoop:hover {
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
          z-index: 999;
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
        > img {
          width: 100%;
          height: 100%;
          filter: blur(10px) saturate(50%);
        }
        .body__left {
          position: relative;
          z-index: 1;
          width: 560px;
          height: 261px;
          .body__table {
            float: left;
            width: 553px;
            height: 261px;
            background-color: rgba(22, 22, 22, 0.8);
            .el-empty {
              padding-top: 70px;
              /deep/ .el-empty__image {
                display: none;
              }
            }
            .tips {
              color: #aaa;
              text-align: center;
              line-height: 43px;
              font-size: 12px;
              a {
                color: #aaa;
                text-decoration: underline;
              }
              i {
                display: inline-block;
                width: 36px;
                height: 29px;
                background: url('../assets/uploads/playlist.png') no-repeat -138px
                  0;
                vertical-align: middle;
                margin-right: 3px;
              }
            }
            ul {
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
                  margin-left: 170px;
                }
                .play__author {
                  width: 90px;
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
                    background: url('../assets/uploads/playlist.png') no-repeat -100px
                      0;
                    margin-top: 5px;
                    margin-left: 25px;
                    cursor: default;
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
              background-color: rgba(0, 0, 0, 0.5);
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
              width: 7px;
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
          background: rgba(22, 22, 22, 0.5);
          .box {
            width: 380px;
            height: 219px;
            margin: 20px auto;
            overflow: hidden;
            .lyric__content {
              transition: all 0.2s;
              transform: translateY(0);
              p {
                position: relative;
                text-align: center;
                color: #989898;
                line-height: 32px;
                transition: all 0.3s;
                a {
                  position: absolute;
                  display: none;
                  top: 50%;
                  transform: translateY(-50%);
                  left: 0;
                  i {
                    color: #989898;
                  }
                }
              }
              p:hover a {
                display: inline-block;
              }
              p.current {
                font-size: 14px;
                color: #fff;
              }
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
              width: 6px;
              height: 100px;
              background-color: #868686;
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
    width: 450px;
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
