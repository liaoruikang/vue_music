<template>
  <div class="tags__container">
    <LoginHeader>选择标签</LoginHeader>
    <div class="seltags">
      <h4>选择合适的标签，最多可选3个</h4>
      <div class="tags" v-if="songClassList">
        <dl
          class="clearfix"
          v-for="(item, index) in songClassList.categories"
          :key="index"
        >
          <dt>{{ item + '：' }}</dt>
          <dd>
            <a
              href="javascript:;"
              v-for="item in newClass[index]"
              :key="item.id"
              @click="select(item.name)"
            >
              <em>{{ item.name }}</em>
              <i :class="strTags.includes(item.name) ? 'select' : ''"></i>
            </a>
          </dd>
        </dl>
      </div>
    </div>
    <div class="footer">
      <a href="javascript:;" @click="preservation"><i>保存并关闭</i></a>
    </div>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
import { mapState } from 'vuex'
export default {
  name: 'tags',
  data() {
    return {
      tags: []
    }
  },
  created() {
    Bus.$on('Visible', (val) => {
      this.$store.commit('setCFDVisible', {
        display: val,
        component: null
      })
    })
    // 获取分类数据
    this.$store.dispatch('playlist/getSongClassList')
    this.tags = this.$store.state.tags
  },
  components: {
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      )
  },
  computed: {
    ...mapState('playlist', {
      songClassList: 'songClassList'
    }),

    newClass() {
      const arr = []
      for (const key in this.songClassList.categories) {
        arr.push(
          this.songClassList.sub.filter((val) => val.category === parseInt(key))
        )
      }
      return arr
    },
    strTags() {
      return this.tags.join(';')
    }
  },
  methods: {
    select(val) {
      const index = this.tags.findIndex((item) => item === val)
      if (index !== -1) return this.tags.splice(index, 1)
      if (this.tags.length === 3) {
        return this.$message.warning('标签最多不能超过3个')
      }
      this.tags.push(val)
    },
    // 保存
    preservation() {
      Bus.$emit('tags', this.tags)
      this.$store.commit('setCFDVisible', {
        display: false,
        component: null
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tags__container {
  .seltags {
    width: 500px;
    padding: 0 0 0 20px;
    height: 315px;
    overflow-y: scroll;
    h4 {
      padding: 15px 0 0;
      color: #999;
      font-weight: normal;
      font-size: 12px;
    }
    dl {
      dt,
      dd {
        float: left;
      }
      dd {
        padding-bottom: 30px;
      }
      dt {
        width: 50px;
        margin: 0 -100px 0 0;
        padding-top: 20px;
        font-weight: bold;
        line-height: 30px;
        color: #333;
        font-size: 12px;
      }
      dd {
        margin-left: 30px;
        padding-top: 10px;
        line-height: 30px;
        a {
          position: relative;
          display: inline-block;
          width: 70px;
          height: 31px;
          margin: 10px 0 0 10px;
          padding: 0 5px 0 0;
          background: url('../../assets/uploads/button2.png') no-repeat right -99px;
          text-align: center;
          em {
            display: inline-block;
            width: 100%;
            height: 100%;
            background: url('../../assets/uploads/button2.png') no-repeat 0 -59px;
            color: #666;
            font-size: 12px;
          }
          .select {
            position: absolute;
            width: 18px;
            height: 18px;
            right: -3px;
            bottom: -3px;
            background: url('../../assets/uploads/icon.png') no-repeat -25px -430px;
          }
        }
        a:hover {
          background-position: right -181px;
          em {
            background-position: 0 -141px;
          }
        }
      }
    }
  }
  .footer {
    height: 32px;
    line-height: 32px;
    padding: 8px 20px;
    border-top: 1px solid #c6c6c6;
    border-radius: 0 0 4px 4px px;
    text-align: center;
    background: #f7f7f7;
    text-align: center;
    a {
      display: inline-block;
      background: url('../../assets/uploads/button2.png') no-repeat right -428px;
      padding-right: 5px;
      text-indent: 5px;
      font-size: 12px;
      color: #fff;
      i {
        display: inline-block;
        padding: 0 10px;
        background: url('../../assets/uploads/button2.png') no-repeat 0 -387px;
      }
    }
    a:hover {
      background-position: right -510px;
      i {
        background-position: 0 -469px;
      }
    }
  }
}
</style>
