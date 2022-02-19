<template>
  <div>
    <LoginHeader>
      <template>重置密码</template>
    </LoginHeader>
    <el-row class="register__main">
      <el-col :offset="7" :span="10">
        <el-form
          :model="regForm"
          :rules="regFormRules"
          ref="regFormRef"
          label-position="top"
        >
          <div v-if="step == 0">
            <el-form-item label="手机号" prop="phone">
              <el-input size="small" v-model="regForm.phone">
                <el-select v-model="regForm.countrycode" slot="prepend">
                  <el-option
                    v-for="(item, index) in codeList"
                    :key="index"
                    :value="item.code"
                    :label="'+' + item.code"
                  >
                    <span style="float: left">{{ item.zh }}</span>
                    <span style="float: right">{{ item.code }}</span></el-option
                  >
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" size="small" v-model="regForm.password">
              </el-input>
              <template slot="error" slot-scope="{ error }">
                <div class="tisp">
                  <p
                    :style="{
                      color: error.split(',')[0] == 'true' ? '#67C23A' : 'red'
                    }"
                  >
                    <i
                      :class="
                        error.split(',')[0] == 'true'
                          ? 'el-icon-circle-check'
                          : 'el-icon-circle-close'
                      "
                    ></i>
                    密码不能包含空格
                  </p>
                  <p
                    :style="{
                      color: error.split(',')[1] == 'true' ? '#67C23A' : 'red'
                    }"
                  >
                    <i
                      :class="
                        error.split(',')[1] == 'true'
                          ? 'el-icon-circle-check'
                          : 'el-icon-circle-close'
                      "
                    ></i>
                    包含字母、数字、符号中至少两种
                  </p>
                  <p
                    :style="{
                      color: error.split(',')[2] == 'true' ? '#67C23A' : 'red'
                    }"
                  >
                    <i
                      :class="
                        error.split(',')[2] == 'true'
                          ? 'el-icon-circle-check'
                          : 'el-icon-circle-close'
                      "
                    ></i>
                    密码长度为8-20位
                  </p>
                </div>
              </template>
            </el-form-item>
            <LoginBtn color="#fff" :background="btnBg" @btnClick="firstStep"
              >下一步</LoginBtn
            >
          </div>
          <div v-else-if="step == 1">
            <div class="captcha__box">
              <p>
                你的手机号：<b>{{
                  `+${regForm.countrycode} ${
                    regForm.phone.substr(0, 3) +
                    '****' +
                    regForm.phone.substr(7)
                  }`
                }}</b>
              </p>
              <p>为了安全，我们会给你发送短信验证码</p>
            </div>
            <Captcha @captchaValue="stepTwo" @send="firstStep"></Captcha>
            <LoginBtn
              :background="btnBg"
              color="#fff"
              @btnClick="stepTwo(regForm.captcha)"
              >下一步</LoginBtn
            >
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="captcha__footer">
      <a href="javascript:;" class="other" @click="mode('login')"
        >&lt;&nbsp; 返回登录</a
      >
    </el-row>
  </div>
</template>
<script>
import LoginHeader from '@/components/login/LoginHeader'
// 导入 loginAPI
import {
  getCodeListAPI,
  verifyAPI,
  getCodeAPI,
  registerAPI
} from '@/api/loginAPI'
// 导入 button
import LoginBtn from '@/components/login/LoginBtn'
// 导入验证码组件
import Captcha from '@/components/login/Captcha'
// 导入 eventBux
import Bus from '@/plugin/eventBus'

export default {
  data() {
    const password = [
      [/[\d]+/, /[A-Za-z]+/, /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~]+/],
      /^\S+/
    ]

    const isPassword = (rule, value, callback) => {
      let num = 0
      var arr = [false, false, false]
      if (password[0][0].test(value)) num++
      if (password[0][1].test(value)) num++
      if (password[0][2].test(value)) num++

      if (password[1].test(value)) arr[0] = true
      if (num >= 2) arr[1] = true
      if (value.length >= 8 && value.length <= 20) arr[2] = true
      if (arr.every((item) => item === true)) {
        this.btnBg = '#2E7ECB'
        callback()
      } else {
        this.btnBg = '#E8E8E8'
        callback(new Error(arr))
      }
    }
    // 正则表达式验证
    const mobile =
      /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
    const isMobile = (rule, value, callback) => {
      if (!mobile.test(value)) {
        return callback(new Error('请填写正确的手机号'))
      } else {
        callback()
      }
    }
    const nickname = /^[a-zA-Z0-9\u4e00-\u9fa5_-]{4,30}$/
    const isNickname = async (rule, value, callback) => {
      if (!nickname.test(value)) {
        return callback(
          new Error('昵称应该是4-30个字符，且不包含除-和_以外的特殊符号')
        )
      } else {
        callback()
      }
    }
    return {
      // 表单对象
      regForm: {
        // 验证码
        captcha: '',
        // 手机号码
        phone: '',
        // 密码
        password: '',
        // 昵称
        nickname: '',
        // 国家码
        countrycode: '86'
      },
      // 表单验证规则对象
      regFormRules: {
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: isMobile,
            trigger: 'blur'
          }
        ],
        password: [{ validator: isPassword, trigger: ['change', 'blur'] }],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: isNickname, trigger: 'blur' }
        ]
      },
      // 国家编码列表
      codeList: [],
      btnBg: '#2E7ECB',
      // 步骤
      step: 0
    }
  },
  created() {
    this.getCodeList()
  },
  methods: {
    mode(val) {
      Bus.$emit('mode', val)
    },
    // 获取国家编码
    async getCodeList() {
      const { data: result } = await getCodeListAPI()
      if (result.code !== 200) return this.$message.error('获取编码失败')
      const newCode = []
      result.data.forEach((item) => {
        item.countryList.forEach((item2) => {
          item2 = JSON.parse(JSON.stringify(item2))
          newCode.push(item2)
        })
      })
      this.codeList = newCode
    },
    // 第一步
    async firstStep() {
      // 发送验证码
      const { data: result } = await getCodeAPI(
        this.regForm.phone,
        this.regForm.countrycode
      ).catch(() => {
        return this.$message.error('过于频繁')
      })
      if (result.code !== 200) return this.$message.error(result.message)
      this.$message.success('发送成功')
      this.step = 1
    },
    // 第二部
    stepTwo(val) {
      verifyAPI(this.regForm.phone, val, this.regForm.countrycode)
        .then(async () => {
          this.regForm.captcha = val
          this.regForm.nickname =
            '重置用户' + Math.ceil(Math.random() * 1000000000000000000)
          const { data: result } = await registerAPI(
            this.regForm.captcha,
            this.regForm.phone,
            this.regForm.password,
            this.regForm.nickname,
            this.regForm.countrycode
          )
          if (result.code !== 200) return this.$message.error(result.message)
          this.$message.success('重置密码成功')
          Bus.$emit('loginData', result.profile)
          Bus.$emit('Visible', false)
        })
        .catch(() => {
          this.$message.error('验证码错误')
        })
    }
  },
  components: {
    LoginHeader,
    LoginBtn,
    Captcha
  }
}
</script>
<style lang="less" scoped>
.register__main {
  background-color: #fff;
  .el-col {
    padding: 30px 0 43px 0;
  }
}
/deep/ .el-form-item__label {
  padding: 0 !important;
  height: 30px;
  font-size: 12px;
}
.el-select {
  width: 60px;
  color: 12px !important;
}
.el-form-item {
  margin-bottom: 5px;
}
/deep/ .el-form-item__content {
  line-height: 100%;
}
.tisp {
  margin-top: 3px;
  p {
    margin-bottom: 8px;
    font-size: 12px;
  }
}
.captcha__box {
  font-size: 12px;
  margin-bottom: 15px;
  p:nth-child(1) {
    color: #666;
    margin-bottom: 5px;
    b {
      color: #333;
    }
  }
  p:nth-child(2) {
    color: #999;
  }
}
.nickname__box {
  p {
    margin-bottom: 20px;
    text-align: center;
    font-size: 12px;
  }
  .el-form-item {
    margin-bottom: 38px;
  }
}
// 底部区域
.captcha__footer {
  padding: 0 19px;
  height: 48px;
  border-top: 1px solid #c6c6c6;
  line-height: 48px;
  background-color: #f7f7f7;
  font-size: 12px;
  .other {
    float: left;
    color: #0c72c3;
  }
}
</style>
