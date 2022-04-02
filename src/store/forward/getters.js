export default {
  shareName({ shareDetails, type }) {
    if (shareDetails === null) return shareDetails
    if (type === 'playlist') {
      return {
        content: `歌单：${shareDetails.name} by ${shareDetails.creator.nickname}`,
        type
      }
    } else if (type === 'song') {
      let ar = ''
      shareDetails.ar.forEach(item => {
        ar = ar + item.name + '/'
      })
      ar = ar.substr(0, ar.length - 1)
      return {
        content: `单曲：${shareDetails.name} - ${ar}`,
        type
      }
    } else if (type === 'album') {
      let ar = ''
      shareDetails.artists.forEach(item => {
        ar = ar + item.name + '/'
      })
      ar = ar.substr(0, ar.length - 1)
      return {
        content: `专辑：${shareDetails.name} - ${ar}`,
        type
      }
    } else {
      return {
        content: null,
        type: ''
      }
    }
  }
}
