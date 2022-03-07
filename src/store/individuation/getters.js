export default {
  daySongsList(state) {
    const index = []
    for (let i = 0; i < 100; i++) {
      const random = Math.floor(Math.random() * 5)
      if (index.every(item => item !== random)) {
        index.push(random)
      }
      if (index.length === 3) {
        break
      }
    }
    const newSongsList = []
    index.forEach(item => {
      newSongsList.push(state.everyDayList[item])
    })
    if (newSongsList[0] === undefined) return false
    return newSongsList
  }
}
