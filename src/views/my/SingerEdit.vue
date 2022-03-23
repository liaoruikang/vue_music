<template>
  <div class="singerEdit__container" v-loading="!songsDetails.name">
    <div v-if="songsDetails.name">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path }">{{
          songsDetails.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="$route.path == '/my/edit/cover' ? editPath : null"
          >编辑歌单</el-breadcrumb-item
        >
        <el-breadcrumb-item v-if="$route.path == '/my/edit/cover'"
          >编辑封面</el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- 更新名字 标签 描述 -->
      <div v-if="$route.path === '/my/edit'">
        <div class="singerEdit__main">
          <div class="main__left">
            <el-form
              :model="editForm"
              :rules="editRules"
              ref="editFormRef"
              label-width="60px"
            >
              <el-form-item label="歌单名" prop="name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
              <el-form-item label="标签">
                <div class="centent">
                  <a
                    href="javascript:;"
                    class="tag"
                    v-for="(item, index) in editForm.tags"
                    :key="index"
                  >
                    <i>
                      {{ item }}
                      <em @click="deleteTag(index)">x</em>
                    </i>
                  </a>
                  <a
                    class="tags__btn"
                    href="javascript:;"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Tags',
                        tags: editForm.tags
                      })
                    "
                    >选择标签</a
                  >
                </div>
                <p class="tisp">选择适合的标签，最多选3个</p>
              </el-form-item>
              <el-form-item label="介绍" prop="desc">
                <el-input type="textarea" :rows="6" v-model="editForm.desc">
                </el-input>
              </el-form-item>
            </el-form>
            <div class="left__btn">
              <a href="javascript:;" class="leftBtn" @click="preservation"
                ><i>保存</i></a
              >
              <a href="javascript:;" class="cancel" @click="cancel"
                ><i>取消</i></a
              >
            </div>
          </div>
          <div class="main__right">
            <el-image :src="songsDetails.coverImgUrl"></el-image>
            <router-link :to="coverPath" class="cover">编辑封面</router-link>
          </div>
        </div>
      </div>
      <!-- 更新封面 -->
      <router-view :path="editPath"></router-view>
    </div>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import { mapState } from 'vuex'
export default {
  name: 'singerEdit',
  data() {
    return {
      editForm: {
        // 歌单id
        id: this.$route.query.id,
        // 歌单名称
        name: this.$route.query.name,
        // 歌单描述
        desc: '',
        // 歌单标签
        tags: []
      },
      editRules: {
        name: [{ required: true, message: '歌单名不能为空', trigger: 'blur' }],
        desc: [{ max: 1000, message: '字符范围在0-1000内', trigger: 'blur' }]
      }
    }
  },
  computed: {
    name() {
      return this.$route.query.name
    },
    path() {
      return `/my?id=${this.$route.query.id}&play=1`
    },
    editPath() {
      return { path: `/my/edit?id=${this.$route.query.id}&name=${this.name}` }
    },
    coverPath() {
      return `/my/edit/cover?id=${this.$route.query.id}&name=${this.name}`
    },
    ...mapState('toplist', {
      songsDetails: 'songsDetails'
    }),
    ...mapState('user', {
      userId: 'userId'
    })
  },
  watch: {
    name(val) {
      this.editForm.name = val
    },
    songsDetails: {
      immediate: true,
      handler(val) {
        this.editForm.name = val.name
        if (val.tags && val.tags.length > 0) {
          this.editForm.tags = [...val.tags]
        }
        this.editForm.desc = val.description
      }
    }
  },
  created() {
    Bus.$on('tags', (val) => {
      this.editForm.tags = val
    })
    // 获取歌单详情
    this.$store.commit('toplist/removeSongsDetails')
    this.$store.dispatch('toplist/getSongsDetails', {
      id: this.$route.query.id,
      ist: true
    })
  },
  methods: {
    // 删除标签
    deleteTag(index) {
      this.editForm.tags.splice(index, 1)
    },
    // 保存更新
    async preservation() {
      const form = JSON.parse(JSON.stringify(this.editForm))
      form.tags = form.tags.join(';')
      const { data: result } = await this.$store.dispatch(
        'my/updatePlayList',
        form
      )
      if (result.code !== 200) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.$store.dispatch('my/getMySinger')
      this.$store.dispatch('collection/getUserPlayList', this.userId)
      this.$store.dispatch('toplist/getSongsDetails', {
        id: this.$route.query.id,
        ist: true
      })
    },
    // 取消
    async cancel() {
      if (
        this.songsDetails.name !== this.editForm.name ||
        this.songsDetails.description !== this.editForm.desc ||
        this.songsDetails.tags.length !== this.editForm.tags.length
      ) {
        const confirm = await this.$confirm(
          '编辑的信息尚未保存，是否保存后离开？',
          '提示',
          {
            confirmButtonText: '保存',
            cancelButtonText: '不保存',
            type: 'warning'
          }
        ).catch((err) => err)
        if (confirm === 'confirm') {
          this.preservation()
          this.$router.push(this.path)
        } else if (confirm === 'cancel') {
          this.$router.push(this.path)
        }
      } else {
        // 返回
        this.$router.push(this.path)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.singerEdit__container {
  min-height: 700px;
  padding: 40px;
  .singerEdit__main {
    margin-top: 30px;
    .main__left {
      float: left;
      width: 364px;
      .el-form {
        .el-form-item {
          font-size: 12px;
          /deep/ .el-form-item__label {
            font-size: 12px;
          }
          .centent {
            .tags__btn {
              color: #0c73c2;
              font-size: 12px;
            }
            .tags__btn:hover {
              text-decoration: underline;
            }
            .tag {
              display: inline-block;
              margin-right: 10px;
              padding: 0 10px 0 0;
              background: url('../../assets/uploads/button2.png') no-repeat
                right -26px;
              line-height: 22px;
              i {
                position: relative;
                display: inline-block;
                padding: 0 10px 0 13px;
                height: 22px;
                background: url('../../assets/uploads/button2.png') no-repeat 0
                  0;
                font-size: 12px;
                color: #777;
                em {
                  position: absolute;
                  padding: 0 2px;
                  top: -1px;
                  right: -4px;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
            }
            .tag:hover {
              background-position: right -1430px;
              i {
                background-position: 0 -1400px;
              }
            }
          }
          .tisp {
            margin-top: 4px;
            font-size: 12px;
            color: #999;
            line-height: 12px;
          }
          /deep/ .el-textarea__inner {
            padding: 5px 6px 6px;
            font-size: 12px;
          }
        }
      }
      .left__btn {
        margin-top: 50px;
        margin-left: 60px;
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
        .leftBtn {
          background-position: right -428px;
          margin-right: 20px;
          i {
            background-position: 0 -387px;
          }
        }
        .leftBtn:hover {
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
    .main__right {
      position: relative;
      float: left;
      margin: 5px 0 0 30px;
      .el-image {
        width: 140px;
        height: 140px;
      }
      .el-image::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 26px;
        background: #8e8e8e;
        opacity: 0.8;
      }
      .cover {
        position: absolute;
        bottom: 3px;
        left: 0;
        width: 100%;
        color: #fff;
        text-align: center;
        line-height: 26px;
      }
      .cover:hover {
        text-decoration: underline;
      }
    }
  }
}
/deep/ .el-breadcrumb {
  height: 27px;
  border-bottom: 1px solid #cbcbcb;
  font-size: 12px;
}
/deep/ .is-link {
  color: #0c73c2;
  font-size: 12px;
}
/deep/ .is-link:hover {
  color: #0c73c2;
  text-decoration: underline;
}
</style>
