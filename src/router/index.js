import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入discover中的组件
const Discover = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Discover')
const Album = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Album')
const Artist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Artist')
const Playlist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Playlist')
const Djradio = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Djradio')
const Toplist = () => import(/* webpackChunkName: "Discover" */ '@/views/discover/Toplist')
// 引入My中的组件
const My = () => import(/* webpackChunkName: "My" */ '@/views/my/My')
// 引入Friend中的组件
const Friend = () => import(/* webpackChunkName: "Friend" */ '@/views/friend/Friend')
// 引入Download中的组件
const Download = () => import(/* webpackChunkName: "Download" */ '@/views/download/Download')
// 引入Home中的组件
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/user/Home')
// 引入Update中的组件
const Update = () => import(/* webpackChunkName: "Update" */ '@/views/user/Update')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Discover,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '' }
  },
  {
    path: '/discover',
    component: Discover,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '' }
  },
  {
    path: '/My',
    component: My,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '' }
  },
  {
    path: '/Friend',
    component: Friend,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '' }
  },
  {
    path: '/Download',
    component: Download,
    meta: { oneTitle: '下载网易云音乐iPhone、iPad、Mac、Android、WP、PC版客户端', twoTitle: '', threeTitle: '' }
  },

  {
    path: '/discover/toplist',
    component: Toplist,
    meta: { oneTitle: '网易云音乐', twoTitle: '排行榜', threeTitle: '' }
  },
  {
    path: '/discover/playlist',
    component: Playlist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌单', threeTitle: '' }
  },
  {
    path: '/discover/djradio',
    component: Djradio,
    meta: { oneTitle: '网易云音乐', twoTitle: '主播电台', threeTitle: '' }
  },
  {
    path: '/discover/artist',
    component: Artist,
    meta: { oneTitle: '网易云音乐', twoTitle: '歌手', threeTitle: '' }
  },
  {
    path: '/discover/album',
    component: Album,
    meta: { oneTitle: '网易云音乐', twoTitle: '新碟上架', threeTitle: '' }
  },
  {
    path: '/user/home',
    component: Home,
    meta: { oneTitle: '网易云音乐', twoTitle: '用户', threeTitle: '' }
  },
  {
    path: '/user/update',
    component: Update,
    meta: { oneTitle: '网易云音乐', twoTitle: '', threeTitle: '' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const title = (to.meta.threeTitle === '' ? '' : to.meta.threeTitle + ' - ') + (to.meta.twoTitle === '' ? '' : to.meta.twoTitle + ' - ') + to.meta.oneTitle
  document.querySelector('title').innerHTML = title
  next()
})

export default router
