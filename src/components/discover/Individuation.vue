<template>
  <div class="individuation__container">
    <floorHeader :hash="$route.path" :isMore="false">个性化推荐</floorHeader>
    <!-- 主体区域 -->
    <div class="individuation__body">
      <!-- 每日推荐歌曲 -->
      <div>
        <div class="songs__box">
          <router-link to="/discover/recommend/taste">
            <h6>{{ week[dayjs().day()] }}</h6>
            <p>{{ dayjs().date() }}</p>
          </router-link>
        </div>
        <div class="title">
          <router-link to="/discover/recommend/taste">每日歌曲推荐</router-link>
          <p>根据你的口味生成， 每天6:00更新</p>
        </div>
      </div>
      <!-- 每日推荐歌单 -->
      <SongsList
        v-for="item in daySongsList"
        :key="item.id"
        :url="item.picUrl"
        :audience="item.playcount"
        :id="item.id"
        :title="item.name"
        :tips="item.copywriter"
        @playClick="$store.dispatch('getsongsDetails', item.id)"
      ></SongsList>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'individuation',
  data() {
    return {
      // week
      week: [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
    }
  },
  created() {
    this.$store.dispatch('individuation/getEverydaySongsList')
  },
  methods: {},
  components: {
    FloorHeader: () => import('./FloorHeader.vue'),
    SongsList: () => import('../common/SongsList.vue')
  },
  computed: {
    ...mapGetters('individuation', {
      daySongsList: 'daySongsList'
    })
  }
}
</script>
<style lang="less" scoped>
.individuation__container {
  .songs__box {
    width: 140px;
    height: 140px;
    background: url('../../assets/uploads/date.png') no-repeat;
    a {
      display: block;
      width: 100%;
      height: 100%;
      h6 {
        height: 33px;
        color: #fed9d9;
        font-size: 14px;
        line-height: 33px;
        text-align: center;
      }
      p {
        height: 107px;
        background: url('../../assets/uploads/date.png') no-repeat 0 -150px;
        font-size: 94px;
        font-weight: bold;
        color: #202020;
        text-align: center;
        line-height: 107px;
      }
    }
    margin-bottom: 3px;
  }
  .title {
    width: 140px;
    a {
      font-size: 14px;
      color: #000;
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
  .individuation__body {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
}
</style>
