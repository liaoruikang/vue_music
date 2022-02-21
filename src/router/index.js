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
  { path: '/', component: Discover },
  { path: '/discover', component: Discover },
  { path: '/My', component: My },
  { path: '/Friend', component: Friend },
  { path: '/Download', component: Download },
  { path: '/discover/album', component: Album },
  { path: '/discover/toplist', component: Toplist },
  { path: '/discover/playlist', component: Playlist },
  { path: '/discover/djradio', component: Djradio },
  { path: '/discover/artist', component: Artist },
  { path: '/user/home', component: Home },
  { path: '/user/update', component: Update }
]

const router = new VueRouter({
  routes
})

export default router
