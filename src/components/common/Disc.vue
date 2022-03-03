<template>
  <div class="disc__container">
    <router-link class="disc__link" :to="`/album?id=${id}`">
      <el-image :src="picUrl + '?param=100y100'" :lazy="lazy"></el-image>
      <a href="javascript:;" @click.stop="$emit('playClick')" class="play"></a>
    </router-link>
    <p class="disc__name">
      <router-link :to="`/album?id=${id}`">{{ name }}</router-link>
    </p>
    <p class="disc__author">
      <router-link :to="`/artist?id=${authorId}`">{{ author }}</router-link>
    </p>
  </div>
</template>
<script>
export default {
  name: 'disc',
  props: {
    picUrl: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      required: true
    },
    authorId: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.disc__container {
  background: url('../../assets/uploads/index.png') no-repeat -260px 99px;
  width: 118px;
  height: 150px;
  .disc__link {
    position: relative;
    display: block;
    width: 118px;
    height: 100px;
    background: url('../../assets/uploads/coverall.png') no-repeat 0 -570px;
    margin-bottom: 7px;
    .el-image {
      display: block;
      width: 100px;
      height: 100px;
    }
    .play {
      position: absolute;
      bottom: 5px;
      right: 22px;
      display: block;
      width: 22px;
      height: 22px;
    }
  }
  .disc__link:hover .play {
    background: url('../../assets/uploads/iconall.png') no-repeat 0 -85px;
  }
  p {
    line-height: 18px;
  }
  p a:hover {
    text-decoration: underline;
  }
  .disc__name {
    a {
      display: block;
      width: 115px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
    }
  }
  .disc__author {
    a {
      color: #333;
    }
  }
}
</style>
