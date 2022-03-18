<template>
  <div class="artistNav__container">
    <h3>{{ hot.title }}</h3>
    <ul>
      <li @click="$store.commit('artist/setSingerList', null)">
        <router-link
          :class="!$route.query.area ? 'active' : null"
          :to="`/discover/artist/hotSinger`"
          >{{ hot.name }}</router-link
        >
      </li>
    </ul>
    <div class="artistNav__nav" v-for="(item, index) in navData" :key="index">
      <h3>{{ item.title }}</h3>
      <li
        v-for="(val, i) in item.list"
        :key="i"
        @click="
          updateTitle($route.meta, val.name, 3)
          $store.commit('artist/setSingerList', null)
        "
      >
        <router-link
          :class="
            $route.query.area == val.area && $route.query.type == val.type
              ? 'active'
              : null
          "
          :to="`/discover/artist?type=${val.type}&area=${val.area}&name=${val.name}`"
        >
          {{ val.name }}
        </router-link>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'artistNav',
  data() {
    return {
      hot: { title: '推荐', name: '热门歌手', area: 101 },
      navData: [
        {
          title: '华语',
          list: [
            { name: '华语男歌手', type: 1, area: 7 },
            { name: '华语女歌手', type: 2, area: 7 },
            { name: '华语组合/乐队', type: 3, area: 7 }
          ]
        },
        {
          title: '欧美',
          list: [
            { name: '欧美男歌手', type: 1, area: 96 },
            { name: '欧美女歌手', type: 2, area: 96 },
            { name: '欧美组合/乐队', type: 3, area: 96 }
          ]
        },
        {
          title: '日本',
          list: [
            { name: '日本男歌手', type: 1, area: 8 },
            { name: '日本女歌手', type: 2, area: 8 },
            { name: '日本组合/乐队', type: 3, area: 8 }
          ]
        },
        {
          title: '韩国',
          list: [
            { name: '韩国男歌手', type: 1, area: 16 },
            { name: '韩国女歌手', type: 2, area: 16 },
            { name: '韩国组合/乐队', type: 3, area: 16 }
          ]
        },
        {
          title: '其他',
          list: [
            { name: '其他男歌手', type: 1, area: 0 },
            { name: '其他女歌手', type: 2, area: 0 },
            { name: '其他组合/乐队', type: 3, area: 0 }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.artistNav__container {
  width: 160px;
  h3 {
    height: 25px;
    padding-left: 14px;
    font-size: 16px;
    font-family: 'Microsoft Yahei';
  }
  ul,
  .artistNav__nav {
    li {
      width: 160px;
      height: 30px;
      line-height: 30px;
      a:hover {
        text-decoration: underline;
      }
      a {
        display: inline-block;
        width: 133px;
        padding-left: 27px;
        color: #333;
        background: url('../../assets/uploads/singer.png') no-repeat 0 -30px;
      }
      .active {
        background-position: 0 0;
        color: #c20c0c;
      }
      .active:hover {
        text-decoration: none;
      }
    }
  }
  .artistNav__nav {
    margin: 5px 0 0;
    padding-top: 16px;
    border-top: 1px solid #d3d3d3;
  }
}
</style>
