<template>
  <div class="search__container w">
    <div class="search__main">
      <!-- 搜索 -->
      <div class="search__input">
        <el-input
          @keydown.native="onDown"
          v-model="keywords"
          @focus="getSearchProposalList({ keywords, type })"
          @mouseup.native.stop
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
        <!-- 搜索建议 -->
        <Proposal
          :keywords="keywords"
          :type="$route.query.type"
          :proposalList="searchProposalList"
        ></Proposal>
      </div>
      <div class="search__box">
        <!-- 数量 -->
        <div class="search__count">
          <p v-show="count.s">
            搜索“{{ searchForm.keywords }}”，找到 <em>{{ count.s }}</em>
            {{ count.name }}
          </p>
        </div>
        <ul class="search__nav">
          <li v-for="(item, index) in navList" :key="index">
            <router-link
              :class="$route.query.type == item.type ? 'select' : ''"
              :to="`/search?keywords=${searchForm.keywords}&type=${item.type}`"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
        <!-- result -->
        <div class="search__result" v-loading="!isShow">
          <!-- 单曲 -->
          <div
            class="search__song"
            v-if="
              searchForm.type === 1 &&
              searchList &&
              searchList.result.songCount > 0
            "
          >
            <div
              :class="['item', index % 2 ? 'even' : '']"
              v-for="(item, index) in searchList.result.songs"
              :key="item.id"
            >
              <div class="play">
                <a
                  href="javascript:;"
                  @click="$store.dispatch('getSongDetails', item.id)"
                  :class="
                    currentPlay && currentPlay.id === item.id
                      ? 'currentPlay'
                      : ''
                  "
                >
                </a>
              </div>
              <div class="name">
                <router-link
                  :to="`/song?id=${item.id}`"
                  :title="item.name"
                  v-highlight="$route.query.keywords"
                >
                  {{ item.name }}
                </router-link>
                <router-link :to="`/mv?id=${item.mv}`" v-if="item.mv">
                  <i></i>
                </router-link>
              </div>
              <div class="fun">
                <a
                  href="javascript:;"
                  class="add"
                  @click="
                    $store.dispatch('addSong', item.id)
                    $message.success('添加成功')
                  "
                ></a>
                <a
                  href="javascript:;"
                  class="collection"
                  @click="
                    $store.commit('setCFDVisible', {
                      display: true,
                      component: 'Collection',
                      songId: item.id
                    })
                  "
                ></a>
                <a
                  href="javascript:;"
                  class="share"
                  @click="
                    $store.commit('setCFDVisible', {
                      display: true,
                      component: 'Forward',
                      songId: item.id,
                      shareDetails: item
                    })
                  "
                ></a>
                <a
                  href="javascript:;"
                  class="download"
                  @click="
                    $store.commit('setCFDVisible', {
                      display: true,
                      component: 'Client'
                    })
                  "
                ></a>
              </div>
              <div class="singer">
                <em v-for="(val, i) in item.ar" :key="i">
                  <router-link
                    :to="`/artist?id=${val.id}`"
                    :title="val.name"
                    v-highlight="$route.query.keywords"
                  >
                    {{ val.name }}
                  </router-link>
                  {{ i !== item.ar.length - 1 ? '/' : '' }}
                </em>
              </div>
              <div class="album">
                <router-link
                  :to="`/album?id=${item.al.id}`"
                  :title="item.al.name"
                  v-highlight="$route.query.keywords"
                  >《{{ item.al.name }}》</router-link
                >
              </div>
              <div class="time">{{ dayjs(item.dt).format('mm:ss') }}</div>
            </div>
            <!-- 分页 -->
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 歌手 -->
          <div
            class="search__singer"
            v-if="
              searchForm.type === 100 &&
              searchList &&
              searchList.result.artistCount > 0
            "
          >
            <div
              class="item"
              v-for="item in searchList.result.artists"
              :key="item.id"
            >
              <router-link :to="`/artist?id=${item.id}`">
                <el-image :src="item.picUrl + '?param=130y130'"></el-image>
              </router-link>
              <p>
                <router-link
                  :to="`/artist?id=${item.id}`"
                  v-highlight="$route.query.keywords"
                  >{{ item.name }}
                </router-link>
                <router-link
                  v-if="item.accountId"
                  class="user__home"
                  :to="`/user/home?id=${item.accountId}`"
                ></router-link>
              </p>
            </div>
            <!-- 分页 -->
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 专辑 -->
          <div
            class="search__album"
            v-if="
              searchForm.type === 10 &&
              searchList &&
              searchList.result.albumCount > 0
            "
          >
            <LargeDisc
              v-for="item in searchList.result.albums"
              :key="item.id"
              :picUrl="item.picUrl"
              :authorId="item.artist.id"
              :id="item.id"
              :name="item.name"
              :author="item.artist.name"
              @playClick="$store.dispatch('getAlbumDetails', item.id)"
              lazy
              :keywords="$route.query.keywords"
            ></LargeDisc>
            <!-- 分页 -->
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 视频 -->
          <div
            class="search__video"
            v-if="
              searchForm.type === 1014 &&
              searchList &&
              searchList.result.videoCount > 0
            "
          >
            <Video
              :src="item.coverUrl"
              :time="dayjs(item.durationms).format('mm:ss')"
              :count="item.playTime | number_ch"
              :title="item.title"
              :isMv="!item.type"
              :singer="item.creator"
              :id="item.vid"
              v-for="item in searchList.result.videos"
              :key="item.vid"
              :keywords="$route.query.keywords"
            ></Video>
            <!-- 分页 -->
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 歌词 -->
          <div
            class="search__lyric"
            v-if="
              searchForm.type === 1006 &&
              lyricList &&
              searchList.result.songCount > 0
            "
          >
            <div
              class="lryic__box"
              v-for="(item, index) in lyricList.result.songs"
              :key="item.id"
            >
              <div :class="['item', index % 2 ? 'even' : '']">
                <div class="play">
                  <a
                    href="javascript:;"
                    @click="$store.dispatch('getSongDetails', item.id)"
                    :class="
                      currentPlay && currentPlay.id === item.id
                        ? 'currentPlay'
                        : ''
                    "
                  >
                  </a>
                </div>
                <div class="name">
                  <router-link :to="`/song?id=${item.id}`" :title="item.name">
                    {{ item.name }}
                  </router-link>
                  <router-link :to="`/mv?id=${item.mv}`" v-if="item.mv">
                    <i></i>
                  </router-link>
                </div>
                <div class="fun">
                  <a
                    href="javascript:;"
                    class="add"
                    @click="
                      $store.dispatch('addSong', item.id)
                      $message.success('添加成功')
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="collection"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Collection',
                        songId: item.id
                      })
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="share"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Forward',
                        songId: item.id,
                        shareDetails: item
                      })
                    "
                  ></a>
                  <a
                    href="javascript:;"
                    class="download"
                    @click="
                      $store.commit('setCFDVisible', {
                        display: true,
                        component: 'Client'
                      })
                    "
                  ></a>
                </div>
                <div class="singer">
                  <em v-for="(val, index) in item.ar" :key="val.id">
                    <router-link :to="`/artist?id=${val.id}`" :title="val.name">
                      {{ val.name }}
                    </router-link>
                    {{ index !== item.ar.length - 1 ? '/' : '' }}
                  </em>
                </div>
                <div class="album">
                  <router-link
                    :to="`/album?id=${item.al.id}`"
                    :title="item.al.name"
                    >《{{ item.al.name }}》</router-link
                  >
                </div>
                <div class="time">{{ dayjs(item.dt).format('mm:ss') }}</div>
              </div>
              <div class="lyric">
                <p
                  v-for="(val, i) in item.lyrics.slice(0, 4)"
                  :key="i"
                  v-html="val"
                ></p>
                <el-collapse-transition>
                  <div class="open" v-if="item.isOpen">
                    <p
                      v-for="(val, i) in item.lyrics.slice(4)"
                      :key="i"
                      v-html="val"
                    ></p>
                  </div>
                </el-collapse-transition>
                <a href="javascript:;" @click="item.isOpen = !item.isOpen"
                  >{{ item.isOpen ? '收起' : '展开'
                  }}<i
                    :class="
                      item.isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i
                ></a>
              </div>
            </div>
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 歌单 -->
          <div
            class="search__playlist"
            v-if="
              searchForm.type === 1000 &&
              searchList &&
              searchList.result.playlistCount > 0
            "
          >
            <div
              :class="['item', index % 2 ? 'even' : '']"
              v-for="(item, index) in searchList.result.playlists"
              :key="item.id"
            >
              <div class="play">
                <a
                  href="javascript:;"
                  @click="$store.dispatch('getsongsDetails', item.id)"
                >
                </a>
              </div>
              <div class="name">
                <router-link :to="`/playlist?id=${item.id}`">
                  <el-image
                    :src="item.coverImgUrl + '?param=50y50'"
                    lazy
                  ></el-image>
                </router-link>
                <router-link
                  :to="`/playlist?id=${item.id}`"
                  :title="item.name"
                  v-highlight="$route.query.keywords"
                >
                  {{ item.name }}
                </router-link>
              </div>
              <div class="fun">
                <a
                  href="javascript:;"
                  class="add"
                  @click="
                    $store.dispatch('addSongs', item.id)
                    $message.success('添加成功')
                  "
                ></a>
                <a
                  href="javascript:;"
                  class="collection"
                  @click="shoucang({ t: 1, id: item.id })"
                ></a>
                <a
                  href="javascript:;"
                  class="share"
                  @click="
                    $store.commit('setCFDVisible', {
                      display: true,
                      component: 'Forward',
                      songId: item.id,
                      shareDetails: item,
                      type: 'playlist'
                    })
                  "
                ></a>
              </div>
              <div class="count">
                {{ item.trackCount + '首' }}
              </div>
              <div class="singer">
                by &nbsp;<router-link
                  :to="`//user/home?id=${item.creator.userId}`"
                  :title="item.creator.nickname"
                  v-highlight="$route.query.keywords"
                  >{{ item.creator.nickname }}</router-link
                >
              </div>
              <div class="collection">
                收藏：{{ item.bookCount | number_ch }}
              </div>
              <div class="listenIn">收听：{{ item.playCount | number_ch }}</div>
            </div>
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 声音主播 -->
          <div
            class="search__anchor"
            v-if="
              searchForm.type === 1009 &&
              searchList &&
              searchList.result.djRadiosCount > 0
            "
          >
            <h3>声音主播</h3>
            <ul>
              <li v-for="item in searchList.result.djRadios" :key="item.id">
                <router-link :to="`/djradio?id=${item.id}`">
                  <el-image :src="item.picUrl + '?param=150y150'"></el-image>
                </router-link>
                <router-link :to="`/djradio?id=${item.id}`">
                  <span v-highlight="$route.query.keywords">{{
                    item.name
                  }}</span>
                </router-link>
                <div class="dj">
                  <em>by</em
                  ><router-link
                    :to="`/user/home?id=${item.dj.userId}`"
                    v-highlight="$route.query.keywords"
                  >
                    {{ item.dj.nickname }}
                  </router-link>
                  <i
                    :class="
                      item.dj.gender === 1
                        ? 'male'
                        : item.dj.gender === 2
                        ? 'female'
                        : ''
                    "
                  ></i>
                </div>
              </li>
            </ul>
          </div>
          <!-- 用户 -->
          <div
            class="search__user"
            v-if="
              searchForm.type === 1002 &&
              searchList &&
              searchList.result.userprofileCount > 0
            "
          >
            <div
              :class="!(index % 2) == 0 ? 'even' : ''"
              class="item"
              v-for="(item, index) in searchList.result.userprofiles"
              :key="item.id"
            >
              <div class="img">
                <router-link :to="`/user/home?id=${item.userId}`">
                  <el-image
                    :src="`${item.avatarUrl}?param=50y50`"
                    :title="item.nickname"
                    lazy
                  >
                  </el-image>
                </router-link>
              </div>
              <div class="name">
                <router-link :to="`/user/home?id=${item.userId}`">
                  <span v-highlight="$route.query.keywords">{{
                    item.nickname
                  }}</span>
                </router-link>
                <i
                  :class="
                    item.gender === 1
                      ? 'male'
                      : item.gender === 2
                      ? 'female'
                      : ''
                  "
                ></i>
                <p v-if="item.signature" v-highlight="$route.query.keywords">
                  {{ item.signature }}
                </p>
              </div>
              <div class="follow">
                <a
                  href="javascript:;"
                  :class="item.followed ? 'followed' : ''"
                  @click="follow(item)"
                >
                  {{ item.followed ? '已关注' : '关注' }}
                </a>
              </div>
              <div class="playlistCount">歌单：{{ item.playlistCount }}</div>
              <div class="fansCount">粉丝：{{ item.followeds }}</div>
            </div>
            <div class="search__page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="count.s"
                :current-page="searchForm.offset / searchForm.limit + 1"
                :page-size="searchForm.limit"
                @current-change="pageChange"
                next-text="下一页"
                prev-text="上一页"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
          <!-- 未找到 -->
          <div class="empty" v-if="searchList && !count.s">
            <h3><i></i>很抱歉，未能找到相关搜索结果！</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Proposal from '@/components/search/Proposal'
import { mapState, mapActions, mapMutations } from 'vuex'
import Bus from '@/plugin/eventBus'
import LargeDisc from '@/components/common/LargeDisc'
import Video from '@/components/common/Video'
import { followAPI } from '@/api/followAPI'
export default {
  data() {
    return {
      keywords: this.$route.query.keywords || '',
      type: 1,
      searchForm: {
        keywords: this.$route.query.keywords || '',
        type: parseInt(this.$route.query.type) || 1,
        limit: 30,
        offset: 0
      },
      navList: [
        { name: '单曲', type: 1 },
        { name: '歌手', type: 100 },
        { name: '专辑', type: 10 },
        { name: '视频', type: 1014 },
        { name: '歌词', type: 1006 },
        { name: '歌单', type: 1000 },
        { name: '声音主播', type: 1009 },
        { name: '用户', type: 1002 }
      ],
      lyricList: null,
      isProposal: false
    }
  },
  components: {
    Proposal,
    LargeDisc,
    Video
  },
  computed: {
    ...mapState('search', {
      searchProposalList: 'searchProposalList',
      searchList: 'searchList'
    }),
    ...mapState('play', {
      currentPlay: 'currentPlay'
    }),
    query() {
      return {
        keywords: this.$route.query.keywords || '',
        type: parseInt(this.$route.query.type) || 1
      }
    },
    count() {
      if (!this.searchList) return 0
      if (this.searchForm.type === 1) {
        return {
          s: this.searchList.result.songCount,
          name: '首单曲'
        }
      } else if (this.searchForm.type === 100) {
        return {
          s: this.searchList.result.artistCount,
          name: '个歌手'
        }
      } else if (this.searchForm.type === 10) {
        return {
          s: this.searchList.result.albumCount,
          name: '张专辑'
        }
      } else if (this.searchForm.type === 1014) {
        return {
          s: this.searchList.result.videoCount,
          name: '个视频'
        }
      } else if (this.searchForm.type === 1006) {
        return {
          s: this.searchList.result.songCount,
          name: '个歌词'
        }
      } else if (this.searchForm.type === 1000) {
        return {
          s: this.searchList.result.playlistCount,
          name: '个歌单'
        }
      } else if (this.searchForm.type === 1009) {
        return {
          s: this.searchList.result.djRadiosCount,
          name: '个节目'
        }
      } else if (this.searchForm.type === 1002) {
        return {
          s: this.searchList.result.userprofileCount - 10,
          name: '个用户'
        }
      } else {
        return {
          s: 0,
          name: ''
        }
      }
    },
    isShow() {
      if (this.searchList) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    isProposal(val) {
      if (val && val !== this.searchForm.keywords) {
        this.getSearchProposalList({
          keywords: this.keywords,
          type: this.type
        })
      }
    },
    query: {
      immediate: true,
      handler(val) {
        if (val.type === 10) {
          this.searchForm.limit = 75
        } else {
          this.searchForm.limit = 30
        }
        this.searchForm.type = val.type
        this.searchForm.keywords = val.keywords
        this.keywords = val.keywords
        this.searchForm.offset = 0
        this.removeSearch()
        this.getSearch()
      }
    },
    searchList: {
      deep: true,
      handler(val) {
        if (this.query.type === 1006 && val) {
          if (!val.result.songCount) return
          const arr = JSON.parse(JSON.stringify(val))
          arr.result.songs.forEach((item) => {
            item.isOpen = false
          })
          this.lyricList = arr
        } else {
          this.lyricList = null
        }
      }
    }
  },
  methods: {
    ...mapActions('search', {
      getSearchProposalList: 'getSearchProposalList'
    }),
    ...mapMutations('search', {
      removeSearchProposalList: 'removeSearchProposalList',
      removeSearch: 'removeSearch',
      setIsOpen: 'setIsOpen'
    }),
    onDown(e) {
      if (e.keyCode !== 40 && e.keyCode !== 38) {
        // 节流阀
        this.isProposal = false
        clearTimeout(this.throttleTimer)
        this.removeSearchProposalList()
        this.throttleTimer = setTimeout(() => {
          if (e.keyCode === 13) return (this.isProposal = false)
          this.isProposal = true
        }, 200)
      }
      Bus.$emit('keydown', { e, keywords: this.keywords })
      if (e.keyCode === 13 && this.$route.query.keywords !== this.keywords) {
        this.keywords = ''
      }
    },
    search() {
      if (this.keywords.trim().length === 0) return
      this.$router.push(
        `/search?keywords=${this.keywords}&type=${this.$route.query.type}`
      )
      this.removeSearchProposalList()
    },
    getSearch() {
      this.searchForm.offset = this.searchForm.offset * this.searchForm.limit
      this.$store.dispatch('search/getSearch', this.searchForm)
    },
    // 分页
    pageChange(val) {
      this.searchForm.offset = val - 1
      this.removeSearch()
      this.getSearch()
    },
    ...mapActions('collection', {
      shoucangPlaylist: 'shoucangPlaylist'
    }),
    async shoucang(val) {
      if (!this.isLogin) {
        Bus.$emit('Visible', true)
        return
      }
      const { data: result } = await this.shoucangPlaylist(val).catch((err) => {
        return err.response
      })
      if (result.code !== 200) return this.$message.error('此歌单已收藏')
      this.$message.success('收藏成功')
    },
    async follow(val) {
      if (!this.isLogin) {
        Bus.$emit('Visible', true)
        return
      }
      if (val.followed) return
      const { data: result } = await followAPI(val.userId, 1).catch((err) => {
        return err.response
      })
      if (result.code === -462) {
        return this.$message.error(result.data.blockText)
      }
      if (result.code !== 200) return
      this.$message.success('关注成功')
      this.getSearch()
    }
  },
  beforeDestroy() {
    this.removeSearch()
    this.removeSearchProposalList()
  }
}
</script>
<style lang="less" scoped>
.search__container {
  min-height: 700px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .search__main {
    padding: 40px;
    .search__input {
      position: relative;
      width: 420px;
      height: 40px;
      margin: 0 auto;
      /deep/ .el-input__inner {
        height: 40px;
        padding: 0 10px;
      }
      /deep/ .proposal__container {
        position: absolute;
        top: 50px;
        z-index: 999999;
      }
    }
    .search__count {
      height: 20px;
      margin: 28px 0 17px;
      color: #999;
      em {
        color: #c20c0c;
      }
    }
    .search__nav {
      height: 39px;
      border: 1px solid #ccc;
      border-width: 0 1px;
      background: url('../../assets/uploads/tab.png') repeat-x 0 0;
      li {
        float: left;
        a {
          display: block;
          width: 112.5px;
          background: url('../../assets/uploads/tab.png') no-repeat 0 99999px;
          line-height: 39px;
          font-size: 14px;
          text-align: center;
        }
        a:hover {
          background-position: right -45px;
        }
        .select {
          position: relative;
          background-position: right -90px !important;
        }
        .select::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: url('../../assets/uploads/tab.png') left -90px;
        }
      }
    }
    .search__result {
      padding-top: 20px;
      min-height: 500px;
      .search__song {
        a:hover {
          text-decoration: underline;
        }
        .item {
          display: flex;
          align-items: flex-end;
          padding: 13px 10px 13px 18px;
          border: 1px solid #fff;
          .play {
            width: 17px;
            height: 17px;
            margin-right: 5px;
            a {
              display: inline-block;
              width: 17px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
            }
            .currentPlay {
              background-position: -20px -128px;
            }
          }
          .name {
            flex: 12;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            i {
              display: inline-block;
              width: 23px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -151px;
              vertical-align: middle;
              margin-left: 2px;
            }
            i:hover {
              background-position: -30px -151px;
            }
          }
          .fun {
            flex: 3;
            a {
              float: left;
              display: none;
              width: 18px;
              height: 16px;
              background: url('../../assets/uploads/table.png') no-repeat;
              margin-left: 4px;
            }
            .add {
              width: 13px;
              height: 13px;
              background: url('../../assets/uploads/icon.png') no-repeat 0 -700px;
              margin: 0;
            }
            .add:hover {
              background-position: -22px -700px;
            }
            .collection {
              background-position: 0 -174px;
            }
            .collection:hover {
              background-position: -20px -174px;
            }
            .share {
              background-position: 0 -195px;
            }
            .share:hover {
              background-position: -20px -195px;
            }
            .download {
              background-position: -81px -174px;
            }
            .download:hover {
              background-position: -104px -174px;
            }
          }
          .singer {
            flex: 5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 30px;
          }
          .album {
            flex: 5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 10px;
          }
          .time {
            flex: 2;
          }
        }
        .item:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
          .fun {
            a {
              display: inline-block;
            }
          }
        }
        .even {
          background: #f7f7f7;
          border-color: #f7f7f7;
        }
      }
      .search__singer {
        display: flex;
        width: calc(100% + 22px);
        margin-top: 20px;
        flex-wrap: wrap;
        .item {
          margin-right: 24px;
          width: 130px;
          margin-bottom: 25px;
          .el-image {
            width: 130px;
            height: 130px;
            border: 1px solid #ccc;
            position: relative;
          }
          .el-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../../assets/uploads/coverall.png') no-repeat 0 -680px;
          }
          p {
            margin-top: 4px;
            .user__home {
              float: right;
              width: 17px;
              height: 18px;
              background: url('../../assets/uploads/icon.png') no-repeat 0 -740px;
            }
          }
        }
      }
      .search__album {
        display: flex;
        width: calc(100% + 25px);
        margin-top: 20px;
        flex-wrap: wrap;
        /deep/ .disc__container {
          margin-right: 32px;
        }
      }
      .search__video {
        display: flex;
        width: calc(100% + 25px);
        margin-top: 20px;
        flex-wrap: wrap;
        /deep/ .video__container {
          margin-right: 26px;
        }
      }
      .search__lyric {
        a:hover {
          text-decoration: underline;
        }
        .item {
          display: flex;
          align-items: flex-end;
          padding: 13px 10px 13px 18px;
          border: 1px solid #fff;
          .play {
            width: 17px;
            height: 17px;
            margin-right: 5px;
            a {
              display: inline-block;
              width: 17px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
            }
            .currentPlay {
              background-position: -20px -128px;
            }
          }
          .name {
            flex: 12;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            i {
              display: inline-block;
              width: 23px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -151px;
              vertical-align: middle;
              margin-left: 2px;
            }
            i:hover {
              background-position: -30px -151px;
            }
          }
          .fun {
            flex: 3;
            a {
              float: left;
              display: none;
              width: 18px;
              height: 16px;
              background: url('../../assets/uploads/table.png') no-repeat;
              margin-left: 4px;
            }
            .add {
              width: 13px;
              height: 13px;
              background: url('../../assets/uploads/icon.png') no-repeat 0 -700px;
              margin: 0;
            }
            .add:hover {
              background-position: -22px -700px;
            }
            .collection {
              background-position: 0 -174px;
            }
            .collection:hover {
              background-position: -20px -174px;
            }
            .share {
              background-position: 0 -195px;
            }
            .share:hover {
              background-position: -20px -195px;
            }
            .download {
              background-position: -81px -174px;
            }
            .download:hover {
              background-position: -104px -174px;
            }
          }
          .singer {
            flex: 5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 30px;
          }
          .album {
            flex: 5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 10px;
          }
          .time {
            flex: 2;
          }
        }
        .item:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
          .fun {
            a {
              display: inline-block;
            }
          }
        }
        .even {
          background: #f7f7f7;
          border-color: #f7f7f7;
        }
        .lyric {
          padding: 10px 0 18px 52px;
          color: #666;
          word-wrap: break-word;
          word-break: break-all;
          line-height: 23px;
          p {
            font-weight: normal;
          }
          a {
            color: #666;
          }
        }
      }
      .search__playlist {
        a:hover {
          text-decoration: underline;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 13px 10px 13px 18px;
          border: 1px solid #fff;
          .play {
            width: 17px;
            height: 17px;
            margin-right: 5px;
            a {
              display: inline-block;
              width: 17px;
              height: 17px;
              background: url('../../assets/uploads/table.png') no-repeat 0 -103px;
            }
            .currentPlay {
              background-position: -20px -128px;
            }
          }
          .name {
            flex: 8;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .el-image {
              width: 50px;
              height: 50px;
              border: 1px solid #ccc;
              margin: 0 8px 0 5px;
              vertical-align: middle;
            }
          }
          .fun {
            flex: 2;
            a {
              float: left;
              display: none;
              width: 18px;
              height: 16px;
              background: url('../../assets/uploads/table.png') no-repeat;
              margin-left: 4px;
            }
            .add {
              width: 13px;
              height: 13px;
              background: url('../../assets/uploads/icon.png') no-repeat 0 -700px;
              margin: 0;
            }
            .add:hover {
              background-position: -22px -700px;
            }
            .collection {
              background-position: 0 -174px;
            }
            .collection:hover {
              background-position: -20px -174px;
            }
            .share {
              background-position: 0 -195px;
            }
            .share:hover {
              background-position: -20px -195px;
            }
          }
          .count {
            flex: 1;
            color: #999;
          }
          .singer {
            flex: 5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 30px;
            margin-left: 20px;
          }
          .collection,
          .listenIn {
            flex: 2;
            color: #999;
          }
        }
        .item:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
          .fun {
            a {
              display: inline-block;
            }
          }
        }
        .even {
          background: #f7f7f7;
          border-color: #f7f7f7;
        }
      }
      .search__anchor {
        h3 {
          margin-top: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid #dadada;
          line-height: 17px;
          font-weight: bold;
          font-size: 12px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          width: calc(100% + 38px);
          margin-top: 22px;
          li {
            width: 150px;
            margin-right: 38px;
            margin-bottom: 30px;
            a:hover {
              text-decoration: underline;
              span {
                text-decoration: underline;
              }
            }
            .el-image {
              width: 150px;
              height: 150px;
            }
            span {
              display: inline-block;
              margin: 13px 0 6px;
              line-height: 16px;
              font-size: 14px;
              font-weight: normal;
            }
            .dj {
              color: #999;
              i {
                display: inline-block;
                margin: 0 2px;
              }
              .male {
                background: url('../../assets/uploads/icon.png') no-repeat -70px -20px;
                width: 14px;
                height: 15px;
                vertical-align: middle;
              }
              .female {
                background: url('../../assets/uploads/icon.png') no-repeat -70px
                  0;
                width: 14px;
                height: 15px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .search__user {
        .item {
          display: flex;
          align-items: center;
          border: 1px solid #fff;
          .img {
            width: 50px;
            height: 50px;
            padding: 6px 10px;
          }
          .name {
            flex: 4;
            padding: 6px 10px;
            a {
              span {
                font-size: 14px;
              }
            }
            a:hover {
              text-decoration: underline;
            }
            i {
              display: inline-block;
              margin: -2px 5px 0;
              vertical-align: middle;
            }
            .male {
              background: url('../../assets/uploads/icon.png') no-repeat -70px -20px;
              width: 14px;
              height: 15px;
            }
            .female {
              background: url('../../assets/uploads/icon.png') no-repeat -70px 0;
              width: 14px;
              height: 15px;
            }
            p {
              width: 350px;
              margin-top: 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #999;
            }
          }
          .follow {
            flex: 1;
            a {
              display: inline-block;
              width: 64px;
              height: 27px;
              line-height: 27px;
              background: url('../../assets/uploads/button.png') no-repeat 0 -990px;
              text-align: center;
              text-indent: 10px;
            }
            a:hover {
              background-position: 0 -1020px;
            }
            .followed {
              background-position: 0 -1082px !important;
              color: #bebebe;
              cursor: default;
            }
          }
          .playlistCount,
          .fansCount {
            flex: 1;
            color: #999;
          }
        }
        .item:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
          .fun {
            a {
              display: inline-block;
            }
          }
        }
        .even {
          background: #f7f7f7;
          border-color: #f7f7f7;
        }
      }
      .empty {
        padding: 105px 0 105px 0;
        text-align: center;
        h3 {
          font-size: 18px;
          i {
            display: inline-block;
            width: 64px;
            height: 50px;
            margin-right: 17px;
            background: url('../../assets/uploads/icon.png') no-repeat 0 -347px;
            vertical-align: middle;
          }
        }
      }
    }
    // 分页
    .search__page {
      width: 100%;
      margin: 20px 0;
      text-align: center;
    }
    /deep/ b {
      font-weight: normal;
      color: #0c73c2;
    }
  }
}
</style>
