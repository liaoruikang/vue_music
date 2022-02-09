<template>
  <div>
    <!-- 头部区域 -->
    <LoginHeader>
      <template>手机号登录</template>
    </LoginHeader>
    <!-- 主体区域 -->
    <div class="phone__main">
      <el-form :model="phoneForm" :rules="phoneFromRules" ref="phoneFromRef">
        <!-- 手机号表单 -->
        <el-form-item prop="phone">
          <el-input
            size="small"
            placeholder="请输入手机号"
            v-model="phoneForm.phone"
          >
            <template #prepend>
              <el-select v-model="select">
                <el-option
                  v-for="(item, index) in codeList"
                  :key="index"
                  :label="'+' + item.code"
                  :value="item.code"
                >
                  <span class="option__left">{{ item.zh }}</span>
                  <span class="option__right">{{ '+' + item.code }}</span>
                </el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <!-- 手机验证码表单 -->
        <el-form-item v-if="isverificationCode" prop="captcha">
          <el-row>
            <el-col :span="14">
              <el-input
                size="small"
                v-model="phoneForm.captcha"
                placeholder="请输入验证码"
                @keyup.enter.native="login"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <a href="javascript:; " class="verification" @click="getCode">
                <i>获取验证码</i>
              </a>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机密码表单 -->
        <el-form-item prop="password" v-if="!isverificationCode">
          <el-input
            type="password"
            placeholder="请输入密码"
            size="small"
            v-model="phoneForm.password"
            @keyup.enter.native="login"
          >
            <template #suffix>
              <a
                href="javascript:;"
                @click="mode('resetPassword')"
                style="font-size: 12px; line-height: 32px; color: #666"
                >忘记密码？</a
              >
            </template>
          </el-input>
        </el-form-item>
        <el-row class="phone__row">
          <a
            href="javascript:;"
            v-if="isverificationCode"
            @click="
              isverificationCode = false
              phoneForm.captcha = ''
            "
            >密码登录</a
          >
          <a href="javascript:;" v-else @click="isverificationCode = true"
            >短信登录</a
          >
          <span class="phone__auto">
            <input type="checkbox" checked /> 自动登录
          </span>
        </el-row>
        <LoginBtn color="#fff" @btnClick="login">登录</LoginBtn>
      </el-form>
    </div>
    <!-- 底部区域 -->
    <div class="phone__footer">
      <a href="javascript:;" class="other" @click="mode('login')"
        >&lt;&nbsp; 其他登录方式</a
      >
      <a href="javascript:;" class="register" @click="mode('register')"
        >没有账号？ 免费注册 &gt;</a
      >
    </div>
  </div>
</template>
<script>
import LoginHeader from '@/components/login/LoginHeader'
// 导入loginAPI
import { getCodeListAPI, getCodeAPI, phoneLoginAPI } from '@/api/loginAPI'
// 导入 eventBus
import Bus from '@/plugin/eventBus'
// 导入 LoginBtn
import LoginBtn from '@/components/login/LoginBtn'
export default {
  data() {
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
    return {
      select: '86',
      codeList: [],
      // 表单对象
      phoneForm: {
        phone: '',
        password: '',
        captcha: ''
      },
      // 表单验证规则对象
      phoneFromRules: {
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          {
            validator: isMobile,
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
      },
      // 是否验证码登录
      isverificationCode: true
    }
  },
  created() {
    this.getCodeList()
  },
  components: {
    LoginHeader,
    LoginBtn
  },
  methods: {
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
    mode(val) {
      Bus.$emit('mode', val)
    },
    // 获取短信验证码
    getCode() {
      this.$refs.phoneFromRef.validateField('phone', async (valid) => {
        if (!valid) {
          const { data: result } = await getCodeAPI(
            this.phoneForm.phone,
            this.select
          )
          if (result.code !== 200) return this.$message.error(result.message)
          this.$message.success('验证码发送成功')
        }
      })
    },
    // 登录
    login() {
      this.$refs.phoneFromRef.validate(async (valid) => {
        if (!valid) return
        const loginFrom = {
          phone: this.phoneForm.phone,
          password: this.phoneForm.password,
          countrycode: this.select
        }
        if (this.phoneForm.captcha) {
          loginFrom.captcha = this.phoneForm.captcha
          delete loginFrom.password
        }
        const { data: result } = await phoneLoginAPI(loginFrom)
        if (result.code !== 200) return this.$message.error(result.message)
        this.$message.success('登录成功')
        Bus.$emit('Visible', false)
      })
    }
  },
  watch: {
    isverificationCode() {
      this.$refs.phoneFromRef.clearValidate()
    }
  }
}
</script>
<style lang="less" scoped>
.phone__main {
  background-color: #fff;
  .el-form {
    width: 220px;
    margin: 0 auto;
    padding: 30px 0 43px 0;
    .el-select {
      width: 60px;
      font-size: 12px;
    }
  }
}

.option__left {
  float: left;
}
.option__right {
  float: right;
}

.verification {
  display: inline-block;
  background: url('../../assets/uploads/button2.png') no-repeat right -100px;
  height: 31px;
  line-height: 31px;
  width: 75px;
  float: right;
  margin-top: 5px;
  i {
    position: relative;
    top: -1px;
    display: inline-block;
    background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
    height: 31px;
    line-height: 31px;
    padding: 0 5px;
    font-size: 12px;
  }
}
.verification:hover {
  background: url('../../assets/uploads/button2.png') no-repeat right -181px;
  i {
    background: url('../../assets/uploads/button2.png') no-repeat 0 -140px;
  }
}
.phone__row {
  font-size: 12px;
  margin-bottom: 15px;
  a {
    float: left;
  }
  a:hover {
    text-decoration: underline;
  }
  .phone__auto {
    float: right;
    input {
      vertical-align: middle;
      margin-top: -2px;
    }
  }
}
.phone__footer {
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
  .register {
    float: right;
    color: #999;
  }
}
</style>
