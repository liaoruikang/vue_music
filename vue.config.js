module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config
        .plugin('html')
        .tap((args) => {
          args[0].title = '网易云音乐  - Beta'
          return args
        })
    } else {
      config
        .plugin('html')
        .tap((args) => {
          args[0].title = '网易云音乐'
          return args
        })
    }
  }
}
