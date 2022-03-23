<template>
  <div class="collection__container">
    <LoginHeader>{{ isAdd ? '新建歌单' : '添加到歌单' }}</LoginHeader>
    <el-row class="collection__main" v-show="!isAdd">
      <el-row class="collection__new" @click.native="isAdd = true"
        >新歌单</el-row
      >
      <el-row class="collection__list">
        <el-row
          class="collection__item"
          v-for="item in uPlayList"
          :key="item.id"
          @click.native="add(item.id)"
        >
          <el-col :span="3">
            <el-image :src="item.coverImgUrl + '?param=40y40'"> </el-image>
          </el-col>
          <el-col :span="21">
            <el-row class="collection__text">
              <span class="collection__name">{{ item.name }}</span>
              <p class="collection__total">{{ item.trackCount + '首' }}</p>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <el-row class="add__main" v-show="isAdd">
      <el-form
        :model="playlistForm"
        :rules="playlistRules"
        ref="playlistRef"
        label-width="80px"
      >
        <el-form-item label="歌单名" prop="name">
          <el-input v-model="playlistForm.name"></el-input>
          <template v-slot:error="{ error }">
            <span><i></i>{{ error }}</span>
          </template>
        </el-form-item>
        <div class="add__btn">
          <p>可通过“收藏”将音乐添加到新歌单中</p>
          <a href="javascript:;" class="Jianxin" @click="create"
            ><i>新 建</i></a
          >
          <a href="javascript:;" class="cancel" @click="cancel"><i>取 消</i></a>
        </div>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'collection',
  data() {
    // 自定义表单验证规则
    const name = (rule, value, callback) => {
      value = value.split('')
      let num = 0
      value.forEach((item) => {
        // 判断是否是汉字
        if (/[\u4E00-\u9FFF]+/g.test(item)) {
          num += 2
        } else {
          num++
        }
      })

      if (num >= 40) {
        return callback(new Error('歌单名不能超过20个汉字或40个英文字符！'))
      }
      if (/[#@]+/g.test(value)) {
        return callback(new Error('歌单名不能包含字符“@”和“#”！'))
      }
      callback()
    }
    return {
      isAdd: false,
      // 歌单表单
      playlistForm: {
        name: ''
      },
      // 歌单验证贵的对象
      playlistRules: {
        name: [
          { required: true, message: '歌单名称不能为空', trigger: 'blur' },
          { validator: name, trigger: 'change' }
        ]
      }
    }
  },
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', val)
    })
    // 获取用户歌单
    this.$store.dispatch('collection/getUserPlayList', this.userId)
    this.isAdd = this.$store.state.isAdd
  },
  methods: {
    async add(pid) {
      const { data: result } = await this.$store.dispatch(
        'collection/playlistTarcks',
        {
          op: `add`,
          pid,
          tarcks: this.$store.state.songId
        }
      )
      if (result.code) {
        return this.$message.error(result.msg)
      }
      if (result.body.code !== 200) {
        this.$message.error(result.body.message)
      } else {
        this.$message.success('添加成功')
        if (this.$route.path.includes('/my')) {
          this.$store.dispatch('collection/getUserPlayList', this.userId)
          this.$store.dispatch('toplist/getSongsDetails', {
            id: pid,
            ist: true
          })
        }
      }
      this.$store.commit('setCFDVisible', { display: false, component: null })
    },
    // 新建歌单并添加当前歌曲
    create() {
      this.$refs.playlistRef.validateField('name', async (valid) => {
        if (!valid) {
          const { data: result } = await this.$store.dispatch(
            'collection/createPlaylist',
            this.playlistForm
          )
          if (result.code !== 200) return this.$message.error(result.message)
          if (this.$store.state.isAdd) {
            this.cancel()
            this.$store.dispatch('collection/getUserPlayList', this.userId)
            return this.$message.success('新建歌单成功')
          }
          this.add(result.id)
        }
      })
    },
    // 取消
    cancel() {
      this.$store.commit('setCFDVisible', {
        display: false,
        component: null,
        songId: null
      })
    }
  },
  components: {
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      )
  },
  computed: {
    ...mapGetters('collection', {
      uPlayList: 'uPlayList'
    }),
    ...mapState('user', {
      userId: 'userId'
    })
  }
}
</script>
<style lang="less" scoped>
.collection__main {
  width: 478px;
  .collection__new {
    padding: 10px 0 10px 35px;
    background: #e6e6e6;
    font-size: 12px;
    color: #333;
    cursor: pointer;
  }
  .collection__new::before {
    display: inline-block;
    width: 35px;
    height: 36px;
    background: url('../../assets/uploads/icon.png') no-repeat 0 -495px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .collection__list {
    height: 330px;
    overflow: auto;
    .collection__item {
      border-top: 1px solid #e0e0e0;
      padding: 6px 0 6px 35px;
      cursor: pointer;
      .el-image {
        float: left;
        width: 40px;
        height: 40px;
      }
      .collection__text {
        float: left;
        height: 40px;
        font-size: 12px;
        .collection__name {
          color: #000;
        }
        .collection__total {
          margin-top: 8px;
        }
      }
    }
    .collection__item:nth-child(1) {
      border: 0;
    }
    .collection__item:hover {
      background-color: #f2f2f2;
    }
  }
}
.add__main {
  position: relative;
  width: 480px;
  height: 210px;
  padding: 40px 0;
  /deep/ .el-form {
    width: 90%;
    .el-form-item__label {
      font-size: 12px;
    }
    span {
      position: relative;
      top: -5px;
      color: #e33232;
      font-size: 12px;

      i {
        display: inline-block;
        position: relative;
        top: 2px;
        width: 14px;
        height: 14px;
        background: url('../../assets/uploads/icon.png') no-repeat -50px -270px;
        margin-right: 8px;
      }
    }
  }
  .add__btn {
    position: absolute;
    left: 80px;
    top: 110px;
    p {
      color: #999;
      font-size: 12px;
      margin-bottom: 20px;
    }
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
    .Jianxin {
      background-position: right -428px;
      margin-right: 20px;
      i {
        background-position: 0 -387px;
      }
    }
    .Jianxin:hover {
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
</style>
