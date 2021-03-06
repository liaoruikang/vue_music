import Vue from 'vue'
import VueRouter from 'vue-router'

const Discover = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Discover')
const Taste = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Taste')
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
const Djradio = () => import(/* webpackChunkName: "djradio" */ '@/views/djradio/Djradio')
const Program = () => import(/* webpackChunkName: "djradio" */ '@/views/djradio/Program')
const Mv = () => import(/* webpackChunkName: "video" */ '@/views/video/Mv')
const Video = () => import(/* webpackChunkName: "video" */ '@/views/video/Video')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    component: Discover,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover',
    component: Discover,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/my',
    component: My,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' },
    children: [
      {
        path: 'edit',
        component: SingerEdit,
        meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' },
        children: [{
          path: 'cover',
          component: Cover,
          meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
        }]
      }
    ]
  },
  {
    path: '/download',
    component: Download,
    meta: { oneTitle: '?????????????????????iPhone???iPad???Mac???Android???WP???PC????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/toplist',
    component: Toplist,
    meta: { oneTitle: '???????????????', twoTitle: '?????????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/playlist',
    component: Playlist,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/playlist',
    component: Dplaylist,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/djradio',
    component: Ddjradio,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '', fourTitle: '' },
    children: [{ path: 'category', component: Category, meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '', fourTitle: '' } }]
  },
  {
    path: '/discover/djradio/rank',
    component: Rank,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '???????????????', fourTitle: '' }
  },
  {
    path: '/discover/djradio/recommend',
    component: Rec,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '????????????', fourTitle: '' }
  },
  {
    path: '/discover/artist',
    component: Dartist,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' },
    children: [
      { path: 'hotSinger', component: HotSinger, meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '????????????', fourTitle: '' } }
    ]
  },
  {
    path: '/discover/album',
    component: DAlbum,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/user/home',
    component: Home,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/search',
    component: Search,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
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
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' },
    children: [{
      path: 'album',
      component: Aalbum,
      meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }

    },
    {
      path: 'mv',
      component: Amv,
      meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }

    },
    {
      path: 'desc',
      component: Adesc,
      meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }

    }]
  },
  {
    path: '/song',
    component: Song,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/album',
    component: Album,
    meta: { oneTitle: '???????????????', twoTitle: '??????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/djradio',
    component: Djradio,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/program',
    component: Program,
    meta: { oneTitle: '???????????????', twoTitle: '????????????', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/mv',
    component: Mv,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/video',
    component: Video,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '/discover/recommend/taste',
    component: Taste,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  },
  {
    path: '*',
    component: Found,
    meta: { oneTitle: '???????????????', twoTitle: '', threeTitle: '', fourTitle: '' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  from.meta.fourTitle = ''
  from.meta.threeTitle = ''
  from.meta.twoTitle = ''
  from.meta.oneTitle = '???????????????'
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

// ??????????????????????????????
// ??????1 ????????????????????????
// ??????2 ???????????????
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
