<template>
  <div class="client __container">
    <LoginHeader>下载</LoginHeader>
    <el-row class="client__body">
      <el-row class="client__title">
        <h3>使用云音乐客户端</h3>
        <h4>即可无限下载高品质音乐</h4>
      </el-row>
      <el-row class="client__sub">
        <el-col :span="12" class="client__lfet">
          <a
            href="https://d1.music.126.net/dmusic/cloudmusicsetup2.7.5.198554.exe"
          >
            <i></i> PC版 <em>V2.9.6</em>
          </a>
          <a href="orpheus://">已安装PC版</a>
        </el-col>
        <el-col :span="12" class="client__right">
          <div class="qtcode"></div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
export default {
  name: 'client',
  data() {
    return {}
  },
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', val)
    })
  },
  methods: {},
  components: {
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      )
  }
}
</script>
<style lang="less" scoped>
.client__body {
  width: 418px;
  .client__title {
    text-align: center;
    h3 {
      padding-top: 18px;
      font-size: 20px;
      color: #333;
    }
    h4 {
      margin-top: 10px;
      color: #666;
    }
  }
  .client__sub {
    padding: 24px 36px;
    .client__lfet,
    .client__right {
      height: 162px;
    }
    .client__lfet {
      border-right: 1px dotted #ccc;
      a {
        display: block;
        width: 146px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        margin-top: 16px;
      }
      a:nth-child(1) {
        background: #d7e4f9;
        color: #374dbf;
        i {
          display: inline-block;
          width: 17px;
          height: 17px;
          background: url('../../assets/uploads/icon2.png') no-repeat 0px -310px;
          vertical-align: middle;
        }
        em {
          font-size: 14px;
          font-style: normal;
        }
      }
      a:nth-child(1):hover {
        background: #cedef5;
      }
      a:nth-child(2) {
        background: #e5e5e5;
      }
      a:nth-child(2):hover {
        background: #e0e0e0;
      }
    }
    .client__right {
      .qtcode {
        width: 86px;
        height: 86px;
        background: url('../../assets/uploads/qtcode86.png') no-repeat;
        margin: 15px auto;
      }
    }
    .client__right::after {
      content: '扫描下载手机版';
      display: block;
      margin: auto;
      color: #666;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
