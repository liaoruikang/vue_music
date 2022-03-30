<template>
  <div class="adesc__container" v-loading="!artistDesc">
    <div class="adesc__box" v-if="artistDesc">
      <div class="head">
        <h3>{{ singerDetail.artist.name + '简介' }}</h3>
        <p>{{ artistDesc.briefDesc }}</p>
      </div>
      <div class="box">
        <div
          class="item"
          v-for="(item, index) in artistDesc.introduction"
          :key="index"
        >
          <h4>{{ item.ti }}</h4>
          <p v-html="item.txt.replace(/\n/g, '<br/>')"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'adesc',
  data() {
    return {}
  },
  created() {
    // 更新标题
    this.updateTitle(this.$route.meta, this.singerDetail.artist.name, 3)
    // 获取数据
    this.getArtistDesc(this.$route.query.id)
  },
  computed: {
    ...mapState('artist', {
      artistDesc: 'artistDesc',
      singerDetail: 'singerDetail'
    })
  },
  methods: {
    ...mapActions('artist', {
      getArtistDesc: 'getArtistDesc'
    })
  }
}
</script>
<style lang="less" scoped>
.adesc__container {
  margin-top: 35px;
  min-height: 200px;
  .head {
    h3 {
      box-sizing: border-box;
      border-left: 5px solid #c10d0c;
      text-indent: 5px;
      margin-bottom: 5px;
    }
    p {
      line-height: 25px;
      color: #666;
      text-indent: 2em;
    }
  }
  .box {
    h4 {
      margin: 28px 0 8px 0;
      color: #333;
      font-size: 14px;
    }
    p {
      line-height: 25px;
      color: #666;
    }
  }
}
</style>
