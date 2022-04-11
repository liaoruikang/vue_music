<template>
  <div class="proposal__container" v-if="isProposal">
    <div class="proposal__main">
      <p>
        <span ref="spanRef">
          <router-link :to="`/search?keywords=${keywords}&type=${1002}`"
            ><strong>搜索"{{ keywords }}"</strong
            ><em>相关用户 ></em></router-link
          >
        </span>
      </p>
      <div class="box" v-if="list">
        <div class="item" v-for="(val, index) in list.order" :key="val.id">
          <h3><i></i>{{ val.name }}</h3>
          <ul ref="listRef" :class="(index + 1) % 2 === 0 ? 'even' : null">
            <li v-for="item in list[val.cat]" :key="item.id" ref="lisRef">
              <router-link
                :to="`/${val.cat.substr(0, val.cat.length - 1)}?id=${item.id}`"
                v-html="
                  item.name +
                  (item.artists ? ' - ' + item.artists[0].name : '') +
                  (item.artist ? ' - ' + item.artist.name : '')
                "
              >
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/plugin/eventBus'
export default {
  name: 'proposal',
  props: ['keywords', 'type', 'proposalList'],
  data() {
    return {
      // 节流阀
      throttleTimer: null,
      list: null,
      itemEl: null,
      select: null
    }
  },
  methods: {
    onDown(val) {
      if (this.select === null && val.e.keyCode === 13) {
        if (val.keywords.trim()) {
          this.$router.push(
            `/search?keywords=${val.keywords}&type=${this.type || 1}`
          )
        }
        return
      }
      if (!this.itemEl || this.itemEl.length === 1) return
      this.itemEl.forEach((item) => {
        item.className = ''
      })
      if (val.e.keyCode === 38 || val.e.keyCode === 40) val.e.preventDefault()
      // 控制上下选中
      if (val.e.keyCode === 38) {
        // 向上选中
        if (this.select === null || this.select === 0) {
          this.select = this.itemEl.length - 1
        } else {
          this.select--
        }
        this.itemEl[this.select].className = 'select'
      } else if (val.e.keyCode === 40) {
        // 向下选中
        if (this.select === this.itemEl.length - 1 || this.select === null) {
          this.select = 0
        } else {
          this.select++
        }
        this.itemEl[this.select].className = 'select'
      }
      // 回车选中
      if (val.e.keyCode === 13 && this.itemEl[this.select]) {
        location.hash = this.itemEl[this.select].firstChild.hash
      }
    }
  },
  updated() {
    if (this.$refs.lisRef) {
      const spanEl = this.$refs.spanRef
      const item = [spanEl, ...this.$refs.lisRef]
      this.itemEl = item
      this.select = null
    }
  },
  watch: {
    proposalList: {
      deep: true,
      handler(val) {
        const obj = JSON.parse(JSON.stringify(val))
        const keywords = this.keywords
        for (const key in obj) {
          if (key === 'order') {
            // 处理cat名称
            const arr = []
            obj[key].forEach((item) => {
              if (item === 'songs') {
                const id = Math.random() * 10
                arr.push({ name: '单曲', cat: item, id })
              } else if (item === 'artists') {
                const id = Math.random() * 10
                arr.push({ name: '歌手', cat: item, id })
              } else if (item === 'albums') {
                const id = Math.random() * 10
                arr.push({ name: '专辑', cat: item, id })
              } else if (item === 'playlists') {
                const id = Math.random() * 10
                arr.push({ name: '歌单', cat: item, id })
              }
            })
            obj[key] = arr
          } else {
            // 处理名字和作者名字
            obj[key].forEach((val) => {
              // 名字
              let arr = null
              try {
                arr = val.name.match(new RegExp(keywords, 'gi'))
              } catch (e) {
                return val.name
              }
              let str = val.name
              arr &&
                arr.forEach((item) => {
                  if (!item) {
                    return
                  }
                  str = str.replace(
                    new RegExp('(?<![</>]+)' + item + '(?![</>]+)', 'g'),
                    `<span>${item}</span>`
                  )
                })
              val.name = str
              // 作者名字
              if (!val.artists && !val.artist) return
              if (val.artist) {
                const arr = val.artist.name.match(new RegExp(keywords, 'gi'))
                let str = val.artist.name
                arr &&
                  arr.forEach((item) => {
                    if (!item) {
                      return
                    }
                    str = str.replace(
                      new RegExp('(?<![</>]+)' + item + '(?![</>]+)', 'g'),
                      `<span>${item}</span>`
                    )
                  })
                val.artist.name = str
              } else {
                val.artists.forEach((val) => {
                  const arr = val.name.match(new RegExp(keywords, 'gi'))
                  let str = val.name
                  arr &&
                    arr.forEach((item) => {
                      if (!item) {
                        return
                      }
                      str = str.replace(
                        new RegExp('(?<![</>]+)' + item + '(?![</>]+)', 'g'),
                        `<span>${item}</span>`
                      )
                    })
                  val.name = str
                })
              }
            })
          }
        }
        this.list = obj
        console.log(this.list)
      }
    }
  },
  computed: {
    isProposal() {
      if (!this.proposalList) return false
      if (JSON.stringify(this.proposalList) === '{}') return false
      return true
    }
  },
  created() {
    window.addEventListener('mouseup', () => {
      setTimeout(() => {
        this.$store.commit('search/removeSearchProposalList')
        this.$store.commit('search/removeHeadProposalList')
      })
    })
    Bus.$on('keydown', this.onDown)
  }
}
</script>
<style lang="less" scoped>
.proposal__container {
  width: 100%;
  background: #fff;
  border: 1px solid #bebebe;
  border-radius: 4px;
  box-shadow: 0 4px 7px #555;
  box-sizing: border-box;
  .proposal__main {
    > p {
      height: 17px;
      padding: 11px 10px;
      border-bottom: 1px solid #e2e2e2;
      span {
        a {
          display: inline-block;
          strong {
            float: left;
            max-width: 60%;
            font-weight: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      a {
        color: #666;
      }
      a:hover {
        background-color: #e3e5e7;
      }
      .select {
        background-color: #e3e5e7;
      }
    }
    .box {
      .item {
        display: flex;
        h3 {
          width: 62px;
          padding-top: 8px;
          font-weight: normal;
          font-size: 12px;
          color: #000;
          i {
            display: inline-block;
            width: 14px;
            height: 15px;
            background: url('../../assets/uploads/icon.png') no-repeat -35px -300px;
            margin: -2px 3px 0 10px;
            vertical-align: middle;
          }
        }
        ul {
          width: calc(100% - 62px);
          border-top: 1px solid #e2e2e2;
          border-left: 1px solid #e2e2e2;
          padding: 6px 0 5px;
          li {
            text-indent: 12px;
            line-height: 24px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            a {
              /deep/ span {
                color: #0c73c2;
              }
            }
          }

          li:hover {
            background-color: #e3e5e7;
          }
          .select {
            background-color: #e3e5e7;
          }
        }
        .even {
          background: #f9f8f8;
        }
      }
      .item:nth-child(1) ul {
        border-top: none;
      }
      .item:nth-child(2) {
        h3 {
          i {
            background-position: -50px -300px;
          }
        }
      }
      .item:nth-child(3) {
        h3 {
          i {
            background-position: -35px -320px;
          }
        }
      }
      .item:nth-child(3) {
        h3 {
          i {
            background-position: -50px -320px;
          }
        }
      }
    }
  }
}
</style>
