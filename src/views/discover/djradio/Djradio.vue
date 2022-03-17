<template>
  <div class="w djradio__container" v-loading.lock="!isShow">
    <div class="djradio__box" v-if="isShow">
      <div class="djradio__head">
        <!-- 导航区域 -->
        <el-carousel
          ref="carouselRef"
          :autoplay="false"
          height="194px"
          indicator-position="none"
        >
          <el-carousel-item>
            <ul class="djradio__nav clearfix">
              <li v-for="item in djCatelist" :key="item.id">
                <router-link
                  :to="`/discover/djradio/category?id=${item.id}&name=${item.name}`"
                  :class="item.id == $route.query.id ? 'active' : ''"
                >
                  <i
                    :style="`background: url('${item.picWebUrl}')
                no-repeat 0 0;`"
                  ></i>
                  <em>{{ item.name }}</em>
                </router-link>
              </li>
            </ul>
          </el-carousel-item>
          <el-carousel-item>
            <ul class="djradio__nav clearfix">
              <li>
                <a
                  href="https://music.163.com/st/ncreator/manage/voice/display"
                >
                  <i class="faq"></i>
                  <em>常见问题</em>
                </a>
              </li>
              <li>
                <a href="https://music.163.com/st/ncreator/manage/voice">
                  <i class="apply"></i>
                  <em>我要做主播</em>
                </a>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
        <a
          href="javascript:;"
          class="btn__left"
          @click="$refs.carouselRef.prev()"
        ></a>
        <a
          href="javascript:;"
          class="btn__right"
          @click="$refs.carouselRef.next()"
        ></a>
      </div>
      <div v-show="!$route.query.id">
        <!-- 排行榜 -->
        <div class="djradio__ranking">
          <!-- 推荐节目 -->
          <Recommend></Recommend>
          <!-- 节目排行榜 -->
          <Ranking :pageSize="10"></Ranking>
        </div>
        <!-- 推荐电台分类 -->
        <Radio
          more
          v-for="item in recommendCategory"
          :id="item.categoryId"
          :key="item.categoryId"
          :title="item.categoryName"
        ></Radio>
      </div>
      <!-- 二级路由入口 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'djradio',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('djradio/getDjCatelist')
    this.$store.dispatch('djradio/getRanking', 10)
    this.$store.dispatch('djradio/getRecommend', 10)
    this.$store.dispatch('djradio/getRecommendCategory')
  },
  computed: {
    ...mapState('djradio', {
      djCatelist: 'djCatelist',
      recommend: 'recommend',
      ranking: 'ranking',
      recommendCategory: 'recommendCategory'
    }),
    isShow() {
      if (this.djCatelist && this.recommendCategory) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Recommend: () =>
      import(
        /* webpackChunkName: 'djradio' */ '@/components/djradio/Recommend'
      ),
    Ranking: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/Ranking'),
    Radio: () =>
      import(/* webpackChunkName: 'djradio' */ '@/components/djradio/Radio')
  }
}
</script>
<style lang="less" scoped>
.djradio__container {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .djradio__box {
    padding: 40px;
    .djradio__head {
      position: relative;
      .djradio__nav {
        li {
          float: left;
          margin: 0 15px 25px;
          a {
            display: flex;
            width: 70px;
            height: 70px;
            color: #888;
            background: url('../../../assets/uploads/radio_bg.png') no-repeat 0 -9999px;
            flex-direction: column;
            align-items: center;
            i {
              width: 48px;
              height: 48px;
            }
            .apply {
              background: url('../../../assets/uploads/radio_apply.png')
                no-repeat 0 0;
            }
            .faq {
              background: url('../../../assets/uploads/radio_faq.png') no-repeat
                0 0;
            }
          }
          a:hover {
            background-position: 0 0;
          }
          .active {
            background-position: -70px 0 !important;
            color: #d35757;
            i {
              background-position: -48px 0;
            }
          }
        }
      }
      /deep/ .el-carousel__arrow {
        display: none;
      }
      .btn__left,
      .btn__right {
        position: absolute;
        width: 20px;
        height: 30px;
        top: 50%;
        transform: translateY(-70%);
        background: url('../../../assets/uploads/radio_slide.png') no-repeat 0 -30px;
      }
      .btn__left {
        left: -20px;
      }
      .btn__right {
        right: -20px;
        background-position: -30px -30px;
      }
    }
    .djradio__ranking {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .recommend__container,
      .ranking__container {
        width: 47%;
      }
    }
  }
}
</style>
