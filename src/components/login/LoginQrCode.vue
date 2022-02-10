<template>
  <div>
    <LoginHeader>
      <template>登录</template>
    </LoginHeader>
    <!-- 二维码登录主体区 -->
    <el-row v-if="qrState === 802" class="qr__code">
      <div class="img"></div>
      <p>扫描成功</p>
      <span>请在手机上确认登录 </span>
    </el-row>
    <el-row v-else class="qr__code" :gutter="40">
      <el-col :span="6" :offset="5" class="code__left"></el-col>
      <el-col :span="10" class="code__right">
        <div class="title">扫码登录</div>
        <div class="qr">
          <el-image :src="qrCodeUrl"></el-image>
        </div>
        <div class="text">
          使用 <a href="javascript:;">网易云音乐APP</a> 扫码登录
        </div>
      </el-col>
      <div class="beOverdue" v-show="qrState === 800">
        <p>二维码已失效</p>
        <a href="javascript:;" @click="getKey">点击刷新</a>
      </div>
    </el-row>
    <div class="qr__footer">
      <a href="javascript:;" @click="mode">选择其他登录模式</a>
    </div>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import LoginHeader from '@/components/login/LoginHeader'
// 导入 loginAPI 接口
import { qrKeyAPI, qrCodeAPI, qrStateAPI } from '@/api/loginAPI'
export default {
  data() {
    return {
      // 二维码 key
      key: '',
      // 二维码 base64 地址
      qrCodeUrl: '',
      qrState: null,
      times: null
    }
  },
  created() {
    // 生成 二维码 key
    this.getKey()
  },
  destroyed() {
    clearInterval(this.times)
  },
  methods: {
    // key 生成
    async getKey() {
      const { data: result } = await qrKeyAPI()
      if (result.code !== 200) return
      this.key = result.data.unikey
      // 生成 二维码
      this.getQrCode()
      // 检测二维码状态
      this.getQrState()
      this.times = setInterval(() => {
        this.getQrState()
      }, 1000)
    },
    // 二维码生成
    async getQrCode() {
      const { data: result } = await qrCodeAPI(this.key)
      if (result.code !== 200) return
      this.qrCodeUrl = result.data.qrimg
    },
    // 获取二维码状态
    async getQrState() {
      const { data: result } = await qrStateAPI(this.key)
      this.qrState = result.code
      switch (this.qrState) {
        case 800:
          clearInterval(this.times)
          break
        case 803:
          this.$message.success('登录成功')
          Bus.$emit('Visible', false)
          break
      }
    },
    // 跳转到登入方式选择
    mode() {
      Bus.$emit('mode', 'login')
    }
  },
  components: {
    LoginHeader
  }
}
</script>
<style lang="less" scoped>
.qr__code {
  position: relative;
  background-color: #fff;
  padding: 28px 0 0 0;
  text-align: center;
  .img {
    width: 140px;
    height: 140px;
    background: url('../../assets/uploads/scan_success@2x.png') no-repeat;
    background-size: 100%;
    margin: 0 auto;
  }
  p {
    margin-top: 12px;
    font-size: 18px;
    color: #000000cc;
  }
  span {
    margin-top: 5px;
  }
  .code__left {
    width: 125px;
    height: 220px;
    background: url('../../assets/uploads/qr_guide.png') no-repeat;
    background-size: 100%;
  }
  .code__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    text-align: center;
    .title {
      font-size: 18px;
    }
    .text {
      font-size: 12px;
      color: #00000066;
      a {
        color: #0c73c2;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .qr {
      width: 155px;
      height: 155px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .beOverdue {
    position: absolute;
    top: 72px;
    right: 138px;
    width: 138px;
    height: 138px;
    background: rgba(255, 255, 255, 0.9);
    p {
      margin: 45px 0 6px 0;
      font-size: 12px;
    }
    a {
      display: block;
      margin: 0 auto;
      padding-right: 0;
      width: 64px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 4px;
      background: linear-gradient(180deg, #81dd81 0%, #55a055 100%);
      border: 1px solid #5baf5b;
      box-shadow: inset 0 -1px 1px 1px rgb(185 230 185 / 31%);
      color: #fff;
      font-size: 12px;
    }
  }
}
.qr__footer {
  padding: 25px 0 20px 0;
  text-align: center;
  a {
    display: inline-block;
    width: 120px;
    height: 30px;
    border: 1px solid #979797;
    font-size: 12px;
    color: #000000cc;
    line-height: 30px;
    border-radius: 15px;
  }
}
</style>
