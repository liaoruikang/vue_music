import Vue from 'vue'
import VueRouter from 'vue-router'
const Discover = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Discover')
const DAlbum = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Album')
const Dartist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/artist/Artist')
const HotSinger = () => import(/* webpackChunkName: "artist" */ '@/views/discover/artist/HotSinger')
const Playlist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Playlist')
const Dplaylist = () => import(/* webpackChunkName: "playlist" */ '@/views/playlist/Playlist')
const Ddjradio = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/djradio/Djradio')
const Category = () => import(/* webpackChunkName: "djradio" */ '@/views/discover/djradio/Category')
const Rank = () => import(/* webpackChunkName: "djradio" */ '@/views/discover/djradio/Rank')
const Rec = () => import(/* webpackChunkName: "djradio" */ '@/views/discover/djradio/Rec')
const Toplist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Toplist')
const My = () => import(/* webpackChunkName: "My" */ '@/views/my/My')
const SingerEdit = () => import(/* webpackChunkName: "My" */ '@/views/my/SingerEdit')
const Cover = () => import(/* webpackChunkName: "My" */ '@/views/my/Cover')
const Download = () => import(/* webpackChunkName: "Download" */ '@/views/download/Download')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/user/Home')
const Found = () => import(/* webpackChunkName: "found" */ '@/views/found/Found')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search/Search')
const Artist = () => import(/* webpackChunkName: "artist" */ '@/views/artist/Artist')
const Aalbum = () => import(/* webpackChunkName: "artist" */ '@/views/artist/Aalbum')
const Amv = () => import(/* webpackChunkName: "artist" */ '@/views/artist/Amv')
const Adesc = () => import(/* webpackChunkName: "artist" */ '@/views/artist/Adesc')
const Song = () => import(/* webpackChunkName: "song" */ '@/views/song/Song')
const Album = () => import(/* webpackChunkName: "album" */ '@/views/album/Album')
const Djradio = () => import(/* webpackChunkName: "album" */ '@/views/djradio/Djradio')
const Program = () => import(/* webpackChunkName: "album" */ '@/views/djradio/Program')
const Mv = () => import(/* webpackChunkName: "album" */ '@/views/video/Mv')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    component: Discover,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover',
    component: Discover,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/my',
    component: My,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' },
    children: [
      {
        path: 'edit',
        component: SingerEdit,
        meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' },
        children: [{
          path: 'cover',
          component: Cover,
          meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
        }]
      }
    ]
  },
  {
    path: '/download',
    component: Download,
    meta: { oneTitle: '下载网易云音乐iPhone、iPad、Mac、Android、WP、PC版客户端', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/toplist',
    component: Toplist,
    meta: { oneTitle: '网易云音乐', twoTitle: '排行榜', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/playlist',
    component: Playlist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌单', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/playlist',
    component: Dplaylist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌单', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/djradio',
    component: Ddjradio,
    meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '', fourTitle: '' },
    children: [{ path: 'category', component: Category, meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '', fourTitle: '' } }]
  },
  {
    path: '/discover/djradio/rank',
    component: Rank,
    meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '节目排行榜', fourTitle: '' }
  },
  {
    path: '/discover/djradio/recommend',
    component: Rec,
    meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '推荐节目', fourTitle: '' }
  },
  {
    path: '/discover/artist',
    component: Dartist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌手', threeTitle: '', fourTitle: '' },
    children: [
      { path: 'hotSinger', component: HotSinger, meta: { oneTitle: '网易云音乐', twoTitle: '歌手', threeTitle: '热门歌手', fourTitle: '' } }
    ]
  },
  {
    path: '/discover/album',
    component: DAlbum,
    meta: { oneTitle: '网易云音乐', twoTitle: '新碟上架', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/user/home',
    component: Home,
    meta: { oneTitle: '网易云音乐', twoTitle: '用户', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/search',
    component: Search,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/shoppingmall',
    redirect: '/'
  },
  {
    path: '/musician',
    redirect: '/'
  },
  {
    path: '/artist',
    component: Artist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌手', threeTitle: '', fourTitle: '' },
    children: [{
      path: 'album',
      component: Aalbum,
      meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }

    },
    {
      path: 'mv',
      component: Amv,
      meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }

    },
    {
      path: 'desc',
      component: Adesc,
      meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }

    }]
  },
  {
    path: '/song',
    component: Song,
    meta: { oneTitle: '网易云音乐', twoTitle: '单曲', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/album',
    component: Album,
    meta: { oneTitle: '网易云音乐', twoTitle: '专辑', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/djradio',
    component: Djradio,
    meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/program',
    component: Program,
    meta: { oneTitle: '网易云音乐', twoTitle: '电台节目', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/mv',
    component: Mv,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '*',
    component: Found,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '', fourTitle: '' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  from.meta.fourTitle = ''
  from.meta.threeTitle = ''
  const title = (!to.meta.fourTitle ? '' : to.meta.fourTitle + ' - ') + (!to.meta.threeTitle ? '' : to.meta.threeTitle + ' - ') + (!to.meta.twoTitle ? '' : to.meta.twoTitle + ' - ') + to.meta.oneTitle
  document.querySelector('title').innerHTML = title
  const appEl = document.querySelector('.app__container')
  if (appEl && from.path !== to.path) {
    document.querySelector('.app__container').scrollTop = 0
  }
  if (to.fullPath === '/my') {
    return next('/my?id=singer')
  }
  next()
})

// 定义全局更新标题方法
// 参数1 要修改的路由属性
// 参数2 要修改的值
Vue.prototype.updateTitle = (title, val, grade) => {
  if (grade === 1) {
    title.oneTitle = val
  } else if (grade === 2) {
    title.twoTitle = val
  } else if (grade === 3) {
    title.threeTitle = val
  } else if (grade === 4) {
    title.fourTitle = val
  }
  const t = (title.fourTitle === '' ? '' : title.fourTitle + ' - ') + (title.threeTitle === '' ? '' : title.threeTitle + ' - ') + (title.twoTitle === '' ? '' : title.twoTitle + ' - ') + title.oneTitle
  document.querySelector('title').innerHTML = t
}

export default router
