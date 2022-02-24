<template>
  <div class="InSinger__container">
    <div class="in__singer">
      <h4>
        <span>热门歌手</span>
        <router-link to="/discover/artist">查看全部></router-link>
      </h4>
      <ul>
        <li v-for="item in hotSingerList" :key="item.id">
          <router-link :to="`/artist?id=${item.id}`">
            <div class="pic__img">
              <div
                class="img"
                :style="{
                  background: `url(${item.picUrl + '?param=62y62'}) no-repeat`,
                  backgroundSize: '100% 100%'
                }"
              ></div>
            </div>
            <div class="ifo">
              <h5>{{ item.name }}</h5>
              <p>{{ item.alias[0] || '音乐人' }}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <a
        href="https://music.163.com/st/musician"
        class="become"
        target="_blank"
      >
        申请成为网易音乐人
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'InSinger',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getHotSingerList', 10)
  },
  methods: {},
  computed: {
    ...mapState(['hotSingerList'])
  }
}
</script>
<style lang="less" scoped>
.InSinger__container {
  padding: 20px;
  .in__singer {
    h4 {
      height: 24px;
      border-bottom: 1px solid #ccc;
      a {
        float: right;
        font-weight: 400;
        color: #666;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    ul {
      li {
        margin-top: 15px;
        a {
          display: flex;
          background: #fafafa;
          .pic__img {
            width: 62px;
            height: 62px;
            .img {
              width: 100%;
              height: 100%;
            }
          }
          .ifo {
            height: 62px;
            flex: 1;
            border: 1px solid #e9e9e9;
            box-sizing: border-box;
            padding: 0 0 0 14px;
            h5,
            p {
              margin-top: 8px;
            }
          }
        }
        a:hover {
          background: #f3f3f3;
        }
      }
    }
    .become {
      position: relative;
      display: block;
      height: 31px;
      width: 209px;
      background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
      margin: 14px 5px 0 0;
      line-height: 31px;
      text-align: center;
      font-weight: bold;
    }
    .become::before {
      content: '';
      position: absolute;
      top: 0;
      right: -1px;
      width: 20px;
      height: 100%;
      background: url('../../assets/uploads/button2.png') no-repeat right -100px;
    }
    .become:hover {
      background-position: 0 -141px;
    }
    .become:hover::before {
      background-position: right -182px;
    }
  }
}
</style>
