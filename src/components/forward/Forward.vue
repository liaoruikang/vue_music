<template>
  <div class="forward __container">
    <LoginHeader>分享</LoginHeader>
    <el-row class="forward__main">
      <!-- tab栏区域 -->
      <el-row class="forward__tab">
        <ul>
          <li :class="active === 'share' ? 'current' : 'li'">
            <a href="javascript:;" @click="active = 'share'">分享给大家</a>
          </li>
          <li :class="active === 'private' ? 'current' : 'li'">
            <a href="javascript:;" @click="active = 'private'">私信分享</a>
          </li>
        </ul>
      </el-row>
      <!-- 内容区域 -->
      <el-row class="share__content" v-show="active === 'share'">
        <el-form v-model="shareForm">
          <div
            data-text="说点什么吧"
            class="textarea"
            ref="textareaRef"
            @input="textareaChange"
            @blur="blur"
            @focus="textareaChange"
            @keydown="option"
          ></div>
          <div
            class="at__list"
            :style="{ display: isAt ? 'block' : 'none' }"
            ref="atRef"
          >
            <p>
              {{
                newFollows && newFollows.length === 0
                  ? '轻敲空格完成输入'
                  : '选择最近@的人或直接输入'
              }}
            </p>
            <div>
              <a
                :class="index == current ? 'active' : ''"
                v-for="(item, index) in newFollows"
                :key="item.userId"
                @click="getAtName(item.nickname)"
              >
                {{ item.nickname }}
              </a>
            </div>
          </div>
          <p class="share__name">{{ shareName.content }}</p>
        </el-form>
        <div class="share__f">
          <a
            href="javascript:;"
            @mouseup="
              () => {
                $refs.textareaRef.innerHTML += '@'
                getFocus('@')
              }
            "
            class="share__at"
          ></a>
          <span
            :style="{ color: total < 0 ? 'red' : '#999' }"
            class="share__total"
            >{{ total }}</span
          >
        </div>
        <div class="share__btn">
          <a href="javascript:;" class="shareBtn" @click="share"><i>分享</i></a>
          <a href="javascript:;" class="cancel" @click="cancel"><i>取消</i></a>
        </div>
      </el-row>
      <!-- 私信分享区域 -->
      <el-row class="private__content" v-show="active === 'private'">
        <el-select
          v-model="privateForm.user_id"
          multiple
          style="margin-left: 20px"
          placeholder="选择或输入好友昵称"
        >
          <el-option
            v-for="item in newFollows"
            :key="item.userId"
            :value="item.userId"
            :label="item.nickname"
            >{{ item.nickname }}</el-option
          >
        </el-select>
        <el-form v-model="privateForm">
          <div
            data-text="说点什么吧"
            ref="privateRef"
            class="textarea private__textarea"
            :contentEditable="true"
            @keydown="privateForm.msg = $refs.privateRef.innerHTML"
          ></div>
          <p class="share__name">{{ shareName && shareName.content }}</p>
        </el-form>
        <div class="share__f">
          <span
            :style="{ color: total < 0 ? 'red' : '#999' }"
            class="share__total"
            >{{ total }}</span
          >
        </div>
        <div class="share__btn">
          <a href="javascript:;" class="shareBtn" @click="privateShare"
            ><i>分享</i></a
          >
          <a href="javascript:;" class="cancel" @click="cancel"><i>取消</i></a>
        </div>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import PinyinMatch from 'pinyin-match'
import Bus from '@/plugin/eventBus'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'forward',
  data() {
    return {
      shareForm: {
        // 资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
        id: null,
        // 资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
        type: '',
        //  内容，140 字限制，支持 emoji，@用户名 图片暂不支持
        msg: ''
      },
      // share  private
      active: 'share',
      // 是否显示@列表
      isAt: false,
      y: [],
      x: [],
      event: null,
      currentAt: null,
      current: 0,
      // 私信数据表单
      privateForm: {
        user_id: [],
        id: null,
        msg: ''
      }
    }
  },
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', val)
    })
    this.getFollows(this.userId)
  },
  mounted() {
    this.$refs.textareaRef.contentEditable = true

    setTimeout(() => {
      this.shareForm.type = this.shareName.type
      this.shareForm.id = this.$store.state.songId
      this.privateForm.id = this.$store.state.songId
    }, 100)
  },
  methods: {
    textareaChange(e) {
      this.event = e
      this.shareForm.msg = e.target.innerText
      // @符开始的位置
      const startReg = /@$/
      if (startReg.test(this.shareForm.msg)) {
        // 获取到最后的一个@的位置添加元素 获取元素位置显示盒子
        const span = document.createElement('span')
        span.className = 'textarea__span'
        e.target.appendChild(span)
        this.y.push(span.offsetTop)
        this.x.push(span.offsetLeft)
        e.target.removeChild(span)
      }

      // 当清除@时匹配上一个@存在不 存在就显示盒子
      const tatolReg = /@/g
      const tatol = this.shareForm.msg.match(tatolReg)
      if (tatol) {
        this.y = this.y.filter((item, index) => index < tatol.length)
        this.x = this.x.filter((item, index) => index < tatol.length)
      }

      if (tatol) {
        this.$refs.atRef.style.top = this.y[tatol.length - 1] + 18 + 'px'
        // 获取最大x移动距离
        const xMax = this.$refs.atRef.parentNode.offsetWidth - 165
        if (this.x[tatol.length - 1] - 12 < xMax) {
          this.$refs.atRef.style.left = this.x[tatol.length - 1] - 12 + 'px'
        } else {
          this.$refs.atRef.style.left = xMax + 'px'
        }
      } else {
        this.x = []
        this.y = []
      }

      // 控制盒子显示隐藏
      const endReg = /@[^\s@]{0,20}$/
      this.currentAt =
        this.shareForm.msg.match(endReg) && this.shareForm.msg.match(endReg)[0]
      if (this.currentAt) {
        this.currentAt = this.currentAt = this.currentAt.replace('@', '')
      }
      if (endReg.test(this.shareForm.msg)) {
        this.isAt = true
      } else {
        this.isAt = false
      }
    },
    // 取消
    cancel() {
      this.$store.commit('setCFDVisible', {
        display: false,
        component: null,
        songId: null
      })
    },
    ...mapActions('forward', {
      getFollows: 'getFollows',
      shareSong: 'shareSong',
      privateSong: 'privateSong',
      privateSongs: 'privateSongs'
    }),
    // 将好友名称添加到输入框中
    getAtName(val) {
      const at = this.$refs.textareaRef.innerText.match(
        /([^@]+)|(@[\S]{0,20})/g
      )
      if (at[at.length - 1].includes('@')) {
        at[at.length - 1] = '@' + val + '&nbsp;'
        this.$refs.textareaRef.innerHTML = at.join('')
      } else {
        this.$refs.textareaRef.innerHTML = `${at.join('') + val}&nbsp;`
      }
      this.textareaChange(this.event)
      this.getFocus()
    },
    // 当失去焦点时取消显示 添加延时器让click事件提前触发
    blur() {
      this.blurTimer = setTimeout(() => (this.isAt = false), 100)
    },
    // 获取焦点
    getFocus() {
      // 获取焦点
      this.focusTimer = setTimeout(() => {
        this.$refs.textareaRef.focus()
        const range = document.createRange()
        range.selectNodeContents(this.$refs.textareaRef)
        range.collapse(false)
        const sel = window.getSelection()
        if (sel.anchorOffset !== 0) return
        sel.removeAllRanges()
        sel.addRange(range)
      }, 100)
    },
    // 控制键盘上下移动选择好友
    option(e) {
      if (this.isAt) {
        const atEl = e.target.nextSibling
        if (e.keyCode === 40) {
          e.preventDefault()
          // 下
          this.current =
            this.current === atEl.children[1].children.length - 1
              ? 0
              : this.current + 1
        } else if (e.keyCode === 38) {
          e.preventDefault()

          // 上
          this.current =
            this.current === 0
              ? atEl.children[1].children.length - 1
              : this.current - 1
        }
        if (e.keyCode === 13) {
          e.preventDefault()

          this.getAtName(atEl.querySelector('.active').innerText)
        }
      }
    },
    // 点击分享歌曲
    async share() {
      if (this.shareForm.msg.length > 140 || this.shareForm.msg.trim() === '') {
        this.$message.warning('字数范围在0-140之间')
      } else {
        const { data: result } = await this.shareSong(this.shareForm)
        if (result.code !== 200) return this.$message.error(result.message)
        this.$message.success('分享成功')
        this.$store.commit('setCFDVisible', {
          display: false,
          component: null,
          songId: null
        })
      }
    },
    // 私信分享歌曲
    async privateShare() {
      if (this.privateForm.user_id.length === 0) {
        this.$message.warning('至少选择一位好友')
      } else if (this.privateForm.msg.trim() === '') {
        this.$message.warning('字数范围在0-140之间')
      } else {
        this.privateForm.user_id = this.privateForm.user_id.join(',')
        if (this.shareName.type === 'playlist') {
          const { data: result } = await this.privateSongs(this.privateForm)
          if (result.code !== 200) return this.$message.error(result.message)
          this.$message.success('分享成功')
          this.$store.commit('setCFDVisible', {
            display: false,
            component: null,
            songId: null
          })
        } else if (this.shareName.type === 'song') {
          const { data: result } = await this.privateSong(this.privateForm)
          if (result.code !== 200) return this.$message.error(result.message)
          this.$message.success('分享成功')
          this.$store.commit('setCFDVisible', {
            display: false,
            component: null,
            songId: null
          })
        }
      }
    }
  },
  components: {
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      )
  },
  computed: {
    ...mapGetters('forward', {
      shareName: 'shareName'
    }),
    ...mapState('user', {
      userId: 'userId'
    }),
    ...mapState('forward', {
      follows: 'follows'
    }),
    // 字数计算
    total() {
      let hanzi = this.shareForm.msg.match(/[\u4e00-\u9fa5]{1}/g)
      let zimu = this.shareForm.msg.match(/[^\u4e00-\u9fa5]{1}/g)
      if (hanzi) {
        hanzi = hanzi.length * 2
      }
      if (zimu) {
        zimu = zimu.length
      }
      if (!hanzi && !zimu) {
        return 140
      }
      return 140 - (hanzi + zimu)
    },
    newFollows() {
      if (this.currentAt) {
        return this.follows.filter((item) => {
          if (PinyinMatch.match(item.nickname, this.currentAt)) {
            return item
          }
        })
      } else {
        return this.follows
      }
    }
  }
}
</script>
<style lang="less" scoped>
.forward__main {
  padding: 20px 40px 30px;
  .forward__tab {
    height: 27px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 10px;
    ul {
      li {
        float: left;
        width: 91px;
        background: url('../../assets/uploads/tab.png') no-repeat right -303px;
        border-bottom: 1px solid #dedede;
        margin-top: -1px;
        margin-right: 4px;
        text-align: center;
        font-size: 12px;
        color: #666;
        line-height: 27px;
        a {
          display: inline-block;
          width: 100%;
          height: 27px;
          background: url('../../assets/uploads/tab.png') no-repeat 0 -206px;
        }
      }
      .current {
        border-bottom: 1px solid #fff;
      }
      .li:hover {
        background-position: right -271px;
        a {
          background-position: 0 -174px;
        }
      }
    }
  }
  .share__content,
  .private__content {
    [contentEditable='true']:empty:not(:focus):before {
      content: attr(data-text);
      color: #777;
    }
    width: 448px;
    .el-select {
      width: 100%;
      outline: none;
      margin: 0 !important;
      margin-bottom: 10px !important;
      border-radius: 2px !important;
      font-size: 12px;
      color: #666;
    }
    .el-form {
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      .textarea {
        outline: none;
        border: none;
        width: 100% !important;
        height: 106px;
        padding: 5px 6px 6px;
        font-size: 12px;
        color: #333;
        box-sizing: border-box;
      }
      .private__textarea {
        height: 56px;
      }
      .at__list {
        position: absolute;
        z-index: 666;
        width: 165px;
        border: 1px solid #cdcdcd;
        padding: 10px 0 0 0;
        background-color: #fff;
        font-size: 12px;
        p {
          padding: 0 0 8px 11px;
        }
        div {
          a {
            display: block;
            padding: 6px 0 6px 11px;
            cursor: pointer;
          }
          a:hover {
            background: #eee;
          }
          .active {
            background: #eee;
          }
        }
      }
      .share__name {
        width: 95%;
        height: 45px;
        margin: auto;
        border-top: 1px solid #e5e5e5;
        line-height: 45px;
      }
    }
    .share__f {
      height: 20px;
      margin-top: 10px;
      a {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        background: url('../../assets/uploads/icon.png') no-repeat;
      }
      .share__at {
        background-position: -60px -490px;
      }
      .share__total {
        float: right;
        color: #999;
        line-height: 20px;
      }
    }
    .share__btn {
      margin-top: 20px;
      a {
        position: relative;
        display: inline-block;
        width: 80px;
        height: 31px;
        background: url('../../assets/uploads/button2.png') no-repeat;
        padding-right: 5px;
        i {
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 100%;
          background: url('../../assets/uploads/button2.png') no-repeat;
          font-style: normal;
          text-align: center;
          line-height: 31px;
          color: #fff;
        }
      }
      .shareBtn {
        background-position: right -428px;
        margin-right: 20px;
        i {
          background-position: 0 -387px;
        }
      }
      .shareBtn:hover {
        background-position: right -510px;
        i {
          background-position: 0 -469px;
        }
      }
      .cancel {
        background-position: right -100px;
        i {
          background-position: 0 -59px;
          color: #333;
        }
      }
      .cancel:hover {
        background-position: right -182px;
        i {
          background-position: 0 -141px;
        }
      }
    }
  }
}
</style>
