export default {
  // 写入歌词
  setLyric(state, lyric) {
    // 第一步 将字符串分割为数组
    const arr1 = lyric.split(/\n/)
    arr1.splice(arr1.length - 1, 1)
    // 第二步 将数组里面每个字符串转换为对象
    const arr2 = []
    if (lyric.match(/\[[\S]+\]/)) {
      arr1.forEach(item => {
        let time = item.match(/\[[\S]+\]/)[0]
        time = time && time.replace('[', '').replace(']', '')
        time = (parseInt(time.split(':')[0]) * 60 + parseFloat(time.split(':')[1])).toFixed(2)
        const content = item.split(']')[1] || ''
        const obj = {
          time,
          content
        }
        arr2.push(obj)
      })
    } else {
      arr1.forEach(item => {
        const content = item
        const obj = {
          content,
          time: 0
        }
        arr2.push(obj)
      })
      arr2.unshift({ content: '*该歌词不支持自动滚动* ' })
    }
    state.lyric = arr2
  },
  // 写入当前歌曲
  setCurrentPlay(state, song) {
    if (!('isPlay' in song)) {
      song.isPlay = 0
    } else if (song.isPlay === 0) {
    } else {
      song.song.isPlay = song.isPlay
      song = song.song
    }
    this.dispatch('play/getSongUrl', song.id)
    state.currentPlay = song
    window.localStorage.setItem('currentPlay', JSON.stringify(state.currentPlay))
  },
  // 写入歌曲列表
  setSongList(state, songs) {
    if (!songs) return
    if (state.songList.length === 0) state.songList.push(...songs)
    if (songs.length > 1) {
      state.songList = songs
    } else {
      songs.forEach(item => {
        if (state.songList.every(val => val.id !== item.id)) {
          state.songList.push(item)
        }
      })
    }
    // 将歌曲信息存到本地
    window.localStorage.setItem('songList', JSON.stringify(state.songList))
  },
  // 删除列表所有歌曲
  removeSongList(state, id) {
    if (id === undefined) {
      state.songList = []
      state.currentPlay = null
      state.lyric = []
      state.songUrl = null

      window.localStorage.removeItem('songList')
      window.localStorage.removeItem('currentPlay')
    } else {
      // 当删除的是当前播放的歌曲时
      if (state.currentPlay.id === id) {
        const index = state.songList.findIndex(item => item.id === state.currentPlay.id)
        if (state.songList[index + 1]) {
          state.currentPlay = state.songList[index + 1]
        } else if (state.songList[index - 1]) {
          state.currentPlay = state.songList[index - 1]
        } else {
          state.currentPlay = null
        }
        state.currentPlay && this.dispatch('play/getSongUrl', state.currentPlay.id)

        // 重新更新本地存储数量
        state.currentPlay && window.localStorage.setItem('currentPlay', JSON.stringify(state.currentPlay))
      }
      // 查找索引删除指定元素
      const index = state.songList.findIndex(item => item.id === id)
      state.songList.splice(index, 1)
      // 重新更新本地存储数量
      window.localStorage.setItem('songList', JSON.stringify(state.songList))
    }
  },
  // 写入歌曲URL
  setSongUrl(state, url) {
    // 给每个歌曲URL添加标记 使每一个URL都是不同的
    url += '#' + Math.floor(Math.random() * 1000000)
    state.songUrl = url
  },
  // 添加播放列表
  addSongs(state, songs) {
    songs.forEach(item => {
      if (state.songList.findIndex(val => val.id === item.id) === -1) {
        state.songList.push(item)
      }
    })
  }
}
