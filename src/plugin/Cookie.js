export const delCookie = (val) => {
  const MUSIC = /MUSIC_U=([^;]+);/
  const csrf = /__csrf=([^;]+);/
  const remember = /__remember_me=([^;]+);/
  document.cookie = `MUSIC_U=${val.match(MUSIC)[1]}; expires='';`
  document.cookie = `__csrf=${val.match(csrf)[1]}; expires='';`
  document.cookie = `__remember_me=${val.match(remember)[1]}; expires='';`
}
