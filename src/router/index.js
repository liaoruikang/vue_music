import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入discover中的组件
import Discover from '@/views/discover/Discover'
import Album from '@/views/discover/Album'
import Artist from '@/views/discover/Artist'
import Playlist from '@/views/discover/Playlist'
import Djradio from '@/views/discover/Djradio'
import Toplist from '@/views/discover/Toplist'

import My from '@/views/my/My'
import Friend from '@/views/friend/Friend'
import Download from '@/views/download/Download'
import Home from '@/views/user/Home'
import Update from '@/views/user/Update'

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
