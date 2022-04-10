<template>
  <div
    class="simple-video__container"
    ref="simpleVideoRef"
    @fullscreenchange="fullscreenchange"
    @webkitfullscreenchange="fullscreenchange"
    @mozfullscreenchange="fullscreenchange"
  >
    <!-- 视频区域 -->
    <video
      ref="videoRef"
      :src="currentSrc"
      @timeupdate="timeupdate"
      @loadedmetadata="loadedmetadata"
      @waiting="waiting"
      @playing="playing"
      @error="error"
      @play="playd"
      @pause="paused"
      @canplaythrough="canplaythrough"
      @ended="ended"
    ></video>
    <!-- 控件区域 -->
    <div
      class="controls__box"
      @click.self="!isDown && pause()"
      @mouseover="hide"
      @mouseout="show"
    >
      <div class="title" v-show="isFullScreen">
        <h3>{{ `${name}-${artistName}` }}</h3>
        <div class="btn">
          <a
            href="javascript:;"
            class="fabulous"
            @click="$emit('fabulous', { state: liked, id })"
          >
            <i :class="liked && 'already'"></i>
          </a>
          <a
            href="javascript:;"
            class="collection"
            @click="$emit('collection', { state: subed, id })"
          >
            <i :class="subed && 'already'"></i>
          </a>
          <a href="javascript:;" class="share" @click="share">
            <i></i>
          </a>
        </div>
      </div>
      <!-- 底部控件 -->
      <div
        :class="['controls', isControls ? 'controls__show' : '']"
        @mousedown="isDown = true"
        @mouseup="isDown = false"
      >
        <!-- 播放 -->
        <a
          href="javascript:;"
          :class="['controls__play', isPaused ? '' : 'controls__pause']"
          @click="isPaused ? play() : pause()"
        ></a>
        <!-- 进度条 -->
        <div class="controls__progress">
          <!-- 开始时间 -->
          <span class="startTime">{{ currentTime | time }}</span>
          <!-- 进度条 -->
          <div class="progress">
            <el-slider
              v-model="videoProgress"
              :show-tooltip="false"
              @input="progressInput"
              @change="progressChange"
              @mousedown.native="progressDrag = true"
              @mousemove.native="progressMove"
              @mouseenter.native="isTooltip = true"
              @mouseleave.native="isTooltip = false"
              :disabled="!isPlay"
              ref="progressRef"
            ></el-slider>
            <el-progress
              :percentage="(cacheTime / endTime) * 100 || 0"
              color="rgba(255, 255, 255, 0.3)"
              :show-text="false"
            ></el-progress>
            <div
              class="tooltip"
              ref="tooltipRef"
              v-show="isPlay && isTooltip"
              @mouseenter="isTooltip = true"
              @mouseleave="isTooltip = false"
              @click="tooltipSpeed"
            >
              <span class="tooltip__time">{{ tooltipTime | time }}</span>
              <span class="tooltip__arrow" ref="tooltipArrowRef"></span>
            </div>
          </div>
          <!-- 结束时间 -->
          <span class="endTime">{{ endTime | time }}</span>
        </div>
        <!-- 功能按钮 -->
        <div class="controls__fun">
          <!-- 音量 -->
          <div
            class="volume"
            @mouseover="isVolume = true"
            @mouseout="isVolume = false"
          >
            <a href="javascript:;" :class="volume == 0 ? 'mute' : ''"></a>
            <div
              class="volume__progress"
              v-show="isVolume || volumeDown"
              @mousedown="volumeDown = true"
            >
              <el-slider
                v-model="volume"
                vertical
                height="70px"
                :show-tooltip="false"
                @input="volumeInput"
              >
              </el-slider>
            </div>
          </div>
          <!-- 画质 -->
          <div
            class="definition"
            @mouseover="isDefinition = true"
            @mouseout="isDefinition = false"
            v-if="definition"
          >
            <span>{{ definition[currentDefinition].name }}</span>
            <div class="definition__option" v-show="isDefinition">
              <div
                class="option__item"
                v-for="(item, index) in definition"
                :key="index"
                @click="definitionChange(item, index)"
              >
                <span :class="currentDefinition == index ? 'select' : ''">{{
                  item.name
                }}</span>
              </div>
            </div>
          </div>
          <!-- 全屏 -->
          <div :class="['fullScreen', isFullScreen ? 'exitFullscreen' : '']">
            <a href="javascript:;" @click="fullScreen"></a>
          </div>
        </div>
      </div>
      <!-- 播放出错时 -->
      <div class="error" v-show="isError">
        <div class="error__item">
          <h4>连接失败，请重试</h4>
          <a href="javascript:;" @click="againPlay">重新连接</a>
        </div>
      </div>
    </div>
    <!-- 播放视频 -->
    <a
      href="javascript:;"
      v-show="!isEnd && isPaused && !isError"
      class="play"
      @click="play"
    ></a>
    <!-- 视频加载中 -->
    <div v-show="isLoad && !isPaused && !isError" class="isLoad"></div>
    <!-- 播放结束 -->
    <div class="end" v-show="isEnd">
      <div class="end__box">
        <p v-if="isNext">
          {{ '即将自动为您播放：' + nextName }}
        </p>
        <div class="btns">
          <div class="again">
            <a href="javascript:;" @click="againPlay"></a>
            <p>重播</p>
          </div>
          <div class="next" v-if="isNext">
            <a href="javascript:;" class="icon" ref="nextRef" @click="next">
              <canvas width="74" height="74" ref="nextCanvasRef"></canvas>
            </a>
            <a href="javascript:;" class="btn" @click="cancelNext">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'simple-video',
  props: {
    // 当前播放视频src
    currentSrc: {
      type: String,
      default: ''
    },
    // 清晰度
    definition: {
      type: [Array, Boolean],
      default: () => [
        { name: '1080P', br: 1080 },
        { name: '超清', br: 720 },
        { name: '高清', br: 480 },
        { name: '标清', br: 240 }
      ]
    },
    // 视频名称
    name: {
      type: String,
      default: ''
    },
    // 视频id
    id: {
      type: [String, Number],
      default: 0
    },
    // 作者名称
    artistName: {
      type: String,
      default: ''
    },
    // 下一个视频名称
    nextName: {
      type: String,
      default: ''
    },
    // 下一个视频id
    nextId: {
      type: [String, Number],
      default: 0
    },
    // 点赞状态
    liked: {
      type: Boolean,
      default: false
    },
    // 收藏状态
    subed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // video dom
      videoEl: null,
      // 是否显示控件
      isControls: true,
      // 控件定时器
      controlsTimer: null,
      // 是否全屏
      isFullScreen: false,
      // 是否按下
      isDown: false,
      // is音量
      isVolume: false,
      // 当音量被拖动时
      volumeDown: false,
      // is definition
      isDefinition: false,
      // 当前进度
      currentTime: 0,
      // 当前缓存完成进度
      cacheTime: 0,
      // 总时长
      endTime: 0,
      // 视频进度条进度
      videoProgress: 0,
      // 进度条正在拖拽
      progressDrag: false,
      // 视频是否加载中
      isLoad: false,
      // 视频出错
      isError: false,
      // 音量
      volume: parseInt(localStorage.getItem('videoVolume')) || 50,
      // 当前清晰度
      currentDefinition:
        parseInt(localStorage.getItem('currentDefinition')) || 0,
      // 是否暂停
      isPaused: true,
      // 视频可播放
      isPlay: false,
      // tooltip时间
      tooltipTime: 0,
      // tooltip 位置
      tooltipX: 0,
      // 是否显示 tooltip
      isTooltip: false,
      // 最大移动距离
      tooltipMax: 0,
      // 是否播放完
      isEnd: false,
      // 圆形配置
      canvasCircular: {
        timer: null,
        time: 5,
        currentTime: 5,
        percent: 0,
        refreshTime: 10
      },
      isNext: true
    }
  },
  mounted() {
    // 获取video dom
    this.videoEl = this.$refs.videoRef
    window.addEventListener('mouseup', () => {
      this.volumeDown = false
      this.progressDrag = false
    })
  },
  methods: {
    // 视频可播放时
    loadedmetadata() {
      this.endTime = this.videoEl.duration
      this.videoEl.currentTime = this.currentTime
    },
    canplaythrough() {
      this.isError = false
      this.isPlay = true
    },
    // 播放视频
    play() {
      this.videoEl.play().catch((err) => err)
    },
    // 暂停视频
    pause() {
      if (this.isPaused) return this.play()
      this.videoEl.pause()
    },
    // 控件显示隐藏 start
    hide() {
      clearTimeout(this.controlsTimer)
      this.isControls = true
    },
    show() {
      if (this.isPaused) return
      this.controlsTimer = setTimeout(() => {
        this.isControls = false
      }, 5000)
    },
    // 控件显示隐藏 end

    // 全屏
    fullScreen() {
      // 退出全屏
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozExitFullscreen) {
          document.mozExitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      } else {
        // 进入全屏
        if (this.$refs.simpleVideoRef.requestFullScreen) {
          this.$refs.simpleVideoRef.requestFullScreen()
        } else if (this.$refs.simpleVideoRef.mozRequestFullScreen) {
          this.$refs.simpleVideoRef.mozRequestFullScreen()
        } else if (this.$refs.simpleVideoRef.webkitRequestFullScreen) {
          this.$refs.simpleVideoRef.webkitRequestFullScreen()
        }
      }
    },
    // 当全屏状态发生变化
    fullscreenchange() {
      // 判断是否为全屏
      this.isFullScreen = !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
      )
    },
    // 当前播放进度变化
    timeupdate() {
      if (this.progressDrag || !this.isPlay) return
      // 获取缓存对象
      const buffered = this.videoEl.buffered
      this.currentTime = this.videoEl.currentTime
      if (buffered.length) {
        this.cacheTime = buffered.end(buffered.length - 1)
      }
      this.videoProgress = (this.currentTime / this.endTime) * 100
    },
    // 鼠标拖拽进度条松开
    progressChange(val) {
      this.videoEl.currentTime = (val * this.endTime) / 100
    },
    // 鼠标拖拽进度条
    progressInput(val) {
      this.currentTime = (val * this.endTime) / 100
    },
    // 视频加载时
    waiting() {
      this.isLoad = true
    },
    // 视频加载结束
    playing() {
      this.isLoad = false
    },
    // 播放错误时
    error() {
      this.isError = true
      this.isPlay = false
    },
    // 重新播放
    againPlay() {
      this.currentTime = 0
      this.videoProgress = (this.currentTime / this.endTime) * 100
      this.isEnd = false
      this.$emit('load', {
        val: this.definition[this.currentDefinition],
        index: this.currentDefinition
      })
      this.videoEl.addEventListener('canplay', this.play)
    },
    // 音量改变
    volumeInput(val) {
      this.videoEl.volume = val / 100
      localStorage.setItem('videoVolume', val)
    },
    // 画质切换
    definitionChange(val, index) {
      if (this.currentDefinition === index) return
      if (index > this.definition.length) index = this.definition.length
      this.currentDefinition = index
      localStorage.setItem('currentDefinition', index)
      this.isLoad = true
      this.isPlay = false
      this.$emit('definition', { val, index })
      this.videoEl.addEventListener('canplay', this.play)
    },
    // 监听暂停事件
    paused() {
      this.isPaused = true
    },
    // 监听播放事件
    playd() {
      this.isPaused = false
    },
    // 触摸滚动条显示时间
    progressMove(e) {
      const parentEl = this.$refs.simpleVideoRef
      const el = this.$refs.progressRef.$el
      const elchild = el.lastChild
      let x = null
      this.tooltipMax = elchild.offsetWidth
      if (e.target === el || e.target === elchild) {
        x = e.offsetX
      } else {
        x = e.pageX - (el.offsetParent.offsetLeft + parentEl.offsetLeft)
      }
      if (x >= this.tooltipMax) {
        x = this.tooltipMax
      } else if (x <= 0) {
        x = 0
      }
      const progress = (x / this.tooltipMax) * 100
      const time = (progress * this.endTime) / 100
      this.tooltipTime = time
      this.tooltipX = x
    },
    // 点击tooltip切换进度
    tooltipSpeed() {
      this.videoProgress = (this.tooltipTime / this.endTime) * 100
      this.videoEl.currentTime = this.tooltipTime
    },
    // 视频播放结束
    ended() {
      this.isEnd = true
      this.$nextTick(() => {
        this.isNext && this.draw()
      })
    },
    draw() {
      clearInterval(this.canvasCircular.timer)
      const nextEl = this.$refs.nextRef
      // 半径
      const radius = nextEl.offsetWidth / 2
      this.canvasCircular.timer = setInterval(() => {
        if (this.canvasCircular.percent >= 1) {
          return clearInterval(this.canvasCircular.timer)
        }
        const canvas = this.$refs.nextCanvasRef
        canvas.width = 74
        canvas.height = 74
        const ctx = canvas.getContext('2d')
        // 开始画x轴，y轴
        ctx.beginPath()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 3
        ctx.arc(
          radius,
          radius,
          radius - 8,
          (3 / 2) * Math.PI,
          (3 / 2) * Math.PI + 2 * Math.PI * this.canvasCircular.percent
        )
        ctx.stroke()
        ctx.closePath()
        this.canvasCircular.percent +=
          (this.canvasCircular.refreshTime * 1.0) /
          (this.canvasCircular.time * 1000)
        this.canvasCircular.currentTime =
          this.canvasCircular.time * this.canvasCircular.percent
      }, this.canvasCircular.refreshTime)
    },
    cancelNext() {
      clearInterval(this.canvasCircular.timer)
      this.isNext = false
    },
    next() {
      clearInterval(this.canvasCircular.timer)
      this.$emit('next', this.nextId)
    },
    // 分享
    share() {
      this.fullScreen()
      this.$emit('share')
    }
  },
  filters: {
    time(value) {
      let m = 0
      let s = 0
      m = parseInt(value / 60)
      s = parseInt(value % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    }
  },
  watch: {
    // 监听页面进入时画质
    currentDefinition: {
      handler(val) {
        if (val) {
          this.$emit('definition', {
            val: this.definition[val],
            index: val
          })
        }
      }
    },
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$emit('definition', {
            val: this.definition[this.currentDefinition],
            index: this.currentDefinition
          })
        }
      }
    },
    // 监听tooltip位置变化
    tooltipX(val) {
      const tooltipEl = this.$refs.tooltipRef
      const tooltipArrowEl = this.$refs.tooltipArrowRef
      let left = val - tooltipEl.offsetWidth / 2
      if (left <= 0) {
        left = 0
      } else if (left + tooltipEl.offsetWidth >= this.tooltipMax) {
        left = this.tooltipMax - tooltipEl.offsetWidth
      }
      let arrowLeft = val - left - tooltipArrowEl.offsetWidth / 2
      if (Math.abs(arrowLeft) >= tooltipArrowEl.offsetWidth / 2 - 8) {
        if (arrowLeft <= 0) {
          arrowLeft = -tooltipArrowEl.offsetWidth / 2 + 8
        } else {
          arrowLeft = tooltipArrowEl.offsetWidth / 2 - 8
        }
      }
      tooltipArrowEl.style.left = arrowLeft + 'px'
      tooltipEl.style.left = left + 'px'
    },
    // 监听是否大于规定的时间
    'canvasCircular.currentTime': {
      handler(val) {
        if (val >= 5) {
          this.$emit('next', this.nextId)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.simple-video__container {
  position: relative;
  height: 362px;
  video {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background: #000;
  }
  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 74px;
    height: 74px;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 50%;
    background: url('../../assets/uploads/play.png') no-repeat center center;
    z-index: 99;
  }
  .play:hover {
    background: url('../../assets/uploads/play_hover.png') no-repeat center
      center;
  }
  .isLoad {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -12.5px 0 0 -12.5px;
    width: 25px;
    height: 25px;
    background: url('../../assets/uploads/loading.png') no-repeat center center;
    z-index: 99;
    animation: 2s linear infinite forwards video-loading-spin;
    @keyframes video-loading-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }
  .controls__box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      font-size: 18px;
      h3 {
        flex: 1;
        font-weight: normal;
      }
      .btn {
        display: flex;
        align-items: center;
        a {
          display: flex;
          width: 61px;
          height: 16px;
          align-items: center;
          justify-content: center;
          i {
            display: inline-block;
            width: 36px;
            height: 36px;
          }
        }
        .fabulous {
          i {
            background: url('../../assets/uploads/fabulous.png') no-repeat
              center;
          }
          i:hover {
            background: url('../../assets/uploads/fabulous_hover.png') no-repeat
              center;
          }
          .already {
            background: url('../../assets/uploads/fabulousActive.png') no-repeat
              center;
          }
          .already:hover {
            background: url('../../assets/uploads/fabulousActive_hover.png')
              no-repeat center;
          }
        }
        .collection {
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-width: 0 1px;
          i {
            background: url('../../assets/uploads/collection.png') no-repeat
              center;
          }
          i:hover {
            background: url('../../assets/uploads/collection_hover.png')
              no-repeat center;
          }
          .already {
            background: url('../../assets/uploads/collectionActive.png')
              no-repeat center;
          }
          .already:hover {
            background: url('../../assets/uploads/collectionActive_hover.png')
              no-repeat center;
          }
        }
        .share {
          i {
            background: url('../../assets/uploads/share.png') no-repeat center;
          }
          i:hover {
            background: url('../../assets/uploads/share_hover.png') no-repeat
              center;
          }
        }
      }
    }
    .controls {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 42px;
      background: url('../../assets/uploads/controls_bg.png') repeat-x;
      transform: translateY(100%);
      transition: transform 0.2s ease-in;
      .controls__play {
        width: 34px;
        height: 32px;
        margin: 0 6px;
        background: url('../../assets/uploads/miniPlay.png') no-repeat center
          center;
      }
      .controls__play:hover {
        background: url('../../assets/uploads/miniPlay_hover.png') no-repeat
          center center;
      }
      .controls__pause {
        background: url('../../assets/uploads/miniPause.png') no-repeat center
          center;
      }
      .controls__pause:hover {
        background: url('../../assets/uploads/miniPause_hover.png') no-repeat
          center center;
      }
      .controls__progress {
        flex: 1;
        display: flex;
        .startTime,
        .endTime {
          color: rgba(255, 255, 255, 0.5);
        }
        .progress {
          position: relative;
          flex: 1;
          margin: 0 10px;
          .el-progress {
            top: -4px;
            z-index: 98;
            height: 4px;
            /deep/ .el-progress-bar {
              height: 100%;
              .el-progress-bar__outer {
                height: 100% !important;
                background-color: transparent !important;
              }
            }
          }
          .el-slider {
            position: relative;
            z-index: 99;
          }
          .tooltip {
            position: absolute;
            top: -23px;
            min-width: 44px;
            cursor: pointer;
            .tooltip__time {
              border: 1px solid rgba(255, 255, 255, 0.2);
              padding: 5px;
              background: rgba(0, 0, 0, 0.7);
              color: #fff;
              line-height: 1.42857;
            }
            .tooltip__arrow {
              position: absolute;
              bottom: -10px;
              left: 0;
              width: 100%;
              height: 7px;
              background: url('../../assets/uploads/tooltip.png') no-repeat;
              background-position: center top;
            }
          }
        }
      }
      .controls__fun {
        width: 135px;
        display: flex;
        padding-left: 10px;
        .volume,
        .fullScreen,
        .definition {
          flex: 1;
          position: relative;
          a {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 36px;
          }
        }
        .volume {
          position: relative;
          > a {
            background: url('../../assets/uploads/volume.png') no-repeat center
              center;
          }
          > a:hover {
            background: url('../../assets/uploads/volume_hover.png') no-repeat
              center center;
          }
          .mute {
            background: url('../../assets/uploads/mute.png') no-repeat center
              center;
          }
          .mute:hover {
            background: url('../../assets/uploads/mute_hover.png') no-repeat
              center center;
          }
          .volume__progress {
            position: absolute;
            transform: translate(8px, -110%);
            width: 22px;
            height: 86px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(0, 0, 0, 0.7);
            .el-slider {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              height: 100%;
              margin-top: 8px;
              /deep/ .el-slider__runway {
                width: 4px;
                margin-top: 0;
                .el-slider__bar {
                  width: 100%;
                }
                .el-slider__button-wrapper {
                  width: 16px;
                  height: 16px;
                  margin-top: 0;
                  cursor: pointer !important;
                  .el-slider__button {
                    margin-right: -18px;
                    background: url('../../assets/uploads/miniProgressBtn.png')
                      no-repeat center;
                  }
                  .el-slider__button:hover {
                    background: url('../../assets/uploads/miniProgressBtn_hover.png')
                      no-repeat center;
                  }
                }
              }
            }
          }
          .volume__progress:before {
            content: '';
            position: absolute;
            bottom: -7px;
            background: url('../../assets/uploads/volumeBg.png') no-repeat
              center top;
            width: 100%;
            height: 7px;
          }
        }
        .fullScreen {
          a {
            background: url('../../assets/uploads/fullscreen.png') no-repeat
              center center;
          }
          a:hover {
            background: url('../../assets/uploads/fullscreen_hover.png')
              no-repeat center center;
          }
        }
        .exitFullscreen {
          a {
            background: url('../../assets/uploads/exitFullscreen.png') no-repeat
              center center;
          }
          a:hover {
            background: url('../../assets/uploads/exitFullscreen_hover.png')
              no-repeat center center;
          }
        }
        .definition {
          position: relative;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-width: 0 1px;
          padding: 0 3px;
          > span {
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
          }
          > span:hover {
            color: rgba(255, 255, 255, 1);
          }
          .definition__option {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 21px;
            width: 66px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom: none;
            background: rgba(0, 0, 0, 0.7);
            .option__item {
              height: 26px;
              border-top: 1px solid rgba(255, 255, 255, 0.2);
              line-height: 26px;
              span {
                display: inline-block;
                height: 100%;
                width: 100%;
                color: #fff;
                cursor: pointer;
                text-indent: 5px;
              }
            }
            .option__item:hover {
              background: rgba(255, 255, 255, 0.2);
              border-top-color: transparent;
            }
            .select {
              position: relative;
              background: rgba(255, 255, 255, 0.2) !important;
              border-top-color: transparent !important;
            }
            .select:before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 6px;
              width: 10px;
              height: 8px;
              background: url('../../assets/uploads/select.png') no-repeat
                center;
            }
          }
          .definition__option:before {
            content: '';
            position: absolute;
            bottom: -7px;
            left: 0;
            background: url('../../assets/uploads/volumeBg.png') no-repeat
              center top;
            width: 100%;
            height: 7px;
          }
        }
      }
    }
    .controls__show {
      transform: translateY(0);
    }
    .error {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      .error__item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h4 {
          font-size: 18px;
          font-weight: normal;
          color: #a5a7a8;
        }
        a {
          display: block;
          width: 140px;
          height: 40px;
          line-height: 36px;
          margin-top: 27px;
          box-sizing: border-box;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          font-size: 14px;
          color: #a5a7a8;
          text-align: center;
        }
        a::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 8px;
          background: url('../../assets/uploads/loading2.png') no-repeat center
            center;
          vertical-align: middle;
          margin-top: -2px;
        }
        a:hover {
          color: #fff;
        }
        a:hover::before {
          background: url('../../assets/uploads/loading2_hover.png') no-repeat
            center center;
        }
      }
    }
  }
  .el-slider {
    /deep/ .el-slider__runway {
      margin: 0;
      float: left;
      margin-top: 5px;
      height: 4px;
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.2);
      .el-slider__bar {
        height: 100%;
        background-color: #b2072a;
      }
      .el-slider__button-wrapper {
        width: 24px;
        height: 24px;
        margin-top: 5px;
        cursor: pointer !important;
        .el-slider__button {
          background: url('../../assets/uploads/progressBtn.png') no-repeat
            center;
          border: none;
          cursor: pointer !important;
        }
        .el-slider__button:hover {
          background: url('../../assets/uploads/progressBtn_hover.png')
            no-repeat center;
        }
        .el-slider__button {
          transform: scale(1);
        }
      }
    }
  }
  .end {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    .end__box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      > p {
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
      }
      .btns {
        display: flex;
        justify-content: center;
        margin: 43px 0 45px;
        .again {
          a {
            display: block;
            width: 74px;
            height: 74px;
            background: url('../../assets/uploads/again.png') no-repeat center;
          }
          a:hover {
            background: url('../../assets/uploads/again_hover.png') no-repeat
              center;
          }
          p {
            height: 26px;
            margin-top: 8px;
            font-size: 14px;
            color: #a5a7a8;
            text-align: center;
            line-height: 26px;
          }
        }
        .next {
          margin-left: 50px;
          text-align: center;
          .icon {
            display: block;
            width: 74px;
            height: 74px;
            background: url('../../assets/uploads/play.png') no-repeat center;
          }
          .icon:hover {
            background: url('../../assets/uploads/play_hover.png') no-repeat
              center;
          }
          .btn {
            display: inline-block;
            height: 26px;
            margin-top: 8px;
            background-color: rgba(255, 255, 255, 0.2);
            margin-top: 7px;
            padding: 0 10px;
            text-align: center;
            color: #a5a7a8;
            font-size: 14px;
            line-height: 26px;
            border-radius: 9999px;
          }
        }
      }
    }
  }
}
</style>
