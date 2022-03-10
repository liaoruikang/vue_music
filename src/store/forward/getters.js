export default {
  shareName({ shareDetails }) {
    if (shareDetails === null) {
      return shareDetails
    } else if (shareDetails.tracks) {
      return {
        content: `歌单：${shareDetails.name} by ${shareDetails.creator.nickname}`,
        type: 'playlist'
      }
    } else if (shareDetails.ar) {
      let ar = ''
      shareDetails.ar.forEach(item => {
        ar = ar + item.name + '/'
      })
      ar = ar.substr(0, ar.length - 1)
      return {
        content: `单曲：${shareDetails.name} - ${ar}`,
        type: 'song'
      }
    } else {
      return {
        content: null,
        type: ''
      }
    }
  }
}
