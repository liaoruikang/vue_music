<template>
  <div class="djradio__container w clearfix">
    <div class="djradio__left">
      <div class="left__box">
        <DjradioContent
          :asc="queryInfo.asc"
          @sort="queryInfo.asc = $event"
          :offset="queryInfo.offset"
          @pageChange="queryInfo.offset = ($event - 1) * queryInfo.limit"
        ></DjradioContent>
      </div>
    </div>
    <div class="djradio__right">
      <div class="djradio__box">
        <div class="djradio__client">
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
import DjradioContent from '@/components/djradio/DjradioContent'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'djradio',
  data() {
    return {
      queryInfo: {
        rid: 0,
        limit: 100,
        offset: 0,
        asc: false
      }
    }
  },
  components: { DjradioContent },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('djradio', {
      djDetail: 'djDetail'
    })
  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.queryInfo.rid = val
          this.getDjDetail(val)
        }
      }
    },
    queryInfo: {
      deep: true,
      immediate: true,
      handler(val) {
        this.getProgramList(val)
      }
    },
    djDetail: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.updateTitle(this.$route.meta, val.data.name, 3)
        }
      }
    }
  },
  methods: {
    ...mapActions('djradio', {
      getDjDetail: 'getDjDetail',
      getProgramList: 'getProgramList'
    }),
    ...mapMutations('djradio', {
      removeDjDetailAll: 'removeDjDetailAll'
    })
  },
  beforeDestroy() {
    this.removeDjDetailAll()
  }
}
</script>
<style lang="less" scoped>
.djradio__container {
  background: url('../../assets/uploads/wrap4.png') repeat-y center 0;
  min-height: 700px;
  .djradio__left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left__box {
      padding: 40px 30px 40px 39px;
      margin-right: 270px;
    }
  }
  .djradio__right {
    float: right;
    width: 270px;
    .djradio__box {
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
      .djradio__client {
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
