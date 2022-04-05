<template>
  <div class="program__container w clearfix">
    <div class="program__left">
      <div class="left__box">
        <ProgramContent @sub="getProgramDetail(id)"></ProgramContent>
      </div>
    </div>
    <div class="program__right">
      <div class="right__box">
        <div class="program__client">
          <h3>网易云音乐多端下载</h3>
          <ul>
            <li>
              <a href="https://apps.apple.com/cn/app/id590338362">iPhone</a>
            </li>
            <li>
              <a
                href="https://d1.music.126.net/dmusic/cloudmusicsetup2.7.5.198554.exe"
                >PC</a
              >
            </li>
            <li>
              <a
                href="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.7.21.220329221707_32.apk"
                >Android</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgramContent from '@/components/djradio/ProgramContent'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'program',
  data() {
    return {}
  },
  methods: {
    ...mapActions('djradio', {
      getProgramDetail: 'getProgramDetail'
    }),
    ...mapMutations('djradio', {
      removeProgramAll: 'removeProgramAll'
    })
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('djradio', {
      programDetail: 'programDetail'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.getProgramDetail(val)
        }
      }
    },
    programDetail: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.updateTitle(this.$route.meta, val.radio.name, 3)
          this.updateTitle(this.$route.meta, val.name, 4)
        }
      }
    }
  },
  components: {
    ProgramContent
  },
  beforeDestroy() {
    this.removeProgramAll()
  }
}
</script>
<style lang="less" scoped>
.program__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .program__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
    }
  }
  .program__right {
    float: right;
    width: 270px;
    .right__box {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-size: 12px;
        a {
          float: right;
          font-weight: normal;
          color: #666;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .program__client {
        margin-top: 20px;
        ul {
          height: 65px;
          margin-bottom: 10px;
          background: url('../../assets/uploads/sprite.png') no-repeat 0 -392px;
          li {
            float: left;
            a {
              display: block;
              width: 42px;
              height: 48px;
              text-indent: -9999px;
              background: url('../../assets/uploads/sprite.png') no-repeat 0 -999999px;
            }
          }
          li:nth-child(1) {
            a:hover {
              background-position: 0 -472px;
            }
          }
          li:nth-child(2) {
            a {
              width: 60px;
              margin: 0 26px 0 30px;
            }
            a:hover {
              background-position: -72px -472px;
            }
          }
          li:nth-child(3) {
            a:hover {
              background-position: -158px -472px;
            }
          }
        }
      }
    }
  }
}
</style>
