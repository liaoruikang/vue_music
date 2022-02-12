<template>
  <div class="captcha__container">
    <div class="cap__main">
      <div class="cap__box">
        <input
          v-model="value['val1']"
          @input="input"
          ref="input1"
          @keyup="Press"
          @blur="isDisplay = false"
          type="text"
        />
        <em></em>
      </div>
      <div class="cap__box">
        <input
          v-model="value['val2']"
          @input="input"
          ref="input2"
          @keyup="Press"
          @blur="isDisplay = false"
          type="text"
        />
        <em></em>
      </div>
      <div class="cap__box">
        <input
          v-model="value['val3']"
          @input="input"
          ref="input3"
          @keyup="Press"
          @blur="isDisplay = false"
          type="text"
        />
        <em></em>
      </div>
      <div class="cap__box">
        <input
          v-model="value['val4']"
          @input="input"
          ref="input4"
          @keyup="Press"
          @blur="isDisplay = false"
          type="text"
        />
        <em></em>
      </div>
      <div class="footer">
        <span v-show="isDisplay" class="footer__left"
          ><i class="el-icon-warning-outline"></i> {{ tips }}</span
        >
        <span class="footer__right" @click="$emit('send')">重新发送</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'captcha',
  data() {
    return {
      value: {
        val1: '',
        val2: '',
        val3: '',
        val4: ''
      },
      // 数值验证正则
      number: /^[\d]+$/,
      tips: '测试',
      isDisplay: false
    }
  },
  created() {},
  methods: {
    timer(el, start, end, or) {
      const times = setInterval(() => {
        if (or === true) {
          start += 5
        } else {
          start -= 5
        }

        el.style.width = start + '%'
        if (start === end) {
          clearInterval(times)
        }
      })
    },
    Press(e) {
      const em = e.target.parentNode.children[1]
      if (e.keyCode === 8) {
        if (em.parentNode.previousSibling) {
          em.parentNode.previousSibling.children[0].focus()
        }
      }

      setTimeout(() => {
        const str = window.getComputedStyle(em).width.replace(/px|%/, '')
        if (e.target.value.length === 1) {
          if (str === '100') return
          this.timer(em, 0, 100, true)
        } else if (e.target.value.length === 0) {
          if (str === '0') return
          this.timer(em, 100, 0)
        }
      })
    },
    input(e) {
      const em = e.target.parentNode.children[1]
      this.isDisplay = false
      if (!this.number.test(e.data) && e.target.value !== '') {
        this.tips = '请输入数字'
        this.isDisplay = true
        return
      }
      setTimeout(() => {
        const str = window.getComputedStyle(em).width.replace(/px|%/, '')
        if (e.target.value.length === 1) {
          if (str === '100') return
          this.timer(em, 0, 100, true)
        } else if (e.target.value.length === 0) {
          if (str === '0') return
          this.timer(em, 100, 0)
        }
      })
    }
  },
  watch: {
    'value.val1'(newVal, usedVal) {
      if (!this.number.test(newVal)) {
        if (usedVal.length === 0) return (this.value.val1 = '')
      }

      if (newVal.length > 1) {
        this.value.val1 = usedVal
      } else if (newVal.length === 1) {
        this.$refs.input2.focus()
      }
    },
    'value.val2'(newVal, usedVal) {
      if (!this.number.test(newVal)) {
        if (usedVal.length === 0) return (this.value.val2 = '')
      }

      if (newVal.length > 1) {
        this.value.val2 = usedVal
      } else if (newVal.length === 1) {
        this.$refs.input3.focus()
      }
    },
    'value.val3'(newVal, usedVal) {
      if (!this.number.test(newVal)) {
        if (usedVal.length === 0) return (this.value.val3 = '')
      }

      if (newVal.length > 1) {
        this.value.val3 = usedVal
      } else if (newVal.length === 1) {
        this.$refs.input4.focus()
      }
    },
    'value.val4'(newVal, usedVal) {
      if (!this.number.test(newVal)) {
        if (usedVal.length === 0) return (this.value.val4 = '')
      }

      if (newVal.length > 1) {
        this.value.val4 = usedVal
      }
    },
    value: {
      deep: true,
      handler(newVal, usedVal) {
        const newArr = []
        for (const k in newVal) {
          newArr.push(newVal[k])
        }
        if (newArr.every((item) => item.length > 0)) {
          this.$emit('captchaValue', newArr.join(''))
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cap__main {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .cap__box {
    position: relative;
    min-width: 24px;
    height: 30px;
    padding: 0 13px;
    margin-right: 5px;
    flex: 1;
    input {
      width: 100%;
      border: 0;
      text-align: center;
      font-size: 24px;
      outline: none;
    }
    em {
      position: absolute;
      width: 0%;
      height: 2px;
      background-color: #bb2712;
      bottom: 0;
      left: 0;
    }
  }
  .cap__box::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #0000001a;
    bottom: 0;
    left: 0;
  }
  .footer {
    width: 100%;
    margin-top: 5px;
    font-size: 12px;

    .footer__left {
      float: left;
      color: #e33232;
    }
    .footer__right {
      float: right;
      cursor: pointer;
      color: #0c73c2;
    }
  }
}
</style>
