<template>
  <div class="home__container w" v-loading="!userData">
    <div class="home__box" v-if="userData">
      <!-- 个人信息 -->
      <Information></Information>
      <!-- 听歌排行 -->
      <Ranking></Ranking>
      <!-- 创建的歌单 -->
      <Establish :list="uPlayList" :name="userData.nickname"></Establish>
      <!-- 收藏的歌单 -->
      <Collection :list="cPlayList" :name="userData.nickname"></Collection>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import Information from '@/components/user/Information'
import Ranking from '@/components/user/Ranking'
import Establish from '@/components/user/Establish'
import Collection from '@/components/user/Collection'
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    ...mapActions('user', {
      getUserData: 'getUserData',
      getUserLevel: 'getUserLevel',
      getRecord: 'getRecord'
    }),
    ...mapActions('collection', {
      getUserPlayList: 'getUserPlayList'
    }),
    ...mapMutations('collection', {
      removeUserPlayList: 'removeUserPlayList'
    }),
    ...mapMutations('user', {
      removeUserData: 'removeUserData'
    })
  },
  components: {
    Information,
    Ranking,
    Establish,
    Collection
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    ...mapState('user', {
      userData: 'userData'
    }),
    ...mapGetters('collection', {
      uPlayList: 'uPlayList',
      cPlayList: 'cPlayList'
    })
  },
  watch: {
    id(val) {
      if (val) {
        this.removeUserData()
        this.removeUserPlayList()
        this.getUserData(val)
        this.getUserPlayList(val)
      }
    }
  },
  created() {
    this.removeUserData()
    this.removeUserPlayList()
    this.getUserData(this.$route.query.id)
    this.getUserPlayList(this.$route.query.id)
  }
}
</script>
<style lang="less" scoped>
.home__container {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .home__box {
    padding: 40px;
  }
}
</style>
